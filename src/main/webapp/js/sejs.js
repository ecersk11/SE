var actionCount = 0 ;

function init(){
	actionCount = 0 ;
	allActionLevel = "";
	actionId = 0;
	jsoninput = [];
	jsonString = "";
	console.log("value init");
}

// -----------------------
// input schema
// -----------------------

var suiteObj = 
{
	"actionLevel":[
		{
			"uiName":"Test > Class > Method > Parameter",
			"name":"Test_Class_Method_Parameter",
		},
		{
			"uiName":"Test > Class",
			"name":"Test_Class",
		},
		{
			"uiName":"Suite",
			"name":"Suite",
		}
	]
};

// -----------------------
// File related functions
// -----------------------
 
$('#filestatus').on('click', function(){
	enableGetFilePath();
});
$('#File').on('click', function(){
	enableGetFilePath();
});
$('#saveFilePath').on('click', function(value){
	$('#getFilePath').modal('hide');
	$('#filestatus').css('color','#58D68D');
	
	console.log("file Path Saved");
	$('#alertMessageBox').removeClass('alert-light');
	$('#alertMessageBox').addClass('alert-success');
	$('#alertMessageBox').html('File Added !');
	
	setTimeout(function(){
			$('#alertMessageBox').html('<br>');
			$('#alertMessageBox').removeClass();
			$('#alertMessageBox').addClass('alert alert-light');
		}, 5000);
});
function enableGetFilePath() {
	$('#alertMessageBox').html('<br>');
	$('#alertMessageBox').removeClass();
	$('#alertMessageBox').addClass('alert alert-light');

	$('#saveFilePath').prop("disabled", true);
	$('#getFilePath').modal('show');
	$('#file').on('change', function (value) {
		fileNameChange(value);
	})
	console.log("get file Path modal enabled");
}
function fileNameChange(value){
	var fileName = value.target.files[0].name;
	$('.custom-file-label').html(fileName);
	$('#saveFilePath').prop("disabled", false);
	$("#filestatus").attr('title','File Name set to : '+fileName);
	$('#addFile').html('<td class="text-muted">'+fileName+'</td>');
	console.log("file Path Saved : "+fileName);
};

// -----------------------
//footer functions 
// -----------------------

$('#contact').on('click', function(){
	console.log("open email info");
	$('#contactInfo').modal('show');
});
$('#document').on('click', function(){
	console.log("redirecting to confluence");
	location.replace("https://ilptlppjir01.ecitele.com:7443/confluence/display/NPT/Suite+Editor")
});


// -----------------------
// Action related functions
// -----------------------

var allActionLevel = "";
var actionId = 0;
var jsoninput = [];
var jsonString = "";

$('#actioncount').on('click', function(){
	initActionLevel();
});
$('#addaction').on('click', function(){
	initActionLevel();
});
function initActionLevel(){
	if(allActionLevel == ""){
		for(var i=0; i<suiteObj.actionLevel.length; i++){
			allActionLevel += '<option value="'+suiteObj.actionLevel[i].uiName+'">';
			console.log('Added Action Level : '+suiteObj.actionLevel[i].uiName);
		}
	}
	$('#browsers').html(allActionLevel);
	$('#browser').val('');
    for(var j=0; j<suiteObj.actionLevel.length; j++){
		$('#'+suiteObj.actionLevel[j].name).addClass('invisible');
	}
	$('#getAction').modal('show');
	$('#getAction').find('.modal-dialog').css('max-width','700px');
}

$("#browser").bind('input', function () {
	var x = document.getElementById("browsers");
	var inputValue = $('#browser').val();
    var i;
    for (i = 0; i < x.options.length; i++) {
        if(inputValue == x.options[i].value){
			console.log('selected action level : '+inputValue);
        }
    }
    for(var j=0; j<suiteObj.actionLevel.length; j++){
		$('#'+suiteObj.actionLevel[j].name).addClass('invisible');
	}
    for(var j=0; j<suiteObj.actionLevel.length; j++){
    	if(suiteObj.actionLevel[j].uiName == inputValue){
			$('#'+suiteObj.actionLevel[j].name).removeClass('invisible');
    	}
	}
	
});
$('#saveAction').on('click', function(){
	$('#getAction').modal('hide');
	var selectedAction = "";
	var activeTab = "";
	for(var j=0; j<suiteObj.actionLevel.length; j++){
    	if(suiteObj.actionLevel[j].uiName == $('#browser').val()){
			selectedAction = suiteObj.actionLevel[j].name;
    	}
	}
	var x = $('#'+selectedAction).find('a');
	for(var i=0; i<x.length; i++){
		if(x[i].classList.contains('active')){
			activeTab = x[i].text;
		}
	}
	var id = selectedAction+'_'+activeTab+'_'+actionId;
	actionId++;
	console.log("id : "+id);
	
	$('#alertMessageBox').html('<br>');
	$('#alertMessageBox').removeClass();
	$('#alertMessageBox').addClass('alert alert-light');
		
	$('#actioncount').css('color','#58D68D');
	$('#actioncount').find('span').html(actionCount);
		
	var actionListHtml = $('#ActionList').find('tbody').html();
	var userInterpretableActionMessage = createUserInterpretableActionMessage(id, selectedAction, activeTab);
	actionListHtml =  actionListHtml + userInterpretableActionMessage;
	$('#ActionList').find('tbody').html(actionListHtml);
	actionCount++;
		
	$('#alertMessageBox').removeClass('alert-light');
	$('#alertMessageBox').addClass('alert-success');
	$('#alertMessageBox').html('Action Added !');

	$('#addaction').on('click', function(){
		initActionLevel();
	});	
	setTimeout(function(){
		$('#alertMessageBox').html('<br>');
		$('#alertMessageBox').removeClass();
		$('#alertMessageBox').addClass('alert alert-light');
	}, 5000);
});

