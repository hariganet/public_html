var http = require("http");

http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
    res.end("Node.jsからこんにちは\n");
    }).listen(8080);

console.log("このサーバーは http://hariganet.com/node_practice/ でアクセスできます");
