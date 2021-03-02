var actionCount = 0 ;
var actionType = "Add";
var actionLevel = "";
var actionTableContain = "";
var actionList = "";

function submitEnable(){
	$("#footerArea").removeClass('invisible');
}

$('#actionType').html("Add");

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

function functionModel() {
	if(actionLevel === "Suite"){
		console.log("suite Attribute action called");
		functionSuiteModel(actionType, actionLevel);
	}
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