$(document).on('click', '.action-delete', function() {
	console.log("deleted an action");

	$('#alertMessageBox').html('<br>');
	$('#alertMessageBox').removeClass();
	$('#alertMessageBox').addClass('alert alert-light');
	
	for(var i=0; i<jsoninput.length; i++){
		console.log(jsoninput[i].id + " == " + $(this).closest('tr').attr('id'))
		if(jsoninput[i].id == $(this).closest('tr').attr('id')){
			console.log("done");
			jsoninput[i] = "DELETED";	
		}	
	}
	
	$(this).closest('tr').remove();
	actionCount--;
	$('#actioncount').find('span').html(actionCount);
	jsonString = JSON.stringify(jsoninput);
	$('#inputJson').val(jsonString);
	console.log(jsonString);
	if(actionCount == 0){
		$('#actioncount').css('color','#D35400');
	}
	
	$('#alertMessageBox').removeClass('alert-light');
	$('#alertMessageBox').addClass('alert-success');
	$('#alertMessageBox').html('Action Deleted !');
	
	setTimeout(function(){
			$('#alertMessageBox').html('<br>');
			$('#alertMessageBox').removeClass();
			$('#alertMessageBox').addClass('alert alert-light');
		}, 5000);
});

function createUserInterpretableActionMessage(id, selectedAction, activeTab){
	var message = '';
	if(selectedAction === 'Test_Class_Method_Parameter'){
		if(activeTab === 'Update') {
			var paramName =  $('#updateTestClassMethodParamParameterName').val();
			var paramValueOld = $('#updateTestClassMethodParamValueOld').val();
			var paramValueNew = $('#updateTestClassMethodParamValueNew').val();
			var className = $('#updateTestClassMethodParamClassName').val();
			var methodName = $('#updateTestClassMethodParamMethodName').val();
			if(paramName === ""){
				paramName = "NOT_SET";
			}
			if(paramValueOld === ""){
				paramValueOld = "NOT_SET";
			}
			if(paramValueNew === ""){
				paramValueNew = "NOT_SET";
			}
			if(className === ""){
				className = "NOT_SET";
			}
			if(methodName === ""){
				methodName = "NOT_SET";
			}
			jsoninput[jsoninput.length] = {"id":id, "action":selectedAction, "activeTab":activeTab, "ParameterName": paramName , "ParamValueOld":paramValueOld, "ParamValueNew":paramValueNew, "ParamClassName":className, "ParamMethodName": methodName}; 
			message = 'Updating Method Parameter ' + paramName + ' from ' + paramValueOld + ' to ' +  paramValueNew + ' where class name = ' + className + ' method name = ' + methodName;
		}
	} else if (selectedAction === 'Test_Class') {
		if(activeTab === 'Update') {
			var classNameOld = $('#updateTestClassClassNameOld').val();
			var classNameNew = $('#updateTestClassClassNameNew').val();
			if(classNameOld === ""){
				classNameOld = "NOT_SET";
			}
			if(classNameNew === ""){
				classNameNew = "NOT_SET";
			}
			jsoninput[jsoninput.length] = {"id":id, "action":selectedAction, "activeTab":activeTab, "ClassNameOld": classNameOld , "ClassNameNew":classNameNew}; 
			message = 'Updating Class Name from ' + classNameOld + ' to ' + classNameNew;
		}
	} else if (selectedAction === 'Suite') {
		if(activeTab === 'Add') {
			var name = $('#addNameAtSuite').val();
			var invocationCount = $('#addinvocationCountAtSuite').val();
			message = 'Adding Suite Parameter'; 
			if(!(name === null || name === "")){
				message += ' name = '+name;
			}		
			if(!(invocationCount === null || invocationCount === "")){
				if(!(name === null || name === "")){
					message += ' and';
				}		
				message += ' invocationCount = '+invocationCount;
			}		
			if(name === ""){
				name = "NOT_SET";
			}
			if(invocationCount === ""){
				invocationCount = "NOT_SET";
			}
			jsoninput[jsoninput.length] = {"id":id, "action":selectedAction, "activeTab":activeTab, "NameAtSuite":name , "InvocationCountAtSuite":invocationCount};
		} else if(activeTab === 'Update') {
			message = 'Updating Suite Parameter ';
			var nameOld = $('#updateNameAtSuiteOld').val();
			var nameNew = $('#updateNameAtSuiteNew').val();
			var invocationCountOld = $('#updateinvocationCountAtSuiteOld').val();
			var invocationCountNew = $('#UpdateinvocationCountAtSuiteNew').val();

			if(!(nameOld === null || nameOld === "" || nameNew === null || nameNew === "")){
				message += ' name from '+nameOld+' to '+nameNew;
			}		
			if(!(invocationCountOld === null || invocationCountOld === "" || invocationCountNew === null || invocationCountNew === "")){
				if(!(name === null || name === "")){
					message += ' and';
				}		
				message += ' invocationCount from '+invocationCountOld +' to '+invocationCountNew;
			}		
			if(nameOld === ""){
				nameOld = "NOT_SET";
			}
			if(nameNew === ""){
				nameNew = "NOT_SET";
			}
			if(invocationCountOld === ""){
				invocationCountOld = "NOT_SET";
			}
			if(invocationCountNew === ""){
				invocationCountNew = "NOT_SET";
			}
			jsoninput[jsoninput.length] = {"id":id, "action":selectedAction, "activeTab":activeTab, "NameAtSuiteOld":nameOld , "NameAtSuiteNew":nameNew , "invocationCountOld":invocationCountOld , "invocationCountNew":invocationCountNew};
		
		} else if(activeTab === 'Delete') {
			var name = $('#deleteNameAtSuite').val();
			var invocationCount = $('#deleteinvocationCountAtSuite').val();
			message = 'Deleting Suite Parameter'; 
			if(!(name === null || name === "")){
				message += ' name = '+name;
			}		
			if(!(invocationCount === null || invocationCount === "")){
				if(!(name === null || name === "")){
					message += ' and';
				}		
				message += ' invocationCount = '+invocationCount;
			}	
			if(name === ""){
				name = "NOT_SET";
			}
			if(invocationCount === ""){
				invocationCount = "NOT_SET";
			}	
			jsoninput[jsoninput.length] = {"id":id, "action":selectedAction, "activeTab":activeTab, "NameAtSuite":name , "InvocationCountAtSuite":invocationCount};
		}
	} 
	jsonString = JSON.stringify(jsoninput);
	$('#inputJson').val(jsonString);
	console.log(jsonString);
	var	actionListHtml = '<tr id="'+id+'"class="tdAdded"><td>'+ message +' <span class="float-right action-delete"><i class="far fa-trash-alt"></i></span></td></tr>';
	return actionListHtml;
}

