package com.suite.editor;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.QName;
import org.dom4j.dom.DOMAttribute;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.google.gson.Gson;
import com.suite.pojo.UserInputData;

import net.lingala.zip4j.ZipFile;

@Controller
public class SEController {

	Logger logger = Logger.getLogger("SuiteEditor");

	@RequestMapping("/")
	public ModelAndView home(HttpServletRequest req) throws Exception{
		ModelAndView mv = new ModelAndView();
		FileHandler fh = null; 
		try {
			HttpSession session = req.getSession();
			mv.setViewName("se.jsp");

			String uniqueId = new SimpleDateFormat("_yyyy_MM_dd_HH_mm_ss_SSS").format(new Date());
			String workingFolderPath = "C://SuiteEditor//ExecutionData//Execution"+uniqueId+"//";
			session.setAttribute("workingfolder", workingFolderPath);
			session.setAttribute("uniqueId", uniqueId);
			mv.addObject("uniqueId", uniqueId);
			Thread.sleep(1); // this is to maintain uniqueness 
			File folder = new File(workingFolderPath);
			folder.mkdir();

			File logFile = new File(workingFolderPath+"Log.txt");
			logFile.createNewFile();		

			fh = new FileHandler(logFile.getAbsolutePath(), true); 
			logger.addHandler(fh);

			logger.info("Logger Connected to / ");
			logger.info("working folder : "+ workingFolderPath);
			logger.info("Log file : "+ logFile.getAbsolutePath());

		}catch(Exception e) {
			logger.info("Fail to navigate from / " + e.getStackTrace());
			e.printStackTrace();
		}finally {
			if(fh!=null) {
				fh.close();
			}
		}
		return mv;
	}

