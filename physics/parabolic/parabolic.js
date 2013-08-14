var canvas;
var context;
var timer;

var gravity = 9.8;
var t = 0.2;  //時間
var e = -1; //はね返り係数

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

function addBall(id, vx, vy, x, y){

  //new memo
  var ball = new Ball(id, vx, vy, x, y);

  ballArray[ball.id] = ball;

  ballCurrentId++;

}

function init(){
  //描画コンテキストを取得
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  //add ball
  addBall(ballCurrentId, 10, -100, 15, canvas.height-15);
  addBall(ballCurrentId, 10, -50, 15, canvas.height-15);

  //タイマースタート
  timer = setInterval(draw, 20);
}

function setColor(color, num){
  var thr = 127;
  color = Math.floor( Math.abs(num) );
  color = color % thr + thr;

  return color;
}

function draw(){
 
  for(var i=0; i<ballArray.length; ++i){

    //ボールを描画
    context.beginPath();
    
    var red = setColor(red, ballArray[i].x);
    var green = setColor(green, ballArray[i].y);
    var blue = setColor(blue, ballArray[i].y - ballArray[i].x);
    
    context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
    context.arc(ballArray[i].x, ballArray[i].y, 15, 0, 360*Math.PI/180);
    context.arc(ballArray[i].x, ballArray[i].y, 15, 0, 360*Math.PI/180);
    context.fill();
 

    //x方向（等速度運動）
    ballArray[i].x = ballArray[i].x + ballArray[i].vx;
    //y方向（等加速度運動）  
    ballArray[i].vy = ballArray[i].vy + gravity * t;
    ballArray[i].y = ballArray[i].y + ballArray[i].vy * t + 0.5 * gravity * t * t;

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
  }

    //キャンバスを初期化
  var canvasColor = "rgba(0, 0, 0, 0.1)";
  context.fillStyle = canvasColor;
  context.rect(0, 0, 1200, 600);
  context.fill();
}

function makeBall(event){
  if(ballCurrentId > 10){
    delete ballArray[0];
    ballCurrentId = 0;
  }

  addBall(ballCurrentId, 10, -50, event.clientX, event.clientY);

}

function jump(){
  //上にジャンプ
//  vy = g * -3; 
  //x方向に加速
  //vx = vx * 1.5;
}
