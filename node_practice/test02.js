var http = require("http");
var fs = require("fs");

var FDAT;
//var FDAT = "FDAT";

var SRV = http.createServer();
SRV.listen(8080);

SRV.on("request", function(req, res){
    var DAT;
//    var DAT = "DAT";

    DAT = req.url;

//    console.log("@hariganet " + req.url);

    RF();

//    console.log("@hariganet under RF();");

    req.on("end", function(){
      
//      console.log("@hariganet in req.on();");

      res.writeHead(200, {"Content-Type": "text/plain"});

//      console.log("1");

      WF(DAT);
      res.end(DAT + "\n----------\n" + FDAT);
      console.log(DAT + "\n----------\n" + FDAT);
      });

    req.resume();

//   console.log("@hariganet under req.on();"); 

});

SRV.on("connection", function(socket){
    console.log("接続しました\n");

    socket.on("end", function(){
      console.log("通信が終了しました\n");
      });
    });

var WF = function(data){

//  console.log("@hariganet in WF");

  data = decodeURI(data);
  fs.appendFile("/var/www/www.hariganet.com/public_html/node_practice/test.txt", data + "\n", function(err){
      if(err){
      return console.log("エラーが発生していますinWF " + err);
      }
      console.log("ファイルを保存しました");
      });
}

var RF = function(){
  fs.readFile("/var/www/www.hariganet.com/public_html/node_practice/test.txt", "utf-8", function(err, data){
      FDAT = data;
      if(err){
      return console.log("エラーが発生していますinRF " + err);
      }else{
      console.log("ファイルを読み込みました");
      }
//      console.log("@hariganet testinRF")
      console.log(data);
      });
}

console.log("このサーバーは http://hariganet.com:8080/node_practice/ でアクセスできます");

//console.log(__filename);
