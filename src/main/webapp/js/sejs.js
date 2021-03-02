var actionOptions = ["Suite","Suite > Listeners","Suite > Parameter","Suite > Test"];
var suiteAttr = ["name","invocationCount"];
var suiteParameterAttr = ["configFilePath","onTheFlyInputFilePath"];

var actionCount = 0 ;
var actionType = "Add";
var actionLevel = "";
var actionTableContain = "";
var actionList = "";

onHomePageLoad();
$('#actionType').html("Add");

function onHomePageLoad(){
	var actionOptionsList = "";
	var editOption= "";
	actionOptions.forEach(updateActionOptions);
	function updateActionOptions(actionOptions){
		editOption += "<option value='"+actionOptions+"'>";
	}
	$("#browsers").html(editOption)
}

function submitEnable(){
	$("#footerArea").removeClass('invisible');
}

$("#browser").bind('input', function () {
    var x = document.getElementById("browsers");
	var inputValue = $('#browser').val();
    var i;
    for (i = 0; i < x.options.length; i++) {
        if(inputValue == x.options[i].value){
			actionLevel = inputValue;
			console.log('selected action level : '+inputValue);
			functionModel();
        }
    }
});

$('.dropdown-menu').on( 'click', 'a', function() {
  actionType= $(this).html();
  console.log('selected action type : '+actionType);
  $('#actionType').html(actionType);
});

var inputGroupHtml = "";
var model = "";

function functionModel() {
var getModel = "";
var attributeList = "";
if(actionLevel === "Suite"){
		console.log("suite Attribute action called");
		attributeList = suiteAttr;
	} else if (actionLevel === "Suite > Parameter") {
		console.log("suite > Parameter - Attribute action called");
		attributeList = suiteParameterAttr;
	}
	inputGroupHtml = "";
	model = "";
	attributeList.forEach(addInputGroup);
	console.log(inputGroupHtml);		
	addModel();
	console.log("model >> " +model);
	$('#getInput').html(model);
	$('#addModal').modal('show');		
	$('#browser').val("");
	$('#actionType').html("Add");
			
}
function addInputGroup(value){
inputGroupHtml = inputGroupHtml+ '<div class="input-group">'+
					  '<div class="input-group-prepend">'+
					    '<span class="input-group-text" >'+value+'</span>'+
					  '</div>'+
					  '<input id="'+actionType+actionLevel+value+'" name="'+actionType+actionLevel+value+'" type="text" class="form-control">'+
					'</div>';
		
					
}


function addModel(){			
model = '<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">'+
			  '<div class="modal-dialog" role="document">'+
			    '<div class="modal-content">'+
			      '<div class="modal-header">'+
			        '<h5 class="modal-title" id="addModalLabel">Add '+actionLevel+' Attribute</h5>'+
			        '<button id="addcloseModel" type="button" class="close" data-dismiss="modal" aria-label="Close">'+
			          '<span aria-hidden="true">&times;</span>'+
			        '</button>'+
			      '</div>'+
			      '<div class="modal-body">'+
			     	 inputGroupHtml+
			      '</div>'+
			      '<div class="modal-footer">'+
			        '<button id="AddSaveAtSuite" type="button" class="btn btn-primary">Save changes</button>'+
			      '</div>'+
			    '</div>'+
			  '</div>'+
			'</div>';
}

function functionSuiteModel(actionType, actionLevel) {
	$('#browser').val("");
	$('#actionType').html("Add");
	
	if(actionType === "Add"){
		$('#addexampleModal').modal('show');
	} else if (actionType === "Update") {
		$('#updateexampleModal').modal('show');
	} else if (actionType === "Delete"){
		$('#deleteexampleModal').modal('show');
	}
}

