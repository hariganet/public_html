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
  var canvasColor = "rgba(0, 0, 0, 0.1)";
  context.fillStyle = canvasColor;
  context.rect(0, 0, 1200, 600);
  context.fill();

  //ボールを描画
  context.beginPath();

  var thr = 127;

  var rr = Math.floor(vx);
  if(rr < 0){
    rr = -rr;
  }
  rr = rr % thr + thr;

  var gg = Math.floor(vy);
  if(gg < 0){
    gg = -gg;
  }
  gg = gg % thr + thr;

  var bb = Math.floor(vy-vx);
  if(bb < 0){
    bb = -bb;
  }
  bb = bb %  thr + thr;

  context.fillStyle = "rgb(" + rr + ", " + gg + ", " + bb + ")";
  context.arc(x, y, 15, 0, 360*Math.PI/180);
  context.fill();
}

function jump(){
  //上にジャンプ
  vy = g * -3; 
  //x方向に加速
  vx = vx * 1.5;
}
