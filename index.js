/**
 * http://usejsdoc.org/
 */

var path = require('path');
var fs = require('fs');
var lineReader = require('line-reader');


var translate = require('./translate');

var cache = {};
var map = {};
var modules = {};

exports.extname = '.html';
exports.sourcedir = './source/';

exports.isNeedProcess = function(absPath){
	if(path.extname(absPath) == exports.extname) return true;
	return false;
};

exports.addProjection = function(srcPath,proPath){
	if(!proPath){
		proPath = exports.sourcedir + path.basename(srcPath).replace(exports.extname,'.js');
	}
	map[srcPath] = eval(fs.readFileSync(proPath,'utf-8'));
};

exports.addRequire = function(name,link){
	if(typeof link == 'string'){
		modules[name] = require(link);
	}else{
		modules[name] = link;
	}
};

exports.process = function(absPath,req ,callback){
	fs.exists(absPath, function(isExist){
		if(isExist){
			if(cache[absPath]){
				map[absPath](req,function(data){
					var html = eval(cache[absPath]);
					callback(200,html);
				});
			}else{
				var transData = '';
				transData += '(function(data){'+
								'var __html__ = "";';
				lineReader.eachLine(absPath , function(line,isLast){
					transData += translate.translateRPLS(line);
					if(isLast){
						transData += 'return __html__;'+
									'})(data);';
						//cache[absPath] = transData;
						map[absPath](req , function(data){
							var html = eval(transData);
							callback(200, html);
						});
					}
				});
			}
		}else{
			callback(404,null);
		}
	});
};

exports.handleRequest = function(absPath,req,resp){
	exports.process(absPath,req , function(code,data){
		if(code == 200){
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





