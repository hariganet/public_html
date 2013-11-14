window.onload = init;

document.onKeyDown = MV;

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
    var Enemy = data.split(",");
    EneMove(Enemy[0],Enemy[1],Enemy[2],Enemy[3]);
    EX = Enemy[0];
    EY = Enemy[1];   
    EneX = Enemy[2];
    EneY = Enemy[3]; 
    document.getElementById("info" .innerHTML = data;   
    });

//鬼の描画処理
function EneMove(EX,EY,EneX,EneY){

    CTX.fillStyle = "rgb(128,128,128)";
    CTX.strokeStyle = "rgb(128,128,128)";
    CTX.beginPath();
    CTX.arc(EneX, EneY, 50, 0, Math.PI*2, false);
    CTX.fill();
    
    CTX.fillStyle = "rgb(255,0,0)";
    CTX.strokeStyle = "rgb(255,0,0)";
    CTX.beginPath();
    CTX.arc(EX, EY, 20, 0, Math.PI*2, false);
    CTX.fill();

    EneX = EX;
    EneY = EY;
}

var TMP;
var CVS;
var CTX;
var STP = 5;

function init(){
    CVS = document.getElementById('cvs');
    CTX = CVS.getContext('2d');

    SDATA = CurX + "," + CurY;
    socket.send(SDATA);

    CTX.beginPath();
    CTX.arc(CurX, CurY, 10, 0, Math.PI*2, false);
    CTX.fill();

    CTX.fillStyle = "rgb(255,0,0)";
    CTX.strokeStyle = "rgb(255,0,0)";
    CTX.beginPath();
    CTX.arc(EX, EY, 20, 0, Math.PI*2, false);
    CTX.fill();

    CTX.fillStyle = "rgb(0,0,0)";
    CTX.strokeStyle = "rgb(0,0,0)";
}

function MV(){

    var K = event.KeyCode;

    switch(K){
      case 104:
        TMP = "上";
        PointMove(1);
        break;
      case 100:
        TMP = "左";
        PointMove(2);
        break;
      case 102:
        TMP = "右";
        PointMove(3);
        break;
      case 98:
        TMP = "下";
        PointMove(4);
        break;
      default:
        TMP = "そのキーは使えません！";
        break;
    }
    document.getElementById("info").innerHTML = TMP + "(" + K + ")";
}

function PointMove(P){

    CTX.fillStyle = "rgb(128,128,128)";
    CTX.strokeStyle = "rgb(128,128,128)";
    CTX.beginPath();
    CTX.arc(CurX, CurY, 15, 0, Math.PI*2, false);
    CTX.fill();
 
    switch(P){
      case 1:
        CurY = CurY - STP;
        break;
      case 2:
        CurX = CurX - STP;
        break;
      case 3:
        CurX = CurX + STP;
      case 4:
        CurY = CurY + STP;
        break;
    }

    if(CurX > 500){ CurX = CurX -500; }
    if(CurX < 0){  CurX = CurX + 500; }
    if(CurY > 300){ CurY = CurY - 300;  }
    if(CurY < 0){ CurY = CurY + 300;  }

    EneMove(EneX, EneY);

    var AH = CTX.isPointInPath(CurX, CurY);
    document.getElementById("info2").innerHTML = AH;
    if(AH){
      alert("接触しました");
    }

    CTX.fillStyle = "rgb(0,0,0)";
    CTX.strokeStyle = "rgb(0,0,0)";
    CTX.beginPath();
    CTX.arc(CurX, CurY, 10, 0, Math.PI*2, false);
    CTX.fill();

    SDATA = CurX + "," + CurY;
    socket.send(SDATA);
}

