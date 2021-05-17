package com.suite.pojo;

public class UserInputData {
	
	public String	id	= null;
	public String	action	= null;
	public String	activeTab	= null;
	public String	ParamClassName	= null;
	public String	ParamMethodName	= null;
	public String	ParameterName	= null;
	public String	ParamValueOld	= null;
	public String	ParamValueNew	= null;
	public String	ClassNameOld	= null;
	public String	ClassNameNew	= null;
	public String	NameAtSuite	= null;
	public String	InvocationCountAtSuite	= null;
	public String	NameAtSuiteOld	= null;
	public String	NameAtSuiteNew	= null;
	public String	invocationCountOld	= null;
	public String	invocationCountNew	= null;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getActiveTab() {
		return activeTab;
	}
	public void setActiveTab(String activeTab) {
		this.activeTab = activeTab;
	}
	public String getParamClassName() {
		return ParamClassName;
	}
	public void setParamClassName(String paramClassName) {
		ParamClassName = paramClassName;
	}
	public String getParamMethodName() {
		return ParamMethodName;
	}
	public void setParamMethodName(String paramMethodName) {
		ParamMethodName = paramMethodName;
	}
	public String getParameterName() {
		return ParameterName;
	}
	public void setParameterName(String parameterName) {
		ParameterName = parameterName;
	}
	public String getParamValueOld() {
		return ParamValueOld;
	}
	public void setParamValueOld(String paramValueOld) {
		ParamValueOld = paramValueOld;
	}
	public String getParamValueNew() {
		return ParamValueNew;
	}
	public void setParamValueNew(String paramValueNew) {
		ParamValueNew = paramValueNew;
	}
	public String getClassNameOld() {
		return ClassNameOld;
	}
	public void setClassNameOld(String classNameOld) {
		ClassNameOld = classNameOld;
	}
	public String getClassNameNew() {
		return ClassNameNew;
	}
	public void setClassNameNew(String classNameNew) {
		ClassNameNew = classNameNew;
	}
	public String getNameAtSuite() {
		return NameAtSuite;
	}
	public void setNameAtSuite(String nameAtSuite) {
		NameAtSuite = nameAtSuite;
	}
	public String getInvocationCountAtSuite() {
		return InvocationCountAtSuite;
	}
	public void setInvocationCountAtSuite(String invocationCountAtSuite) {
		InvocationCountAtSuite = invocationCountAtSuite;
	}
	public String getNameAtSuiteOld() {
		return NameAtSuiteOld;
	}
	public void setNameAtSuiteOld(String nameAtSuiteOld) {
		NameAtSuiteOld = nameAtSuiteOld;
	}
	public String getNameAtSuiteNew() {
		return NameAtSuiteNew;
	}
	public void setNameAtSuiteNew(String nameAtSuiteNew) {
		NameAtSuiteNew = nameAtSuiteNew;
	}
	public String getInvocationCountOld() {
		return invocationCountOld;
	}
	public void setInvocationCountOld(String invocationCountOld) {
		this.invocationCountOld = invocationCountOld;
	}
	public String getInvocationCountNew() {
		return invocationCountNew;
	}
	public void setInvocationCountNew(String invocationCountNew) {
		this.invocationCountNew = invocationCountNew;
	}
	@Override
	public String toString() {
		return "UserInputData [id=" + id + ", action=" + action + ", activeTab=" + activeTab + ", ParamClassName="
				+ ParamClassName + ", ParamMethodName=" + ParamMethodName + ", ParameterName=" + ParameterName
				+ ", ParamValueOld=" + ParamValueOld + ", ParamValueNew=" + ParamValueNew + ", ClassNameOld="
				+ ClassNameOld + ", ClassNameNew=" + ClassNameNew + ", NameAtSuite=" + NameAtSuite
				+ ", InvocationCountAtSuite=" + InvocationCountAtSuite + ", NameAtSuiteOld=" + NameAtSuiteOld
				+ ", NameAtSuiteNew=" + NameAtSuiteNew + ", invocationCountOld=" + invocationCountOld
				+ ", invocationCountNew=" + invocationCountNew + "]";
	}
}