$('#reviewbtn').on('click', function(){
	$('#pageloader').modal('show');
});


// -----------------------
// Results page related functions
// -----------------------


function onLoadResults(){
	console.log('onload call')
	var failCount = $('#incorrectlyEdited').find('span').html()
	if(failCount === '0'){
		console.log('no failed file');
	}else {
		$('#incorrectlyEdited').css('color','#D35400');
	}
	$('#download').click();
}

$('#SuiteCount').on('click', function(){
	$('#passSuite').addClass('invisible');
	$('#failSuite').addClass('invisible');
	$('#noEditSuite').addClass('invisible');
	$('#allSuite').removeClass('invisible');
});
$('#noEdit').on('click', function(){
	$('#allSuite').addClass('invisible');
	$('#passSuite').addClass('invisible');
	$('#failSuite').addClass('invisible');
	$('#noEditSuite').removeClass('invisible');
});
$('#correctlyEdited').on('click', function(){
	$('#allSuite').addClass('invisible');
	$('#failSuite').addClass('invisible');
	$('#noEditSuite').addClass('invisible');
	$('#passSuite').removeClass('invisible');
});
$('#incorrectlyEdited').on('click', function(){
	$('#allSuite').addClass('invisible');
	$('#passSuite').addClass('invisible');
	$('#noEditSuite').addClass('invisible');
	$('#failSuite').removeClass('invisible');
});


