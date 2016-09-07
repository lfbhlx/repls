# repls A Template System

##1 . Before you use it ,you should download these source code and its dependence modules : line-reader . 

##2 . You can use this system to build your web , like dynamic web , it can privide runtime data . The system have some tag to help you edit your text :
```javascript
    <%= data.name %> : print privided data by yourself on the web page ; 
    <%each i in items %> ... <%each%> : loop through all data like Array or Object , and you can access every item between start tag and end tag;
    <%if predication %> ... [<%elseif predication %>] [<%else%>] ... <%if%> : this is a typical IF grammar;
    <%case name %> ... <%is value %> <%end%> ... <%other%> <%end%> ... <%case%> : this is a typical SWITCH grammar;
    PS : all data you privide must have the "data" namespace , like "data.username";
    Example : 
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8">
      <title>Form</title>
      </head>
      <body>
      	<p>
      		<%= data.number %>
      	</p>
      	<%each i in data.arr %>
      		<p>
      			<%= i %>
      			=
      			<%= data.arr[i] %>
      		</p>
      	<%each%>
      	<%if data.number %>
      		<p>
      			i have data~~
      		</p>
      	<%if%>
      	<%if data.number >0 %>
      		<p> big 0 </p>
      	<%else%>
      		<p> small 0 </p>
      	<%if%>
      	<%if data.number <0 %>
      		<p> small 0 </p>
      	<%elseif data['number'] > 25 %>
      		<p> big 25 </p>
      	<%if%>
      	<%case data.arr[1] %>
      		<%is 0 %>
      			<p> 0 </p>
      		<%end%>
      		<%is 1 %>
      			<p> 1 </p>
      		<%end%>
      		<%other%>
      			<p> other </p>
      		<%end%>
      	<%case%>
      </body>
      </html>
```
##3 . How to inject your data to template?
    You can provide the extname in var exports.extname , and it can let the system to recognize which file is the template file;\<br>
    Each template file are mapping source file that you can give your own data; the source folder is given by var exports.sourcedir;\<br>
    You must use this format to edit your source file :\<br>
```javascript
      (function(){
        	return function(req,callback){
        		var data = {};
        		callback(data);
        	};
        })();
```
      the callback function is given your data which is a ObjectMap;\<br>
##4 . How to use the system ? 
    first : var rpls = require('./lib/rpls'); // require the module\<br>
    second : use the function isNeedProcess to charge whether the file is a template file ,  if true , use the function process or function handleRequest to handle the template file ; \<br>
    third : edit the template file and the source file ;\<br>
    forth : use the function addProjection to inject source file to template file , and use the function addRequire to require the modules which used in your source file;\<br>
    fifth : you can use the modules in your source file like "moudules.xxx" ; \<br>
##5 . APIs
    ###exports.extname : tempalte file's extname by which can recognize the template file ; 
    ###exports.sourcedir : source file's dictionary ; 
    ###exports.isNeedProcess(absPath) : charge the file is a template file or not by file's pathname ;
    ###exports.addProjection(srcPath,proPath) : mapping the souce file to template file ; 
    ###exports.addRequire(name,link) : require the modules using in your source file;
    ###exports.process(absPath,req ,callback) : process the template file , give pathname,request objec,callback function as arguments ;
    ###exports.handleRequest(absPath,req,resp) : a simple handler ,you can use it or other modules even to build by yourself ;
##6 . Sample : 
    working :  http://hello-stranger.cc:9999/\<br>
    source code : https://pan.baidu.com/s/1qYcowY4\<br>
    author email : 1203550038@qq.com\<br>
