var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(8080);

var EneX = 250;
var EneY = 150;

var EX;
var EY;

function handler(req, res){
  fs.readFile(__dirname + "/index.html",
      function(err, data){
        if(err){
          res.writeHead(500);
          return res.end("index.htmlがありませn");
        }

        res.writeHead(200);
        res.end(data);
      }
  );
}

io.sockets.on("connection", function(socket){
    socket.send("接続しました");
    socket.broadcast.send("REQ");
    
    socket.on("message", function(data){
      var MP = Math.floor( Math.random() * 4 );
      
      EX = EneX;
      EY = EneY;
      
      switch(MP){
        case 0:
          EX = EneX + 20;
          break;
        case 1:
          EX = EneX -20;
          break;
        case 2:
          EY = EneY + 20;
          break;
        case 3:
          EY = EneY - 20;
          break;
      }
      
      if(EX > 500){ EX = EX - 500; }
      if(EX < 0){ EX = EX + 500; }
      if(EY > 300){ EY = EY - 300; }
      if(EY < 0){ EY = EY + 300; }

      MP = EX + "," + EY + "," + EneX + "," + EneY;

      EneX = EX;
      EneY = EY;

      socket.broadcast.emit("EPOS", MP);
      socket.emit("EPOS", MP);
      
      socket.broadcast.send(data);
      
      console.log(data);

    });
});
