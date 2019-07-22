var http=require('http');
var url=require('url');
var querystring=require('querystring');


var http=require('http');
var hostname='127.0.0.1';
var port=3005;
var  arr=[];

var server=http.createServer(function (req,res) {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    res.setHeader("Access-Control-Allow-Origin",'*');
    var post ='';
    //客户端只能通过post发送请求数据，因为ajax的send()里面加入参数，只能通过post发送
    req.on('data',function (chunk) {  //监听客户端传来的数据时触发
        post +=chunk;
        console.log(post);
    });
    req.on('end',function () {//客户端数据发送完成时触发
        post =querystring.parse(post);//分析数据
        console.log(post);
        arr.push(post);
        res.end(JSON.stringify(arr));
    });
});
server.listen(port, hostname, function () {
    console.log('服务器运行在 http://' + hostname + ':' + port);
});


