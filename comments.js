//Create Web Server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];

//Create Server
http.createServer(function(req,res){
    var parseObj = url.parse(req.url,true);
    var pathname = parseObj.pathname;
    if(pathname === '/'){
        fs.readFile('./views/index.html',function(err,data){
            if(err){
                res.end('404 Not Found');
            }else{
                var htmlStr = template.render(data.toString(),{
                    comments:comments
                });
                res.end(htmlStr);
            }
        });
    }else if(pathname.indexOf('/public/') === 0){
        fs.readFile('.'+pathname,function(err,data){
            if(err){
                res.end('404 Not Found');
            }else{
                res.end(data);
            }
        });
    }else if(pathname === '/post'){
        fs.readFile('./views/post.html',function(err,data){
            if(err){
                res.end('404 Not Found');
            }else{
                res.end(data);
            }
        });
    }else if(pathname === '/pinglun'){
        var comment = parseObj.query;
        comment.dateTime = '2019-12-21 17:11:22';
        comments.unshift(comment);
        res.statusCode = 302;
        res.setHeader('Location','/');
        res.end();
    }else{
        fs.readFile('./views/404.html',function(err,data){
            if(err){
                res.end('404 Not Found');
            }else{
                res.end(data);
            }
        });
    }
}).listen(3000,function(){
    console.log('Server is running...');
});