/**
 * http://usejsdoc.org/
 */

var printRegExp = /([\s\S]*)<%=\s+([\S]+)\s+%>([\s\S]*)/;
function translateFilterPrint(line)
{
	var result = line.match(printRegExp);
	if(result){
		line = '__html__ += \''+result[1].replace(/'/g,'"')+'\';'+ 
				line.replace(printRegExp,'__html__ += '+result[2]+';')+
				'__html__ += \''+result[3].replace(/'/g,'"')+'\';';
		return line;
	}else{
		return false;
	}
}

var eachStartRegExp = /<%each\s+([\S]+)\s+in\s+([\S]+)\s+%>/;
function translateFilterEachStart(line)
{
	var result = line.match(eachStartRegExp);
	if(result){
		line = line.replace(eachStartRegExp,'for(var '+result[1]+' in '+result[2]+'){');
		return line;
	}else{
		return false;
	}
}

var eachEndRegExp=/<%each%>/;
function translateFilterEachEnd(line)
{
	var result = line.match(eachEndRegExp);
	if(result){
		line = line.replace(eachEndRegExp,'}');
		return line;
	}else{
		return false;
	}
}

var ifStartRegExp = /<%if\s+([\S\s]+)\s+%>/;
function translateFilterIfStart(line)
{
	var result = line.match(ifStartRegExp);
	if(result){
		line = line.replace(ifStartRegExp,'if('+result[1]+'){');
		return line;
	}else{
		return false;
	}
}

var ifEndRegExp = /<%if%>/;
function translateFilterIfEnd(line)
{
	var result = line.match(ifEndRegExp);
	if(result){
		line = line.replace(ifEndRegExp,'}');
		return line;
	}else{
		return false;
	}
}

var elseRegExp = /<%else%>/;
function translateFilterElse(line)
{
	var result = line.match(elseRegExp);
	if(result){
		line = line.replace(elseRegExp,'}else{');
		return line;
	}else{
		return false;
	}
}

var elseifStartRegExp = /<%elseif\s+([\S\s]+)\s+%>/;
function translateFilterElseif(line)
{
	var result = line.match(elseifStartRegExp);
	if(result){
		line = line.replace(elseifStartRegExp,'}else if('+result[1]+'){');
		return line;
	}else{
		return false;
	}
}

var caseStartRegExp = /<%case\s+([\S]+)\s+%>/;
function translateFilterCaseStart(line)
{
	var result = line.match(caseStartRegExp);
	if(result){
		line = line.replace(caseStartRegExp,'switch('+result[1]+'){');
		return line;
	}else{
		return false;
	}
}

var isRegExp = /<%is\s+([\S]+)\s+%>/;
function translateFilterIs(line)
{
	var result = line.match(isRegExp);
	if(result){
		line = line.replace(isRegExp,'case '+result[1]+':');
		return line;
	}else{
		return false;
	}
}

var endRegExp = /<%end%>/;
function translateFilterEnd(line)
{
	var result = line.match(endRegExp);
	if(result){
		line = line.replace(endRegExp,'break;');
		return line;
	}else{
		return false;
	}
}

var otherRegExp = /<%other%>/;
function translateFilterOther(line)
{
	var result = line.match(otherRegExp);
	if(result){
		line = line.replace(otherRegExp,'default:');
		return line;
	}else{
		return false;
	}
}

var caseEndRegExp = /<%case%>/;
function translateFilterCaseEnd(line)
{
	var result = line.match(caseEndRegExp);
	if(result){
		line = line.replace(caseEndRegExp,'}');
		return line;
	}else{
		return false;
	}
}

var scriptRegExp = /<%\s([\S\s]+)\s%>/;
function translateFilterScript(line)
{
	var result = line.match(scriptRegExp);
	if(result){
		line = line.replace(scriptRegExp,result[1]);
		return line;
	}else{
		return false;
	}
}

function translateFilterBasic(line)
{
	line = line.replace(/'/g,'"');
	return '__html__ += \''+line+'\';';
}


function translateFilter(line)
{
	var result = false;
	result = translateFilterPrint(line);
	if(result) return result;
	result = translateFilterEachStart(line);
	if(result) return result;
	result = translateFilterEachEnd(line);
	if(result) return result;
	result = translateFilterIfStart(line);
	if(result) return result;
	result = translateFilterIfEnd(line);
	if(result) return result;
	result = translateFilterElse(line);
	if(result) return result;
	result = translateFilterElseif(line);
	if(result) return result;
	result = translateFilterCaseStart(line);
	if(result) return result;
	result = translateFilterIs(line);
	if(result) return result;
	result = translateFilterEnd(line);
	if(result) return result;
	result = translateFilterOther(line);
	if(result) return result;
	result = translateFilterCaseEnd(line);
	if(result) return result;
	result = translateFilterScript(line);
	if(result) return result;
	return translateFilterBasic(line);
}

exports.translateRPLS = function(line){
	return translateFilter(line);
};
