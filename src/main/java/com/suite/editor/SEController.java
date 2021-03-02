package com.suite.editor;

import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.logging.FileHandler;
import java.util.logging.Logger;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import net.lingala.zip4j.ZipFile;

@Controller
public class SEController {
	
	Logger logger = Logger.getLogger("SuiteEditor");

	@RequestMapping("/")
	public String home(HttpServletRequest req) throws Exception{

		try {
			HttpSession session = req.getSession();
	
			String uniqueId = new SimpleDateFormat("_yyyy_MM_dd_HH_mm_ss_SSS").format(new Date());
			String workingFolderPath = "C://SuiteEditor//ExecutionData//Execution"+uniqueId+"//";
			session.setAttribute("workingfolder", workingFolderPath);
			Thread.sleep(1); // this is to maintain uniqueness 
			File folder = new File(workingFolderPath);
			folder.mkdir();
			logger.info("working folder : "+ workingFolderPath);
			
		}catch(Exception e) {
			throw new Exception("Fail to navigate from / " + e.getStackTrace());
		}
		return "se.jsp";
	}

	@RequestMapping("/Input")
	public void inputData ( @RequestParam("file") MultipartFile file,	HttpServletRequest req, HttpServletResponse response) throws Exception {

		HttpSession session = req.getSession();
		FileHandler fh = null; 
		
		try {
			String workingFolderPath = (String) session.getAttribute("workingfolder");

			File logFile = new File(workingFolderPath+"Log.txt");
			logFile.createNewFile();		
			logger.info("Log file : "+ logFile.getAbsolutePath());
			
			fh = new FileHandler(logFile.getAbsolutePath()); 
			logger.addHandler(fh);
			
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
			Enumeration<String> enumeration = req.getParameterNames();
			while(enumeration.hasMoreElements()){ 
				String key = enumeration.nextElement(); 
				logger.info(" >> "+ key +" = "+ req.getParameter(key)); 
			}
			logger.info("========= Input list end =========");

			Files.walk(unzippedFolderPath).filter(Files::isRegularFile).forEach(filePath -> {
				checkFileToProcess(filePath, enumeration);
			});

			logger.info("========= Zipping the processed files =========");
			String zipFilePath = workingFolderPath+"SuiteEdited.zip";
			File unzippedProcessedFolder = new File(unzippedFolderPath.toString());
			ZipFile zipToCreate = new ZipFile(zipFilePath);
			zipToCreate.addFolder(unzippedProcessedFolder);

			logger.info("========= Zipped the processed files =========");

			logger.info("========= Download process should start now =========");

			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition","attachment;filename=SuiteEdited.zip");

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
		} catch (Exception e) {
			throw new Exception(); 
		}finally {
			if(fh!=null) {
				fh.close();
			}
		}
	}

	
	public void checkFileToProcess(Path filePath, Enumeration<String> enumeration) {
		if(filePath.getFileName().toString().contains(".xml")) {
			try {

			}catch(Exception e) {
				logger.info("Failed to process the files "+e.getMessage().toString());
			}
			logger.info("Edited : "+ filePath.toString());
		}
	}
}
