/**
 * http://usejsdoc.org/
 */

var querystring = require('querystring');

var sessions = {};
var sessionTimes = {};

function Cookie(req,resp)
{
	this.option = {};
	this.addCookie = function(key,value){
		this[key] = value;
		resp.setHeader('Set-Cookie',this.toString());
	};
	this.removeCookie = function(key){
		delete this[key];
		resp.setHeader('Set-Cookie',this.toString());
	};
	this.addOption = function(key,value){
		this.option[key] = value;
		resp.setHeader('Set-Cookie',this.toString());
	};
	this.setTime = function(time){
		this.addOption('expires',new Date(new Date().getTime()+time*1000).toString().replace(/\([\w\W]*\)/, ''));
	};
	this.toString = function(){
		var cookieStr = '';
		for(var key in this)
		{
			if(typeof this[key] != 'function' && typeof this[key] != 'object' ){
				cookieStr += key + '=' + this[key] + '&';
			}
		}
		cookieStr = cookieStr.substring(0, cookieStr.length-1);
		for(var key in this.option)
		{
			if(this.option[key]){
				cookieStr += ';'+key + '=' + this.option[key];
			}else{
				cookieStr += ';'+key;
			}
		}
		return cookieStr;
	};
	var cookies = querystring.parse(req.headers.cookie)
	for(var key in cookies)
	{
		this[key] = cookies[key];
	}
	resp.setHeader('Set-Cookie',this.toString());
}

function Session(cookie)
{
	this.sessionId = cookie['__session__'];
	this.addSession = function(key,value){
		this[key] = value;
		if(this.sessionId && sessions[this.sessionId]){
			sessions[this.sessionId][key] = value;
			sessionTimes[this.sessionId] = new Date().getTime();
			cookie.setTime(1500);
		}else{
			this.sessionId = new Date().getTime();
			cookie.addCookie('__session__',this.sessionId);
			cookie.addOption('path','/');
			cookie.setTime(1500);
			sessions[this.sessionId] = {};
			sessions[this.sessionId][key] = value;
			sessionTimes[this.sessionId] = new Date().getTime();
		}
	};
	this.getSession = function(key){
		if(this.sessionId && sessions[this.sessionId]){
			sessionTimes[this.sessionId] = new Date().getTime();
			cookie.setTime(1500);
		}
		return this[key];
	};
	this.removeSession = function(key){
		if(this.sessionId && sessions[this.sessionId]){
			delete this[key];
			delete sessions[this.sessionId][key];
			sessionTimes[this.sessionId] = new Date().getTime();
			cookie.setTime(1500);
		}
	};
	if(this.sessionId && sessions[this.sessionId]){
		for(var key in sessions[this.sessionId])
		{
			this[key] = sessions[this.sessionId][key];
		}
	}
}

exports.Cookie = Cookie;
exports.Session = Session;

setInterval(function(){
	var nowTime = new Date().getTime();
	var timeout = 1000*1500;
	for(var id in sessionTimes)
	{
		if(nowTime - sessionTimes[id] > timeout){
			delete sessions[id];
			delete sessionTimes[id];
		}
	}
},1000*60);