	@RequestMapping("/Input")
	public ModelAndView inputData ( @RequestParam("file") MultipartFile file,	HttpServletRequest req, HttpServletResponse response) throws Exception {

		ModelAndView mv = new ModelAndView();
		HttpSession session = req.getSession();
		FileHandler fh = null; 

		try {
			mv.setViewName("results.jsp");
			mv.addObject("uniqueId", session.getAttribute("uniqueId"));

			String workingFolderPath = (String) session.getAttribute("workingfolder");
			File logFile = new File(workingFolderPath+"Log.txt");
			fh = new FileHandler(logFile.getAbsolutePath(), true); 
			logger.addHandler(fh);
			logger.info("Logger Connected to /Input ");

			if (file.isEmpty()) {
				logger.info("no file selected");
			}

			logger.info("moving "+file.getOriginalFilename()+" file from client to server");

			byte[] bytes = file.getBytes();
			Path path = Paths.get(workingFolderPath + file.getOriginalFilename());
			Files.write(path, bytes);

			logger.info("========= Unzipping the process files =========");
			ZipFile zipFile = new ZipFile(path.toAbsolutePath().toString());
			zipFile.extractAll(workingFolderPath);

			Path workingPath = Paths.get(workingFolderPath);
			Path unzippedFolderPath = Files.walk(workingPath).filter(Files::isDirectory).skip(1).findFirst().get();
			logger.info("moved file from client to server at "+ unzippedFolderPath.toString());

			logger.info("========= Input list start =========");
			//			Map<String, String> updateTestClassMethodParamMap = new HashMap<>();
			//
			//			Enumeration<String> enumeration = req.getParameterNames();
			//			while(enumeration.hasMoreElements()){ 
			//				String key = enumeration.nextElement(); 
			//				updateTestClassMethodParamMap.put(key, req.getParameter(key));
			//				logger.info(" >> "+ key +" = "+ req.getParameter(key)); 
			//			}

			String jsonString = req.getParameter("inputJson"); 
			logger.info("Json input received : "+ jsonString);
			ArrayList<UserInputData> uidl = new ArrayList<UserInputData>();
			GsonJsonParser g = new GsonJsonParser();
			List<Object> xl = g.parseList(jsonString);
			for(Object x : xl) {
				if(x.toString().equals("DELETED")) continue;
				Gson gs = new Gson();
				UserInputData uid = gs.fromJson(x.toString(), UserInputData.class);
				uidl.add(uid);
				logger.info(uid.toString());
			}

			logger.info("========= Input list end =========");

			ArrayList<String> allSuite = new ArrayList<>();
			ArrayList<String> passSuite = new ArrayList<>();
			ArrayList<String> failSuite = new ArrayList<>();
			ArrayList<String> noEditSuite = new ArrayList<>();

			Files.walk(unzippedFolderPath).filter(Files::isRegularFile).forEach(filePath -> {
				if(filePath.getFileName().toString().endsWith(".xml")) {
					try {
						@SuppressWarnings("resource")
						String result = new BufferedReader(new InputStreamReader(new FileInputStream(filePath.toFile()))).lines().collect(Collectors.joining("\n"));
						if (result != null && result.contains("testng-extended-dtd")) {
							EditStatus editstatus = editSuite(filePath,uidl,req);

							String updatedfilePath = filePath.toFile().getAbsolutePath().toString().replace(workingPath.toFile().getAbsolutePath().toString(),"");
							updatedfilePath = addSpaceAtFixedLength(updatedfilePath, 70);
							switch(editstatus) {
							case Pass:
								allSuite.add("<tr><td><i class=\"far fa-check-circle\"></i> "+updatedfilePath+"</td></tr>");
								passSuite.add("<tr><td><i class=\"far fa-check-circle\"></i> "+updatedfilePath+"</td></tr>");
								break;
							case Fail:
								allSuite.add("<tr data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" title=\""+  editstatus.getFailureReason()+"\"><td><i class=\"far fa-times-circle\"></i> "+updatedfilePath+"</td></tr>");
								failSuite.add("<tr data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" title=\""+  editstatus.getFailureReason()+"\"><td><i class=\"far fa-times-circle\"></i> "+updatedfilePath+"</td></tr>");
								break;
							case noEdit:
								allSuite.add("<tr><td><i class=\"far fa-circle\"></i> "+updatedfilePath+"</td></tr>");
								noEditSuite.add("<tr><td><i class=\"far fa-circle\"></i> "+updatedfilePath+"</td></tr>");
								break;
							default:
								break;
							}
						}else {
							logger.warning("File is blank or doesn't have custom testng-extended-dtd tag >> "+ filePath.getFileName().toString());	
						}
					}catch(Exception e) {
						e.printStackTrace();
					}
				}
			});

			mv.addObject("allSuite", allSuite);
			mv.addObject("passSuite", passSuite);
			mv.addObject("failSuite", failSuite);
			mv.addObject("noEditSuite", noEditSuite);

			mv.addObject("SuiteCount", allSuite.size());
			mv.addObject("correctlyEdited", passSuite.size());
			mv.addObject("incorrectlyEdited", failSuite.size());
			mv.addObject("noEdit", noEditSuite.size());

			logger.info("SuiteCount "+ allSuite.size());
			logger.info("correctlyEdited "+ passSuite.size());
			logger.info("incorrectlyEdited "+ failSuite.size());
			logger.info("noEdit "+ noEditSuite.size());

		} catch (Exception e) {
			logger.info("Fail to navigate from /Input " + e.getStackTrace());
			e.printStackTrace();
		}finally {
			if(fh!=null) {
				fh.close();
			}
		}
		return mv;
	}

