/**
 * http://usejsdoc.org/
 */

var querystring = require('querystring');

var sessions = {};
var sessionTimes = {};

function Cookie(req,resp)
{
	this.values = {};
	this.options = {};
	this.addCookie = function(key,value,option){
		this.values[key] = value;
		if(option) this.options[key] = option;
		resp.setHeader('Set-Cookie',this.toArray());
	};
	this.getCookie = function(key){
		return this.values[key];
	};
	this.removeCookie = function(key){
		delete this.values[key];
		delete this.options[key];
		resp.setHeader('Set-Cookie',this.toArray());
	};
	this.addOption = function(key,optionkey,optionvalue){
		if(!this.options[key]) this.options[key] = {};
		this.options[key][optionkey] = optionvalue;
		resp.setHeader('Set-Cookie',this.toArray());
	};
	this.setTime = function(key,time){
		this.addOption(key, 'expires', new Date(new Date().getTime()+time*1000).toString().replace(/\([\w\W]*\)/, ''));
	};
	this.toArray = function(){
		var retArr = [];
		for(var key in this.values)
		{
			var cookieStr = key + '=' + this.values[key];
			if(this.options[key]){
				for(var optkey in this.options[key])
				{
					if(this.options[key][optkey]){
						cookieStr += ';'+optkey+'='+this.options[key][optkey];
					}else{
						cookieStr += ';'+optkey;
					}
				}
			}
			retArr.push(cookieStr);
		}
		return retArr;
	};
	var cookies = querystring.parse(req.headers.cookie,'; ');
	for(var key in cookies)
	{
		if(cookies[key] instanceof Array){
			cookies[key] = cookies[key][cookies[key].length-1];
		}
		this.values[key] = cookies[key];
	}
	resp.setHeader('Set-Cookie',this.toArray());
}

function Session(cookie)
{
	this.sessionId = cookie.getCookie('__session__');
	this.addSession = function(key,value){
		this[key] = value;
		if(this.sessionId && sessions[this.sessionId]){
			sessions[this.sessionId][key] = value;
			sessionTimes[this.sessionId] = new Date().getTime();
			cookie.addOption('__session__','path','/');
			cookie.setTime('__session__',1500);
		}else{
			this.sessionId = new Date().getTime();
			cookie.addCookie('__session__',this.sessionId);
			cookie.addOption('__session__','path','/');
			cookie.setTime('__session__',1500);
			sessions[this.sessionId] = {};
			sessions[this.sessionId][key] = value;
			sessionTimes[this.sessionId] = new Date().getTime();
		}
	};
	this.getSession = function(key){
		if(this.sessionId && sessions[this.sessionId]){
			sessionTimes[this.sessionId] = new Date().getTime();
			cookie.addOption('__session__','path','/');
			cookie.setTime('__session__',1500);
		}
		return this[key];
	};
	this.removeSession = function(key){
		if(this.sessionId && sessions[this.sessionId]){
			delete this[key];
			delete sessions[this.sessionId][key];
			sessionTimes[this.sessionId] = new Date().getTime();
			cookie.addOption('__session__','path','/');
			cookie.setTime('__session__',1500);
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