$('#AddSaveAtSuite').on('click',function(){
	$('#addexampleModal').modal('hide');
	$('#ActionList').removeClass('invisible');
	var name= $('#addNameAtSuite').val();
	var invocationCount=$('#addinvocationCountAtSuite').val();
	console.log('Adding suite attribute name=' + name);
	console.log('Adding suite attribute invocationCount='+invocationCount);
	if(!(name == null || name == "")) {
		actionCount++;
		actionTableContain = $('tbody').html();
		actionTableContain = actionTableContain +'<tr id="action'+actionCount+'"><td> Adding suite attribute name=' + name +'<span id="deleteAction'+actionCount+'" class="float-right action-delete"><i class="far fa-trash-alt"></i></span></td></tr>';
		actionList = actionList +'<tr><td> Adding suite attribute name=' + name +'</td></tr>';
		$('tbody').html(actionTableContain);
	}
	if(!(invocationCount == null || invocationCount == "")) {
		actionCount++;
		actionTableContain = $('tbody').html();
		actionTableContain = actionTableContain +'<tr id="action'+actionCount+'"><td> Adding suite attribute invocationCount=' + invocationCount+'<span id="deleteAction'+actionCount+'" class="float-right action-delete"><i class="far fa-trash-alt"></i></span></td></tr>';
		actionList = actionList +'<tr><td> Adding suite attribute invocationCount=' + invocationCount+'</td></tr>';
		$('tbody').html(actionTableContain);
	}
	submitEnable();
});
$('#UpdateSaveAtSuite').on('click',function(){
	$('#updateexampleModal').modal('hide');
	$('#ActionList').removeClass('invisible');
	var nameOld= $('#updateNameAtSuiteOld').val();
	var nameNew= $('#updateNameAtSuiteNew').val();
	var invocationCountOld=$('#updateinvocationCountAtSuiteOld').val();
	var invocationCountNew=$('#UpdateinvocationCountAtSuiteNew').val();
	
	console.log('Updating suite attribute name='+ nameNew +' where name='+ nameOld);
	console.log('Updating suite attribute invocationCount='+invocationCountNew+' where invocationCount='+invocationCountOld);
	
	if(!(nameOld == null || nameOld == "" || nameNew == null || nameNew == "")) {
		actionCount++;
		actionTableContain = $('tbody').html();
		actionTableContain = actionTableContain + '<tr id="action'+actionCount+'"><td> Updating suite attribute name='+ nameNew +' where name='+ nameOld+'<span id="deleteAction'+actionCount+'" class="float-right action-delete"><i class="far fa-trash-alt"></i></span></td></tr>';
		actionList = actionList +'<tr><td> Updating suite attribute name='+ nameNew +' where name='+ nameOld+'</td></tr>';
		$('tbody').html(actionTableContain);
	}
	if(!(invocationCountOld == null || invocationCountOld == "" || invocationCountNew == null || invocationCountNew == "")) {
		actionCount++;
		actionTableContain = $('tbody').html();
		actionTableContain = actionTableContain +'<tr id="action'+actionCount+'"><td> Updating suite attribute invocationCount='+invocationCountNew+' where invocationCount='+invocationCountOld+'<span id="deleteAction'+actionCount+'" class="float-right action-delete"><i class="far fa-trash-alt"></i></span></td></tr>';
		actionList = actionList +'<tr><td> Updating suite attribute invocationCount='+invocationCountNew+' where invocationCount='+invocationCountOld+'</td></tr>';
		$('tbody').html(actionTableContain);
	}
	submitEnable();
});
$('#DeleteSaveAtSuite').on('click',function(){
	$('#deleteexampleModal').modal('hide');
	$('#ActionList').removeClass('invisible');
	var name= $('#deleteNameAtSuite').val();
	var invocationCount=$('#deleteinvocationCountAtSuite').val();
	console.log('Deleting suite attribute name=' + name);
	console.log('Deleting suite attribute invocationCount='+invocationCount);
	if(!(name == null || name == "")) {
		actionCount++;
		actionTableContain = $('tbody').html();
		actionTableContain = actionTableContain +'<tr id="action'+actionCount+'"><td> Deleting suite attribute name=' + name +'<span id="deleteAction'+actionCount+'" class="action-delete float-right"><i class="far fa-trash-alt"></i></span></td></tr>';
		actionList = actionList +'<tr><td> Deleting suite attribute name=' + name +'</td></tr>';
		$('tbody').html(actionTableContain);
	}
	if(!(invocationCount == null || invocationCount == "")) {
		actionCount++;
		actionTableContain = $('tbody').html();
		actionTableContain = actionTableContain +'<tr id="action'+actionCount+'"><td> Deleting suite attribute invocationCount=' + invocationCount +'<span id="deleteAction'+actionCount+'" class="action-delete float-right"><i class="far fa-trash-alt"></i></span></td></tr>';
		actionList = actionList +'<tr><td> Deleting suite attribute invocationCount=' + invocationCount +'</td></tr>';
		$('tbody').html(actionTableContain);
	}
	submitEnable();
});

$("#addcloseModel").on('click',function(){
 actionType = $('#actionType').html();
});
$("#updatecloseModel").on('click',function(){
 actionType = $('#actionType').html();
});
$("#deletecloseModel").on('click',function(){
  actionType = $('#actionType').html();
});
$(document).on('click', '.action-delete', function() {
	console.log("delete");
	$(this).closest('tr').remove();
});
$("#uploadSuites").on('click', function(){
	$("#getFolderPath").modal('show');
});
$("#reviewbtn").on('click', function(){
	$("#getFolderPath").modal('hide');
});

