/**
 * http://usejsdoc.org/
 */

var printRegExp = /([\s\S]*)<%=\s+([\S]+)\s+%>([\s\S]*)/;
function translateFilterPrint(line)
{
	var result = line.match(printRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[3] != null && result[3] != '') ret.post = result[3];
		ret.line = line.replace(printRegExp,'__html__ += '+result[2]+';');
		return ret;
	}else{
		return false;
	}
}

var eachStartRegExp = /([\s\S]*)<%each\s+([\S]+)\s+in\s+([\S]+)\s+%>([\s\S]*)/;
function translateFilterEachStart(line)
{
	var result = line.match(eachStartRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[4] != null && result[4] != '') ret.post = result[4];
		ret.line = line.replace(eachStartRegExp,'for(var '+result[2]+' in '+result[3]+'){');
		return ret;
	}else{
		return false;
	}
}

var eachEndRegExp=/([\s\S]*)<%each%>([\s\S]*)/;
function translateFilterEachEnd(line)
{
	var result = line.match(eachEndRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[2] != null && result[2] != '') ret.post = result[2];
		ret.line = line.replace(eachEndRegExp,'}');
		return ret;
	}else{
		return false;
	}
}

var ifStartRegExp = /([\s\S]*)<%if\s+([\S\s]+)\s+%>([\s\S]*)/;
function translateFilterIfStart(line)
{
	var result = line.match(ifStartRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[3] != null && result[3] != '') ret.post = result[3];
		ret.line = line.replace(ifStartRegExp,'if('+result[2]+'){');
		return ret;
	}else{
		return false;
	}
}

var ifEndRegExp = /([\s\S]*)<%if%>([\s\S]*)/;
function translateFilterIfEnd(line)
{
	var result = line.match(ifEndRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[2] != null && result[2] != '') ret.post = result[2];
		ret.line = line.replace(ifEndRegExp,'}');
		return ret;
	}else{
		return false;
	}
}

var elseRegExp = /([\s\S]*)<%else%>([\s\S]*)/;
function translateFilterElse(line)
{
	var result = line.match(elseRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[2] != null && result[2] != '') ret.post = result[2];
		ret.line = line.replace(elseRegExp,'}else{');
		return ret;
	}else{
		return false;
	}
}

var elseifStartRegExp = /([\s\S]*)<%elseif\s+([\S\s]+)\s+%>([\s\S]*)/;
function translateFilterElseif(line)
{
	var result = line.match(elseifStartRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[3] != null && result[3] != '') ret.post = result[3];
		ret.line = line.replace(elseifStartRegExp,'}else if('+result[2]+'){');
		return ret;
	}else{
		return false;
	}
}

var caseStartRegExp = /([\s\S]*)<%case\s+([\S]+)\s+%>([\s\S]*)/;
function translateFilterCaseStart(line)
{
	var result = line.match(caseStartRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[3] != null && result[3] != '') ret.post = result[3];
		ret.line = line.replace(caseStartRegExp,'switch('+result[2]+'){');
		return ret;
	}else{
		return false;
	}
}

var isRegExp = /([\s\S]*)<%is\s+([\S]+)\s+%>([\s\S]*)/;
function translateFilterIs(line)
{
	var result = line.match(isRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[3] != null && result[3] != '') ret.post = result[3];
		ret.line = line.replace(isRegExp,'case '+result[2]+':');
		return ret;
	}else{
		return false;
	}
}

var endRegExp = /([\s\S]*)<%end%>([\s\S]*)/;
function translateFilterEnd(line)
{
	var result = line.match(endRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[2] != null && result[2] != '') ret.post = result[2];
		ret.line = line.replace(endRegExp,'break;');
		return ret;
	}else{
		return false;
	}
}

var otherRegExp = /([\s\S]*)<%other%>([\s\S]*)/;
function translateFilterOther(line)
{
	var result = line.match(otherRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[2] != null && result[2] != '') ret.post = result[2];
		ret.line = line.replace(otherRegExp,'default:');
		return ret;
	}else{
		return false;
	}
}

var caseEndRegExp = /([\s\S]*)<%case%>([\s\S]*)/;
function translateFilterCaseEnd(line)
{
	var result = line.match(caseEndRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[2] != null && result[2] != '') ret.post = result[2];
		ret.line = line.replace(caseEndRegExp,'}');
		return ret;
	}else{
		return false;
	}
}

var scriptRegExp = /([\s\S]*)<%\s([\S\s]+)\s%>([\s\S]*)/;
function translateFilterScript(line)
{
	var result = line.match(scriptRegExp);
	var ret = {
		pre:null,
		line:'',
		post:null
	};
	if(result){
		if(result[1] != null && result[1] != '') ret.pre = result[1];
		if(result[3] != null && result[3] != '') ret.post = result[3];
		ret.line = line.replace(scriptRegExp,result[2]);
		return ret;
	}else{
		return false;
	}
}

function translateFilterBasic(line)
{
	line = line.replace(/'/g,'"');
	return '__html__ += \''+line+'\';';
}


function recursionTranslateFilter(line)
{
	if(!line || line.trim() == '') return '';
	var result = false;
	result = translateFilterPrint(line);
	if(result){
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterEachStart(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterEachEnd(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterIfStart(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterIfEnd(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterElse(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterElseif(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterCaseStart(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterIs(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterEnd(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterOther(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterCaseEnd(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	result = translateFilterScript(line);
	if(result) {
		return recursionTranslateFilter(result.pre)
			+result.line
			+recursionTranslateFilter(result.post);
	}
	return translateFilterBasic(line);
}

exports.translateRPLS = function(line){
	return recursionTranslateFilter(line);
};
