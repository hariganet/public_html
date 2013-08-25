var canvas;
var context;
var timer;
var timerCheck;

var gravity = 9.8;
var t = 0.2;  //時間
var e = -0.8; //はね返り係数

var ballCurrentId = 0;

var ballArray = new Array();

//Ball Class
function Ball(id, vx, vy, x, y){

  this.id = id;
  this.vx = vx;
  this.vy = vy;
  this.x = x;
  this.y = y;

  this.radius = 15;


  this.color = "rgb(" + (+128 + Math. floor( Math.random() * 128 )) + "," + (+128 + Math. floor( Math.random() * 128 )) + ","  + (+128 + Math. floor( Math.random() * 128 )) + ")"; 

}

Ball.prototype.hitx = function(){

  this.vx = -this.vx;
  var dx = 10;
  
  if(this.vx < 0){
    dx = -dx;
  }
  
  this.x = this.x + dx;
  
};

Ball.prototype.hity = function(){

  this.vy = -this.vy;
  var dy = -10;

  if(this.vy < 0){
    dy = -dy;
  }

  this.y = this.y + dy;

};


Ball.prototype.verocity = function(){

  var ampX = 1.0 + Math.floor( Math.random() * 3 ) * 0.1;
  var ampY = 1.0 + Math.floor( Math.random() * 3 ) * 0.1;

  this.vx = this.vx * ampX;
  this.vy = this.vy * ampY;
  
  if(this.y > canvas.height - 20  &&  Math.abs(this.vx) >12){
    
    var newVx0 = 1 + Math.floor( Math.random() * 5 );
    
    if(this.vx > 0){
      this.vx = newVx0;
    }else{
      this.vx = -newVx0;
    }
    this.vy = - (50 + Math.floor( Math.random() * 50 ) );
  }

};


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
  timerCheck = setInterval(check, 20);
}

function setColor(color, num){
  var thr = 127;
  color = Math.floor( Math.abs(num) );
  color = color % thr + thr;

  return color;
}

function draw(){


  for(var i=0; i<ballArray.length; ++i){

    //はね返り係数をボールごとにランダムに設定 0.8~0.99
    e = -( 0.8 + Math.floor( Math.random() * 20 ) * 0.01 );
    
    //ボールを描画
    context.beginPath();
    
    var red = setColor(red, ballArray[i].x);
    var green = setColor(green, ballArray[i].y);
    var blue = setColor(blue, ballArray[i].y - ballArray[i].x);
    
    //context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
    context.fillStyle = ballArray[i].color;
    context.arc(ballArray[i].x, ballArray[i].y, ballArray[i].radius, 0, 360*Math.PI/180);
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
  context.rect(0, 0, canvas.width, canvas.height);
  context.fill();
}

function makeBall(event){
  if(ballCurrentId >= 23){
    delete ballArray[0];
    ballCurrentId = 0;
  }

  addBall(ballCurrentId, 10, -50, event.clientX, event.clientY);

}

function check(){
  for(var i=0; i<ballArray.length; ++i){
      for(var j=i+1; j<ballArray.length; ++j){

          var x2 = (ballArray[i].x - ballArray[j].x) * (ballArray[i].x - ballArray[j].x);
          var y2 = (ballArray[i].y - ballArray[j].y) * (ballArray[i].y - ballArray[j].y);
          var distance = Math.sqrt( x2 + y2 );

          if(distance < 10){
/*
            if(ballArray[i].vx * ballArray[j].vx < 0){
              ballArray[i].hitx();
              ballArray[j].hitx();
            }
            if(ballArray[i].vy * ballArray[j].vy < 0){
              ballArray[i].hit(y);
              ballArray[j].hit(y);
            }
*/
            //本来の処理
            ballArray[i].verocity();
            ballArray[j].verocity();
            
            //ボールを消す処理
            //ballArray.splice(i, 1);
            //ballArray.splice(j, 1);
            //j--;
            //i--;
            //break;

 
            //context.fillStyle = "rgb(0, 255, 0)";
            //context.fillRect(10, 10, 100, 100);
            //addBall(ballCurrentId, 0, -50, ballArray[i].x, ballArray[i].y);
          }
      }
  }
}

function jump(){
  //上にジャンプ
//  vy = g * -3; 
  //x方向に加速
  //vx = vx * 1.5;
}