	@RequestMapping("/results")
	public void showresult( HttpServletRequest req, HttpServletResponse response) throws Exception {

		HttpSession session = req.getSession();
		FileHandler fh = null; 

		try {

			String workingFolderPath = (String) session.getAttribute("workingfolder");
			File logFile = new File(workingFolderPath+"Log.txt");
			fh = new FileHandler(logFile.getAbsolutePath(), true); 
			logger.addHandler(fh);
			logger.info("Logger Connected to /results ");

			Path workingPath = Paths.get(workingFolderPath);
			Path unzippedFolderPath = Files.walk(workingPath).filter(Files::isDirectory).skip(1).findFirst().get();

			logger.info("========= Zipping the processed files =========");
			String uniqueId = (String) session.getAttribute("uniqueId");
			String zipFilePath = workingFolderPath+"SuiteEdited"+uniqueId+".zip";
			logger.info("Zip folder name = "+zipFilePath);
			File unzippedProcessedFolder = new File(unzippedFolderPath.toString());
			ZipFile zipToCreate = new ZipFile(zipFilePath);
			zipToCreate.addFolder(unzippedProcessedFolder);
			logger.info("========= Zipped the processed files =========");

			logger.info("========= Download process should start now =========");

			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition","attachment;filename=SuiteEdited"+uniqueId+".zip");

			File outfile = new File(zipFilePath);
			FileInputStream fileIn = new FileInputStream(outfile);
			ServletOutputStream out = response.getOutputStream();

			byte[] outputByte = new byte[4096];
			while(fileIn.read(outputByte, 0, 4096) != -1)
			{
				out.write(outputByte, 0, 4096);
			}
			fileIn.close();
			out.flush();
			out.close();
			logger.info("========= All action done on all file =========");
		}catch(Exception e) {
			logger.info("Fail to process result page " + e.getStackTrace());
			e.printStackTrace();
		}finally {
			if(fh!=null) {
				fh.close();
			}
		}
	}

