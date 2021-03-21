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
	<body onload="onLoadResults()">

		<!-- Header Start -->
		<header>
			<div>
				<nav class="navbar navbar-light navbar-custom justify-content-between">
					<div class="navmargin">
						<a href="se.jsp" class="navbar-brand" data-toggle="tooltip" data-placement="bottom" title="Unique code : ${uniqueId}" >
							<i class="far fa-edit mx-2"></i>Suite Editor
						</a>
					</div>
					<div class="navmargin">
						<div class="btn-group" role="group">
						  <button id="SuiteCount" type="button" class="btn"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Total Suites"><i class="fas fa-circle"></i> <span class="badge bg-light">${SuiteCount}</span></button>
						  <button id="noEdit" type="button" class="btn"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="No Edit"><i class="far fa-circle"></i> <span class="badge bg-light">${noEdit}</span></button>
						  <button id="correctlyEdited" type="button" class="btn"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Total Correctly Edited"><i class="far fa-check-circle"></i> <span class="badge bg-light">${correctlyEdited}</span></button>
						  <button id="incorrectlyEdited" type="button" class="btn"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Error while Editing"><i class="far fa-times-circle"></i> <span class="badge bg-light">${incorrectlyEdited}</span></button>
						</div>
					</div>					
				</nav>
			</div>
		</header>
	
		<!-- Main Body -->
				<form action="results" method="post" enctype="multipart/form-data">
		<main>
			<div id="mainBody" class="container">
					
					<!-- Page contains -->
					<div>
						<div id="alertMessageBox" class="alert alert-light mb-10" role="alert">
							<br>							
						</div>
						<div id="SuiteList">
							<table id="allSuite" class="table table-striped shadow">
						  		<thead class="thead-dark">
						    		<tr>
						      			<th scope="col"><i class="fas fa-sliders-h mx-2"></i> Edited Suites</th>
						    		</tr>
						  		</thead>
						  		<tbody>
								    <c:forEach items="${allSuite}" var="allSuite">
								        ${allSuite}
								    </c:forEach>
						  		</tbody>
							</table>
							<table id="passSuite" class="table table-striped shadow invisible">
						  		<thead class="thead-dark">
						    		<tr>
						      			<th scope="col"><i class="fas fa-sliders-h mx-2"></i> Edited Suites</th>
						    		</tr>
						  		</thead>
						  		<tbody>
								    <c:forEach items="${passSuite}" var="passSuite">
								        ${passSuite}
								    </c:forEach>
						  		</tbody>
							</table>
							<table id="failSuite" class="table table-striped shadow invisible">
						  		<thead class="thead-dark">
						    		<tr>
						      			<th scope="col"><i class="fas fa-sliders-h mx-2"></i> Edited Suites</th>
						    		</tr>
						  		</thead>
						  		<tbody>
								    <c:forEach items="${failSuite}" var="failSuite">
								        ${failSuite}
								    </c:forEach>
						  		</tbody>
							</table>
							<table id="noEditSuite" class="table table-striped shadow invisible">
						  		<thead class="thead-dark">
						    		<tr>
						      			<th scope="col"><i class="fas fa-sliders-h mx-2"></i> Edited Suites</th>
						    		</tr>
						  		</thead>
						  		<tbody>
								    <c:forEach items="${noEditSuite}" var="noEditSuite">
								        ${noEditSuite}
								    </c:forEach>
						  		</tbody>
							</table>
						</div>	
					</div>
			</div>
		</main>

		<!-- floating button -->
		<footer>
			<div class="float">
				<div class="btn-group" role="group">
					 <button type="submit" id="download" type="button" class="btn btn-dark"  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click to Download"><i class="fas fa-cloud-download-alt"></i> Download</button>
				</div>
			</div>
		</footer>
				</form>

		<!-- import start -->
		<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
		<script src="https://kit.fontawesome.com/383fc2fcdd.js" crossorigin="anonymous"></script>
		<script type="text/javascript" src="js/sejs.js"></script>
	</body>
</html>