/**
 * http://usejsdoc.org/
 */

var path = require('path');
var fs = require('fs');
var querystring = require('querystring');
var lineReader = require('line-reader');


var translate = require('./translate');
var cs = require('./cs');
var reqresp = require('./reqresp');

var cache = {};
var map = {};
var modules = {};

function dirLooper(dir,callback)
{
	var curDir = dir+'/';
	var files = fs.readdirSync(dir);
	for(var i in files)
	{
		var stat = fs.lstatSync(curDir + files[i]);
		if(stat.isDirectory()){
			dirLooper(curDir + files[i],callback);
		}else{
			callback(curDir + files[i]);
		}
	}
}

exports.extname = '.html';
exports.actionextname = '.action';
exports.sourcedir = './source';
exports.templatedir = './public';

exports.isNeedProcess = function(absPath){
	if(path.extname(absPath) == exports.extname || path.extname(absPath) == exports.actionextname) {
		return true;
	}
	return false;
};

exports.preLoad = function(){
	dirLooper(exports.sourcedir,function(absPath){
		var sourcePath = absPath;
		absPath = absPath.replace(exports.sourcedir,exports.templatedir);
		absPath = absPath.replace(path.extname(absPath),exports.extname);
		
		fs.exists(absPath,function(isExists){
			if(isExists){
				var transData = '';
				transData += '(function(data){'+
								'var __html__ = "";';
				lineReader.eachLine(absPath , function(line,isLast){
					transData += translate.translateRPLS(line);
					if(isLast){
						transData += 'return __html__;'+
									'})(data);';
						cache[absPath] = transData;
					}
				});
			}else{
				absPath = absPath.replace(path.extname(absPath),exports.actionextname);
				cache[absPath] = '';
			}
			map[absPath] = eval(fs.readFileSync(sourcePath,'utf-8'));
		});
	});
};

exports.addRequire = function(name,link){
	if(typeof link == 'string'){
		modules[name] = require(link);
	}else{
		modules[name] = link;
	}
};

exports.process = function(absPath, req , resp, callback){
	if(cache[absPath] || cache[absPath] == ''){
		var cookie = new cs.Cookie(req,resp);
		var session = new cs.Session(cookie);
		var sys = {
			'req':new reqresp.Request(req),
			'resp':new reqresp.Response(resp),
			'cookie':cookie,
			'session':session
		};
		map[absPath](sys,function(data){
			var html = eval(cache[absPath]);
			callback(200,html);
		});
	}else{
		callback(404,null);
	}
};

exports.handleRequest = function(absPath,req,resp){
	exports.process(absPath,req ,resp , function(code,data){
		if(code == 200){
			if(!data) data = '';
			resp.writeHead(code,{
				'Content-Type':'text/html',
				'Content-Length':Buffer.byteLength(data)
			});
			resp.end(data);
		}else{
			resp.writeHead(code,{
				'Content-Type':'text/html'
			});
			resp.end();
		}
	});
};







