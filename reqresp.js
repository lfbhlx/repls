/**
 * http://usejsdoc.org/
 */

function Request(req)
{
	this.$ = req;
}

function Response(resp)
{
	this.$ = resp;
	this.redirect = function(location){
		this.$.writeHead(200,{'Content-Type':'text/html'});
		this.$.end('<script>window.location.href=\''+location+'\';</script>');
	};
}

exports.Request = Request;
exports.Response = Response;

