/**
 * http://usejsdoc.org/
 */

var formidable = require('formidable');
var url = require('url');

function Request(req)
{
	this.$ = req;
	this.method = this.$.method;
	this.query = url.parse(this.$.url,true).query;
	this.form = function(callback){
		var form = new formidable.IncomingForm();
		form.parse(this.$,callback);
	};
}

function Response(resp)
{
	this.$ = resp;
	this.endText = function(txt){
		this.$.writeHead(200,{
			'Content-Type':'text/plain',
			'Content-Length':Buffer.byteLength(txt)
		});
		this.$.end(txt);
	};
	this.redirect = function(location){
		this.$.writeHead(200,{'Content-Type':'text/html'});
		this.$.end('<script>window.location.href=\''+location+'\';</script>');
	};
}

exports.Request = Request;
exports.Response = Response;

