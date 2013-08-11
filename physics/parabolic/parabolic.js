var canvas;
var context;
var timer;

var vx, vy;  //速度
var x, y;   //ボールの中心
var g = 9.8;  //重力加速度
var t = 0.2;  //時間
var e = -0.8; //はね返り係数

function init(){
  //描画コンテキストを取得
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  //ボールの初速度
  vx = 10;
  vy = -100;

  //ボールの初期位置
  x = 15;
  y = canvas.height;
  //最初のボールを描画
  context.arc(x, y, 10, 0, 360*Math.PI/180);

  //タイマースタート
  timer = setInterval(draw, 20);
}

function draw(){
  //x方向（等速度運動）
  x = x + vx;
  //y方向（等加速度運動）  
  vy = vy + g * t;
  y = y + vy * t + 0.5 * g * t * t;

  //地面にぶつかったとき
  if(y > canvas.height - 15){
    y = canvas.height - 15;
    vy = vy * e;
  }

  //壁にぶつかったとき
  if(x > canvas.width - 15){
    x = canvas.width - 15;
    vx = vx * e;
  }else if(x < 15){
    x = 15;
    vx = vx * e;
  }
  


  //キャンバスを初期化
  context.fillStyle = "rgba(0, 0, 0, 0.1)";
  context.rect(0, 0, 1200, 600);
  context.fill();

  //ボールを描画
  context.beginPath();
  context.fillStyle = "rgb(255, 255, 255)";
  context.arc(x, y, 15, 0, 360*Math.PI/180);
  context.fill();
}

function jump(){
  //上にジャンプ
  vy = -g * 5; 
  //x方向に加速
  vx = vx * 1.5;
}
