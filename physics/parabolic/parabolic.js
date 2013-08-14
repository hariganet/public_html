var canvas;
var context;
var timer;

var g = 9.8;
var t = 0.2;  //時間
var e = -0.9; //はね返り係数

var ballCurrentId = 0;

var ballArray = new Array();

//Ball Class
function Ball(id, vx, vy, x, y){

  this.id = id;
  this.vx = vx;
  this.vy = vy;
  this.x = x;
  this.y = y;

}

function addBall(){
  //new memo
  var ball = new Ball(ballCurrentId, 10, -100, 15, canvas.height-15);

  ballArray[ball.id] = ball;

  ballCurrentId++;
}

function init(){
  //描画コンテキストを取得
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  //add ball
  addBall();
  //最初のボールを描画
  //context.arc(x, y, 15, 0, 360*Math.PI/180);

  //タイマースタート
  timer = setInterval(draw, 20);
}


function draw(){
  
  g = 9.8;  //重力加速度
  var i;
  for(i=0; i<ballArray.length; ++i){
    //x方向（等速度運動）
    ballArray[i].x = ballArray[i].x + ballArray[i].vx;
    //y方向（等加速度運動）  
    ballArray[i].vy = ballArray[i].vy + g * t;
    ballArray[i].y = ballArray[i].y + ballArray[i].vy * t + 0.5 * g * t * t;
    

    //地面にぶつかったとき
    if(ballArray[i].y > canvas.height - 15){
      ballArray[i].y = canvas.height - 15;
      ballArray[i].vy = ballArray[i].vy * e;
    }

    //壁にぶつかったとき
    if(ballArray[i].x > canvas.width - 15){
      ballArray[i].x = canvas.width - 15;
      ballArray[i].vx = ballArray[i].vx * e;
    }else if(ballArray[i].x < 15){
      ballArray[i].x = 15;
      ballArray[i].vx = ballArray[i].vx * e;
    }
  

    //ボールを描画
    context.beginPath();

    var thr = 127;

    var r = Math.floor(ballArray[i].x);
    if(r < 0){
      r = -r;
    }
    r = r % thr + thr;

    var g = Math.floor(ballArray[i].y);
    if(g < 0){
      g = -g;
    }
    g = g % thr + thr;

    var b = Math.floor(ballArray[i].y-ballArray[i].x);
    if(b < 0){
      b = -b;
    } 
    b = b %  thr + thr;
    context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    context.arc(ballArray[i].x, ballArray[i].y, 15, 0, 360*Math.PI/180);
    context.arc(ballArray[i].x, ballArray[i].y, 15, 0, 360*Math.PI/180);
    context.fill();
  }


    //キャンバスを初期化
  var canvasColor = "rgba(0, 0, 0, 0.1)";
  context.fillStyle = canvasColor;
  context.rect(0, 0, 1200, 600);
  context.fill();

}

function jump(){
  //上にジャンプ
//  vy = g * -3; 
  //x方向に加速
  //vx = vx * 1.5;
}
