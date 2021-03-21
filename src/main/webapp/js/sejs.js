var actionCount = 0 ;

// -----------------------
// input schema
// -----------------------

var suiteObj = 
{
	"actionLevel":[
		{
			"uiName":"Test > Class > Method > Parameter",
			"name":"Test_Class_Method_Parameter"
		},
		{
			"uiName":"Suite",
			"name":"Suite"
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
var idList = [];

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
	
	var id = selectedAction+'_'+activeTab;
	console.log("id : "+id);
	var isMatch = false;
	
	for(var i=0; i<idList.length; i++){
		if(id === idList[i]){
			isMatch = true;
			console.log('Id present')		
		}	
	}
	$('#alertMessageBox').html('<br>');
	$('#alertMessageBox').removeClass();
	$('#alertMessageBox').addClass('alert alert-light');
		
	if(!isMatch){	
		var count = idList.length;
		idList[idList.length] = id;
		actionCount++;
		
		$('#actioncount').css('color','#58D68D');
		$('#actioncount').find('span').html(actionCount);
		
		var actionListHtml = $('#ActionList').find('tbody').html();
		var serInterpretableActionMessage = createUserInterpretableActionMessage(id, selectedAction, activeTab);
		actionListHtml = serInterpretableActionMessage + actionListHtml;
		$('#ActionList').find('tbody').html(actionListHtml);
		
		$('#alertMessageBox').removeClass('alert-light');
		$('#alertMessageBox').addClass('alert-success');
		$('#alertMessageBox').html('Action Added !');

		$('#addaction').on('click', function(){
			initActionLevel();
		});	
	}else{
		$('#alertMessageBox').removeClass('alert-light');
		$('#alertMessageBox').addClass('alert-danger');
		$('#alertMessageBox').html('Action already present, duplicate action can not exists together !');
	}
	setTimeout(function(){
			$('#alertMessageBox').html('<br>');
			$('#alertMessageBox').removeClass();
			$('#alertMessageBox').addClass('alert alert-light');
		}, 5000);
});

$(document).on('click', '.action-delete', function() {
	console.log("deleted an action");
	actionCount--;
	var id = $(this).closest('tr').attr('id');
	for(var i=0; i<idList.length; i++){
		if(idList[i] === id){
			delete idList[i];
		}
	}
	$('#alertMessageBox').html('<br>');
	$('#alertMessageBox').removeClass();
	$('#alertMessageBox').addClass('alert alert-light');
	
	$(this).closest('tr').remove();
	$('#actioncount').find('span').html(actionCount);
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

function createKeyValueList(id){
	var keyValue = "";
	var keylist = $('#'+id).find('span');
	var valuelist = $('#'+id).find('input');
	
	console.log('keylist '+keylist.length);
	
	for(var i=0; i<keylist.length; i++){
		if(!($('#'+valuelist[i].id).val() === null || $('#'+valuelist[i].id).val() === "" )){
			keyValue += keylist[i].textContent+'='+ $('#'+valuelist[i].id).val();
			if(i != keylist.length-1){
				keyValue += ' , ';
			}
		} 
	}
	return keyValue;
}

function createUserInterpretableActionMessage(id, selectedAction, activeTab){
	var message = '';
	if(selectedAction === 'Test_Class_Method_Parameter'){
		if(activeTab === 'Update') {
			message = 'Updating Method Parameter ' + $('#updateTestClassMethodParamParameterName').val() + ' from ' + $('#updateTestClassMethodParamValueOld').val() + ' to ' +  $('#updateTestClassMethodParamValueNew').val() + ' where class name = ' + $('#updateTestClassMethodParamClassName').val() + ' method name = ' + $('#updateTestClassMethodParamMethodName').val();
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
		}
	} 
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
