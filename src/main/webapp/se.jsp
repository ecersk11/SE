<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<title>Suite Editor</title>
		<link rel="icon" href="images/seEditTital.ico" type="image/icon">
		<link rel="stylesheet" type="text/css" href="css/se.css">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
	</head>
	<body  onload="init()">

		<!-- Header Start -->
		<header>
			<div>
				<nav class="navbar navbar-light navbar-custom justify-content-between">
					<div class="navmargin">
						<a href="/" class="navbar-brand" data-toggle="tooltip" data-placement="bottom" title="Unique code : ${uniqueId}" >
							<i class="far fa-edit mx-2"></i>Suite Editor
						</a>
					</div>
					<div class="navmargin">
						<div class="btn-group" role="group">
						  <button id="actioncount" type="button" class="btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Number of action you have added"><i class="fas fa-sliders-h mx-1"></i>  <span class="badge bg-light">0</span></button>
						  <button id="filestatus" type="button" class="btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Zip File not defined">  <i class="fas fa-file-archive mx-1"></i></button>
						</div>
					</div>
				</nav>
			</div>
		</header>
	
		<!-- Main Body -->
		<main>
			<div id="mainBody" class="container">
				<form action="Input" id="mainForm" method="post" enctype="multipart/form-data">
					
					<!-- Page contains -->
						<div id="alertMessageBox" class="alert alert-light mb-10" role="alert">
							<br>							
						</div>
						<div id="ActionList">
							<table class="table table-striped shadow">
						  		<thead class="thead-dark">
						    		<tr>
						      			<th scope="col"><i class="fas fa-sliders-h mx-2"></i> Suite Edit Actions</th>
						    		</tr>
						  		</thead>
						  		<tbody>
						  			<tr id="addaction">
										<td class="text-muted" > Click to add action <i class="fas fa-plus"></i> </td>
									</tr>
						  		</tbody>
							</table>
						</div>	
						<div id="File">
							<table class="table table-striped shadow">
						  		<thead class="thead-dark">
						    		<tr>
						      			<th scope="col"> <i class="fas fa-file-archive mx-2"></i> Suite Files To Edit</th>
						    		</tr>
						  		</thead>
						  		<tbody>
						  			<tr id="addFile">
										<td class="text-muted" > Click to add zip file <i class="fas fa-plus"></i> </td>
									</tr>
						  		</tbody>
							</table>
						</div>	
					
						
					<!-- Page contains -->
					<!-- file browse modal -->
					<div class="modal fade" id="getFilePath" tabindex="-1" role="dialog" aria-labelledby="getFileModalLabel" aria-hidden="true">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="getFileModalLabel">Upload Suite folder (Zipped)</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body">
						    <div class="custom-file">
							  <input type="file" class="custom-file-input" id="file" name="file" accept=".zip">
							  <label class="custom-file-label text-muted" for="file">click to browse required zipped suite folder</label>
							</div>
					      </div>
					      <div class="modal-footer">
					        <button id="saveFilePath" type="button" class="btn btn-secondary">Close</button>
					      </div>
					    </div>
					  </div>
					</div>
					<!-- file browse modal -->
					
				
					<div class="modal fade" id="getAction" tabindex="-1" role="dialog" aria-labelledby="getActionLabel" aria-hidden="true">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="getActionLabel">Select Action</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body my-2">
						    <div id="selectAction">
							  <input placeholder="Select Suite Edit Action" list="browsers" name="browser" id="browser" class="form-control">
							  <datalist id="browsers"></datalist> <!-- Update data from js -->
							</div>
							<div id="actionInput">
								<div id="Suite" class="invisible mt-3">
								<ul class="nav nav-tabs" role="tablist">
								  <li class="nav-item">
								    <a class="nav-link active" data-toggle="tab" href="#Suite_Add" role="tab" aria-controls="Suite_Add" aria-selected="true">Add</a>
								  </li>
								  <li class="nav-item">
								    <a class="nav-link"  data-toggle="tab" href="#Suite_Update" role="tab" aria-controls="Suite_Update" aria-selected="false">Update</a>
								  </li>
								  <li class="nav-item">
								    <a class="nav-link" data-toggle="tab" href="#Suite_Delete" role="tab" aria-controls="Suite_Delete" aria-selected="false">Delete</a>
								  </li>
								</ul>
								<div class="tab-content mt-2" >
								  <div class="tab-pane fade show active" id="Suite_Add" role="tabpanel" >
								    <div class="input-group">
									  <div class="input-group-prepend">
									    <span class="input-group-text">name</span>
									  </div>
									  <input id="addNameAtSuite" name="addNameAtSuite" type="text" class="form-control">
									</div>
								      <div class="input-group">
									  <div class="input-group-prepend">
									    <span class="input-group-text">invocationCount</span>
									  </div>
									  <input id="addinvocationCountAtSuite" name="addinvocationCountAtSuite" type="text" class="form-control">
									</div>
								  </div>
								  <div class="tab-pane fade" id="Suite_Update" role="tabpanel">
								 <div class="input-group">
									  <div class="input-group-prepend">
									    <span class="input-group-text" >name</span>
									  </div>
									  <input id="updateNameAtSuiteOld" name="updateNameAtSuiteOld" placeholder="old" type="text" class="form-control">
									  <input id="updateNameAtSuiteNew" name="updateNameAtSuiteNew" placeholder="new" type="text" class="form-control">
									</div>
								       <div class="input-group">
									  <div class="input-group-prepend">
									    <span class="input-group-text" >invocationCount</span>
									  </div>
									  <input id="updateinvocationCountAtSuiteOld" name="updateinvocationCountAtSuiteOld" placeholder="old" type="text" class="form-control">
									  <input id="UpdateinvocationCountAtSuiteNew" name="UpdateinvocationCountAtSuiteNew" placeholder="new" type="text" class="form-control">
									</div>
								</div>
								  <div class="tab-pane fade" id="Suite_Delete" role="tabpanel">
								  <div class="input-group">
								  <div class="input-group-prepend">
								    <span class="input-group-text" >name</span>
								  </div>
								  <input id="deleteNameAtSuite" name="deleteNameAtSuite" type="text" class="form-control">
								</div>
								     <div class="input-group">
								  <div class="input-group-prepend">
								    <span class="input-group-text">invocationCount</span>
								  </div>
								  <input id="deleteinvocationCountAtSuite" name="deleteinvocationCountAtSuite" type="text" class="form-control">
								</div>
								</div>
								</div>
								</div>	
								
							<div id="Test_Class" class="invisible mt-3">
							<ul class="nav nav-tabs" role="tablist">
							  <li class="nav-item">
							    <a class="nav-link active"  data-toggle="tab" href="#Test_Class_Update" role="tab" aria-controls="Test_Class_Update" aria-selected="false">Update</a>
							  </li>
							 </ul>
							<div class="tab-content mt-2" >
							  <div class="tab-pane fade show active" id="Test_Class_Update" role="tabpanel">
					        <div class="input-group">
							  <div class="input-group-prepend">
							    <span class="input-group-text" >Old Class Name</span>
							  </div>
							  <input id="updateTestClassClassNameOld" name="updateTestClassClassNameOld" placeholder="Old value" type="text" class="form-control">
							</div>
					        <div class="input-group">
							  <div class="input-group-prepend">
							    <span class="input-group-text" >New Class Name</span>
							  </div>
							  <input id="updateTestClassClassNameNew" name="updateTestClassClassNameNew" placeholder="New value" type="text" class="form-control">
							</div>
							</div>
							</div>
							</div>
								
							<div id="Test_Class_Method_Parameter" class="invisible mt-3">
							<ul class="nav nav-tabs" role="tablist">
							  <li class="nav-item">
							    <a class="nav-link active"  data-toggle="tab" href="#Test_Class_Method_Parameter_Update" role="tab" aria-controls="Test_Class_Method_Parameter_Update" aria-selected="false">Update</a>
							  </li>
							 </ul>
							<div class="tab-content mt-2" >
							  <div class="tab-pane fade show active" id="Test_Class_Method_Parameter_Update" role="tabpanel">
					        <div class="input-group">
							  <div class="input-group-prepend">
							    <span class="input-group-text" >Class Name</span>
							  </div>
							  <input id="updateTestClassMethodParamClassName" name="updateTestClassMethodParamClassName" type="text" class="form-control">
							</div>
					        <div class="input-group">
							  <div class="input-group-prepend">
							    <span class="input-group-text" >Method Name</span>
							  </div>
							  <input id="updateTestClassMethodParamMethodName" name="updateTestClassMethodParamMethodName" type="text" class="form-control">
							</div>
					        <div class="input-group">
							  <div class="input-group-prepend">
							    <span class="input-group-text" >Parameter Name</span>
							  </div>
							  <input id="updateTestClassMethodParamParameterName" name="updateTestClassMethodParamParameterName" type="text" class="form-control">
							</div>
					        <div class="input-group">
							  <div class="input-group-prepend">
							    <span class="input-group-text" >Parameter Value</span>
							  </div>
							  <input id="updateTestClassMethodParamValueOld" name="updateTestClassMethodParamValueOld" placeholder="Old value" type="text" class="form-control">
							  <input id="updateTestClassMethodParamValueNew" name="updateTestClassMethodParamValueNew" placeholder="New value" type="text" class="form-control">
							</div>
							</div>
							</div>
							</div>	
							</div>
					      </div>
					      <div class="modal-footer">
					        <button id="saveAction" type="button" class="btn btn-secondary">Save</button>
					      </div>
					    </div>
					  </div>
					</div>
					 	<input id="inputJson" class="invisible" name="inputJson" type="text">
						<div class="text-center">
							<button id="reviewbtn" type="submit" class="btn btn-dark">Process</button>
						</div>
						<div class="modal fade"  id="pageloader" tabindex="-1" role="dialog" aria-labelledby="loading" aria-hidden="true">
						  <div class="modal-dialog" role="document">
						    <div class="modal-content">
						      <div class="modal-body">Performing actions on Suites
								<div class="d-flex justify-content-center text-dark"> 
								   <div class="lds-ellipsis">
									   <div></div>
									   <div></div>
									   <div></div>
								   </div>
						      </div>
						    </div>
						  </div>
						</div>
					</div>
				</form>
			</div>
		</main>

		<!-- floating button -->
		<footer>
			<!-- Modal for footer -->
			<div class="modal fade" id="contactInfo" tabindex="-1" role="dialog" aria-labelledby="contactInfoLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="contactInfolLabel">Contact Us</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
					<p class="font-weight-bold">Contact us at below email Id</p>				    
			      	<ul>
			      		<li>Mohamed.Ismail@rbbn.com</li>
			      		<li>Ajit.Rajput@Rbbn.com</li>
			      	</ul>
			      </div>
			    </div>
			  </div>
			</div>
			<!-- Modal for footer -->
			
			<div class="float">
				<div class="btn-group" role="group">
					 <button id="contact" type="button" class="btn"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click to Contact"><i class="far fa-envelope"></i></button>
					 <button id="document" type="button" class="btn"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click to see document"> <i class="far fa-file-alt"></i> </button>
				</div>
			</div>
		</footer>

		<!-- import start -->
		<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
		<script src="https://kit.fontawesome.com/383fc2fcdd.js" crossorigin="anonymous"></script>
		<script type="text/javascript" src="js/sejs.js"></script>
	</body>
</html>