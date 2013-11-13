var CurX = Math.floor( Math.random() * 500 );
var CurY = Math.floor( Math.random() * 300 );

var SDATA = CurX + "," + CurY;

var FreX, FreY;

var EneX = 250;
var EneY = 150;

var socket = io.connect("http://www.hariganet.com:8080/");

socket.on("connect", function(){
    document.getElementById("info").innerHTML = "接続しました";
});

socket.on("message", function(msg){
    if(msg == "REQ"){
      SDATA = CurX + "," + CurY;
      socket.send(DATA);
    }
    
    var XY = msg.split(",");
    FreX = XY[0];
    FreY = XY[1];

    CTX.fillStyle = "rgb(128,128,128)";
    CTX.strokeStyle = "rgb(128,128,128)";
    CTX.beginPath();
    CTX.arc(FreX, FreY, 15, 0, Math.PI*2, false);
    CTX.fill();
    
    CTX.fillStyle = "rgb(0,0,0)";
    CTX.strokeStyle = "rgb(0,0,0)";
    CTX.beginPath();
    CTX.arc(FreX, FreY, 10, 0, Math.PI*2, false);
    CTX.fill();
});

socket.on("EPOS", function(data){
    
    
    })
