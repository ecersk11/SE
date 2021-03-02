<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<title>Suite Editor</title>
		<link rel="stylesheet" type="text/css" href="css/se.css">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
	</head>
	<body>
			<!-- Main body start -->

			<!-- Nav start -->
	<nav class="navbar navbar-light bg-light justify-content-between">
		<a class="navbar-brand">
			<i class="far fa-edit"></i>Suite Editor
		</a>
	</nav>
			<!-- Nav End-->

			<!-- Below Nav start -->
		<div id="MainBody" class="container">
			<!-- Drop Down start -->
			<div id="selectAction">
			<div class="input-group mb-3">
			  <div class="input-group-prepend">
			    <button id="actionType" class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add</button>
			    <div class="dropdown-menu">
			      <a class="dropdown-item" href="#">Add</a>
			      <a class="dropdown-item" href="#">Update</a>
			      <a class="dropdown-item" href="#">Delete</a>
			    </div>
			     <span class="input-group-text" id="">Attribute/s At</span>
			  </div>
			  <div class="input-group-append">
			     <div id="ActionSelector" >
				  <input placeholder="Select Suite Edit Action" list="browsers" name="browser" id="browser" class="form-control">
				  <datalist id="browsers"></datalist>
				  </div>
			  </div>
			</div>
			</div>
			<!-- Drop Down End -->


		<form action="Input" method="post" enctype="multipart/form-data">
			<!-- Modal -->
			<div class="modal fade" id="addexampleModal" tabindex="-1" role="dialog" aria-labelledby="addexampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="addexampleModalLabel">Add Suite Attribute</h5>
			        <button id="addcloseModel" type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        <div class="input-group">
					  <div class="input-group-prepend">
					    <span class="input-group-text" >name</span>
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
			      <div class="modal-footer">
			        <button id="AddSaveAtSuite" type="button" class="btn btn-primary">Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>


			<!-- Modal -->
			<div class="modal fade" id="deleteexampleModal" tabindex="-1" role="dialog" aria-labelledby="deleteexampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="deleteexampleModalLabel">Delete Suite Attribute</h5>
			        <button id="deletecloseModel" type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        <div class="input-group">
					  <div class="input-group-prepend">
					    <span class="input-group-text" >name</span>
					  </div>
					  <input id="deleteNameAtSuite" name="deleteNameAtSuite" type="text" class="form-control">
					</div>
			        <div class="input-group">
					  <div class="input-group-prepend">
					    <span class="input-group-text" >invocationCount</span>
					  </div>
					  <input id="deleteinvocationCountAtSuite" name="deleteinvocationCountAtSuite" type="text" class="form-control">
					</div>
			      </div>
			      <div class="modal-footer">
			        <button id="DeleteSaveAtSuite" type="button" class="btn btn-primary">Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>
			
			
			<!-- Modal -->
			<div class="modal fade" id="updateexampleModal" tabindex="-1" role="dialog" aria-labelledby="updateexampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="updateexampleModalLabel">Update Suite Attribute</h5>
			        <button id="updatecloseModel" type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        <div class="input-group">
					  <div class="input-group-prepend">
					    <span class="input-group-text" id="">name</span>
					  </div>
					  <input id="updateNameAtSuiteOld" name="updateNameAtSuiteOld" placeholder="old" type="text" class="form-control">
					  <input id="updateNameAtSuiteNew" name="updateNameAtSuiteNew" placeholder="new" type="text" class="form-control">
					</div>
			        <div class="input-group">
					  <div class="input-group-prepend">
					    <span class="input-group-text" id="">invocationCount</span>
					  </div>
					  <input id="updateinvocationCountAtSuiteOld" name="updateinvocationCountAtSuiteOld" placeholder="old" type="text" class="form-control">
					  <input id="UpdateinvocationCountAtSuiteNew" name="updateinvocationCountAtSuiteNew" placeholder="new" type="text" class="form-control">
					</div>
			      </div>
			      <div class="modal-footer">
			        <button  id="UpdateSaveAtSuite" type="button" class="btn btn-primary">Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>
			
			
			
			<!-- Modal -->
			     
			<div class="modal fade" id="getFolderPath" tabindex="-1" role="dialog" aria-labelledby="getFolderexampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="getFolderexampleModalLabel">Upload Suite folder (Zipped)</h5>
			        <button id="getFoldercloseModel" type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			    <input type="file" name="file" /><br/><br/>
			      </div>
			      <div class="modal-footer">
			        <button id="reviewbtn" type="submit" class="btn btn-light">Process</button>
			      </div>
			    </div>
			  </div>
			</div>
		</form>
			
			<!-- Action Table Start -->
			<div id="ActionList" class="invisible">
				<table class="table table-striped">
			  		<thead>
			    		<tr>
			      			<th scope="col">Suite Edit Actions</th>
			    		</tr>
			  		</thead>
			  		<tbody></tbody>
				</table>
			</div>			
			<!-- Action Table End -->
			
		
		</div>
			<!-- Below Nav end -->
			<!-- footer -->
		<div id="footerArea" class="invisible mt-10">
		  	<div class="text-center">
			  	<button id="uploadSuites" class="btn btn-light">Upload Suites</button>
		  	</div>
		</div>






			  
			<!-- footer -->
			  	
			
			<!-- Main body end -->
		<!-- import start -->
			<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
			<script src="https://kit.fontawesome.com/383fc2fcdd.js" crossorigin="anonymous"></script>
			<script type="text/javascript" src="js/sejs.js"></script>
		<!-- import end -->
	</body>
</html>