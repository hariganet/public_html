var http = require("http");
var fs = require("fs");

var FDAT;

var SRV = http.createServer();
SRV.listen(8080);

SRV.on("request", function(req, res){
    var DAT;

    DAT = req.url;

    RF();

    req.on("end", function(){
      res.writeHead(200, {"Content-Type": "text/plain"});
      WF(DAT);
      res.end(DAT + "\n----------\n" + FDAT);
      console.log(DAT + "\n----------\n" + FDAT);
      });
    });

SRV.on("connection", function(socket){
    console.log("接続しました\n");

    socket.on("end", function(){
      console.log("通信が終了しました\n");
      });
    });

var WF = function(data){
  data = decodeURI(data);
  fs.appendFile("test.txt", data + "\n", function(err){
      if(err){
      return console.log("エラーが発生しています" + err);
      }
      console.log("ファイルを保存しました");
      });
}

var RF = function(){
  fs.readFile("test.txt", "utf-8", function(err, data){
      FDAT = data;
      if(err){
      return console.log("エラーが発生しています" + err);
      }else{
      console.log("ファイルを読み込みました");
      }
      console.log(data);
      });
}

console.log("このサーバーは http://hariganet.com:8080/node_practice/ でアクセスできます");
