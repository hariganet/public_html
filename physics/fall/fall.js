var canvas;
var context;
var timer;

var v = 0.0;  //速度
var g = 9.8;  //重力加速度
var t = 0.2;  //時間
var e = -0.8; //はね返り係数
var y = 15;   //ボールの中心

function init(){
  //描画コンテキストを取得
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  //タイマースタート
  timer = setInterval(draw, 20);
}

function draw(){
  //速度、位置を更新
  v = v + g * t;
  y = y + v * t + 0.5 * g * t * t;

  //地面にぶつかったとき
  if(y > canvas.height - 15){
    y = canvas.height - 15;
    v = v * e;
  }

  //キャンバスを初期化
  context.fillStyle = "rgba(0, 0, 0, 0.2)";
  context.rect(0, 0, 200, 500);
  context.fill();

  //ボールを描画
  context.beginPath();
  context.fillStyle = "rgb(255, 255, 255)";
  context.arc(100, y, 15, 0, 360*Math.PI/180);
  context.fill();
}