	@SuppressWarnings("unchecked")
	public EditStatus editSuite(Path p, ArrayList<UserInputData> uidl, HttpServletRequest req) {
		EditStatus editStatus = EditStatus.noEdit;
		HttpSession session = req.getSession();
		FileHandler fh = null; 
		StringBuilder sb = new StringBuilder("Suite Edit Status ");

		try {
			String workingFolderPath = (String) session.getAttribute("workingfolder");
			File logFile = new File(workingFolderPath+"Log.txt");
			fh = new FileHandler(logFile.getAbsolutePath(), true); 
			logger.addHandler(fh);
			logger.info("Checking File for edit : "+p.toFile().getAbsolutePath());

			File inputFile = p.toFile();
			SAXReader reader = new SAXReader();
			reader.setValidation(false);
			reader.setEntityResolver(new EntityResolver() {
				@Override
				public InputSource resolveEntity(String publicId, String systemId)
						throws SAXException, IOException {
					if (systemId.contains("testng-extended-dtd-1.0.0.dtd")) {
						return new InputSource(new StringReader(""));
					} else if (systemId.contains("testng-1.0.dtd")) {
						return new InputSource(new StringReader(""));
					} else {
						return null;
					}
				}
			});
			Document document = reader.read(inputFile);

			for(UserInputData uid: uidl) {
				if(!EditStatus.Fail.toString().equals(editStatus.toString())) {
					if(uid.getAction().equalsIgnoreCase("Test_Class_Method_Parameter")) {
						if(uid.getActiveTab().equalsIgnoreCase("Update")) {
							try {
								String className = uid.getParamClassName();
								String methodName = uid.getParamMethodName();
								String paramParameterName = uid.getParameterName();
								String paramValueOld = uid.getParamValueOld();
								String paramValueNew = uid.getParamValueNew();
								List<Node> nodes = document.selectNodes("/suite/test/classes/class[@name='"+className+"']/methods/include" );

								if(StringUtils.hasText(className) && StringUtils.hasText(methodName) && StringUtils.hasText(paramParameterName) && StringUtils.hasText(paramValueOld) && StringUtils.hasText(paramValueNew)) {
									if(!(className.equalsIgnoreCase("NOT_SET") || methodName.equalsIgnoreCase("NOT_SET") || paramParameterName.equalsIgnoreCase("NOT_SET") || paramValueOld.equalsIgnoreCase("NOT_SET") || paramValueNew.equalsIgnoreCase("NOT_SET"))) {
										for (Node node : nodes) {
											Element element = (Element)node;
											if(element.valueOf("@name").equalsIgnoreCase(methodName)){
												@SuppressWarnings("unchecked")
												Iterator<Element> iterator = element.elementIterator("parameter");
												while(iterator.hasNext()) {
													Element marksElement = (Element)iterator.next();
													if(marksElement.valueOf("@name").equalsIgnoreCase(paramParameterName)){
														String value[] = marksElement.valueOf("@value").split("#");
														int i=0;
														String updatedValue = "";
														for(; i<value.length; i++) {
															if(value[i].trim().equalsIgnoreCase(paramValueOld.trim())) {
																editStatus = EditStatus.Pass;
																updatedValue = updatedValue +(i==0? "" : "#")+ paramValueNew; 
															}else {
																updatedValue = updatedValue +(i==0? "" : "#")+ value[i]; 
															}
														}
														if(editStatus.toString().equals(EditStatus.Pass.toString())) {
															marksElement.addAttribute("value", updatedValue);
														}
													}
												}
											}
										}
									}else {
										logger.info("Skipping the update due to incorrect data input");
									}
								}
							}catch(Exception e) {
								editStatus = EditStatus.Fail;
								throw new Exception("Failed to process test parameter actions " +e.getMessage());
							}
							sb.append(" << Test Parameter Edit Actions : "+editStatus.toString()+" >> ");
						}
					}else if(uid.getAction().equalsIgnoreCase("Test_Class")) {
						List<Node> nodes = document.selectNodes("/suite/test/classes/class");
						if(uid.getActiveTab().equalsIgnoreCase("Update")) {
							try {
								String classNameOld =  uid.getClassNameOld();
								String classNameNew =  uid.getClassNameNew();

								if(StringUtils.hasText(classNameOld) && StringUtils.hasText(classNameNew)) {
									if(!(classNameOld.equalsIgnoreCase("NOT_SET") || classNameNew.equalsIgnoreCase("NOT_SET"))){
										for (Node node : nodes) {
											Element element = (Element)node;
											if(element.valueOf("@name").trim().equalsIgnoreCase(classNameOld.trim())) {
												element.addAttribute("name", classNameNew.trim());
												editStatus = EditStatus.Pass;
											}
										}
									}else {
										logger.info("Skipping the update due to incorrect data input");
									}
								}
							}catch(Exception e) {
								editStatus = EditStatus.Fail;
								throw new Exception("Failed to process class name actions " +e.getMessage());
							}
							sb.append(" << Test Parameter Edit Actions : "+editStatus.toString()+" >> ");
						}
					}else if(uid.getAction().equalsIgnoreCase("Suite")) {
						List<Node> nodes = document.selectNodes("/suite");
						if(uid.getActiveTab().equalsIgnoreCase("Add")) {

							String addNameAtSuite = uid.getNameAtSuite();
							String addinvocationCountAtSuite = uid.getInvocationCountAtSuite();
							try {
								for (Node node : nodes) {
									Element element = (Element)node;

									if(!addNameAtSuite.isEmpty() && !addNameAtSuite.equalsIgnoreCase("NOT_SET") && element.valueOf("@name").isEmpty()) {
										element.addAttribute("name", addNameAtSuite);
										editStatus = EditStatus.Pass;
									}
									if(!addinvocationCountAtSuite.isEmpty() && !addinvocationCountAtSuite.equalsIgnoreCase("NOT_SET") && element.valueOf("@invocationCount").isEmpty()) {
										element.addAttribute("invocationCount", addinvocationCountAtSuite);
										editStatus = EditStatus.Pass;
									}
								}
							}catch(Exception e) {
								editStatus = EditStatus.Fail;
								throw new Exception("Failed to process suite actions " +e.getMessage());
							}
							sb.append(" << Suite Edit Actions : "+editStatus.toString()+" >> ");
						}else if(uid.getActiveTab().equalsIgnoreCase("Update")) {

							String updateNameAtSuiteOld = uid.getNameAtSuiteOld();
							String updateNameAtSuiteNew = uid.getNameAtSuiteNew();
							String updateinvocationCountAtSuiteOld = uid.getInvocationCountOld();
							String UpdateinvocationCountAtSuiteNew = uid.getInvocationCountNew();

							try {
								for (Node node : nodes) {
									Element element = (Element)node;

									if(!updateNameAtSuiteOld.isEmpty() && !updateNameAtSuiteNew.isEmpty() && !updateNameAtSuiteOld.equalsIgnoreCase("NOT_SET") && !updateNameAtSuiteNew.equalsIgnoreCase("NOT_SET") && element.valueOf("@name").trim().equals(updateNameAtSuiteOld.trim())) {
										element.addAttribute("name", updateNameAtSuiteNew);
										editStatus = EditStatus.Pass;
									}
									if(!updateinvocationCountAtSuiteOld.isEmpty() && !UpdateinvocationCountAtSuiteNew.isEmpty() && !updateinvocationCountAtSuiteOld.equalsIgnoreCase("NOT_SET") && !UpdateinvocationCountAtSuiteNew.equalsIgnoreCase("NOT_SET") && element.valueOf("@invocationCount").trim().equals(updateinvocationCountAtSuiteOld.trim())) {
										element.addAttribute("invocationCount", UpdateinvocationCountAtSuiteNew);
										editStatus = EditStatus.Pass;
									}
								}
							}catch(Exception e) {
								editStatus = EditStatus.Fail;
								throw new Exception("Failed to process suite actions " +e.getMessage());
							}
							sb.append(" << Suite Edit Actions : "+editStatus.toString()+" >> ");

						}else if(uid.getActiveTab().equalsIgnoreCase("Delete")) {
							String deleteNameAtSuite = uid.getNameAtSuite(); 
							String deleteinvocationCountAtSuite = uid.getInvocationCountAtSuite();

							try {
								for (Node node : nodes) {
									Element element = (Element)node;

									if(!deleteNameAtSuite.isEmpty() && !deleteNameAtSuite.equalsIgnoreCase("NOT_SET") && element.valueOf("@name").trim().equals(deleteNameAtSuite.trim())) {
										QName name = new QName("name");
										DOMAttribute a = new DOMAttribute(name); 
										element.remove(a);
										editStatus = EditStatus.Pass;
									}
									if(!deleteinvocationCountAtSuite.isEmpty() && !deleteinvocationCountAtSuite.equalsIgnoreCase("NOT_SET") && element.valueOf("@invocationCount").trim().equals(deleteinvocationCountAtSuite.trim()) ) {
										QName name = new QName("invocationCount");
										DOMAttribute a = new DOMAttribute(name); 
										element.remove(a);
										editStatus = EditStatus.Pass;
									}
								}
							}catch(Exception e) {
								editStatus = EditStatus.Fail;
								throw new Exception("Failed to process suite actions " +e.getMessage());
							}
							sb.append(" << Suite Edit Actions : "+editStatus.toString()+" >> ");
						}
					}
				}
			}

			if(editStatus.toString().equals(EditStatus.Pass.toString())) {
				OutputFormat format = OutputFormat.createPrettyPrint();
				format.setEncoding("UTF-8");
				format.setIndent(true);
				format.setNewlines(true);
				XMLWriter writer = new XMLWriter(new OutputStreamWriter(new FileOutputStream(p.toFile().getAbsolutePath()), "UTF-8"), format);
				writer.write(document);
				writer.close();
			}
		}catch(Exception e) {
			logger.info("Failed to process the file at "+p.toFile().getAbsolutePath());
			editStatus = EditStatus.Fail;
			editStatus.setFailureReason("failed " + e.getMessage()); 
			e.printStackTrace();
		}finally {
			logger.info(sb.toString());
			if(fh!=null) {
				fh.close();
			}
		}
		return editStatus;
	}

	private String  addSpaceAtFixedLength(String str, int len) {
		String x[] = fixedLengthSplitString(str, len);
		StringBuilder y = new StringBuilder();
		for(int i =0; i<x.length ; i++) {
			y.append(x[i]+" ");
		}
		return y.toString();
	}

	private String[]  fixedLengthSplitString(String str, int len) {
		String[] flss = new String[str.length()/len+1];
		for(int i=0; flss.length>i; i++) {
			if(flss.length-1 == i) {
				flss[i] = str.substring(i*len, str.length());
			}else {
				flss[i] = str.substring(i*len, (i+1)*len);
			}
		}
		return flss;
	}

	public enum EditStatus {
		Pass(""),
		Fail(""),
		noEdit("");

		String failureReason = "";
		EditStatus(String failureReason){
			this.failureReason = failureReason;
		}
		public String getFailureReason() {
			return failureReason;
		}
		public void setFailureReason(String failureReason) {
			this.failureReason = failureReason;
		}
	}
}

