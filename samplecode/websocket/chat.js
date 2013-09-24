var ws = require('websocket-server');

var server = ws.createServer();

server.addListener('connection', function(socket){
  console.log('onconnection:', socket);

  socket.addListener('message', function(data){
    server.broadcasr(data);
  });
});

server.listen(3000);
console.log('waiting...');

