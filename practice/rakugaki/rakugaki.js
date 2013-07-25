  window.addEventListener("load", function()
  {
    var canvas = document.getElementById("main");
    canvas.addEventListener("touchstart", startTouchDraw, true);
    canvas.addEventListener("touchmove", TouchDraw, true);
    canvas.addEventListener("touchend", endTouchDraw, true);

  }, true);  
  
  
  
  
//マウスボタンが押されているかどうかを調べる変数を宣言
var mouseDown = false;

//ペンの設定
var penX = 0;
var penY = 0;
var penColor = "rgba(0,0,0,1)";
var penWidth = 10;




//描画の開始
function startTouchDraw(event){
	//マウスボタンが押された
	mouseDown = true;

	//ペンの座標をセット
  penX = event.touches[0].clientX;
	penY = event.touches[0].clientY;
}

//描画
function TouchDraw(event){
	//マウスボタンが押されていれば描画
	if(mouseDown){
		//キャンバスの取得
		var canvas = document.getElementById("main");
		//コンテキストの取得
		var context = canvas.getContext("2d");
	
		//ペンのセット
		context.strokeStyle = penColor;
		context.lineWidth = penWidth;
		context.lineCap = "round";
		//マウスカーソルの座標を取得
		var x = event.touches[0].clientX;
		var y = event.touches[0].clientY;

		//パスの開始
		context.beginPath();
		//座標の移動
		context.moveTo(penX,penY);
		//線の描画
		context.lineTo(x,y);
		//パスの描画
		context.stroke();

		//ペン座標の切り替え
		penX = x;
		penY = y;
	}
}

//描画の終了
function endDraw(event){
	//マウスボタンが離された
	mouseDown = false;
}


//描画の開始
function startDraw(event){
	//マウスボタンが押された
	mouseDown = true;

	//ペンの座標をセット
	penX = event.clientX;
	penY = event.clientY;
}

//描画
function draw(event){
	//マウスボタンが押されていれば描画
	if(mouseDown){
		//キャンバスの取得
		var canvas = document.getElementById("main");
		//コンテキストの取得
		var context = canvas.getContext("2d");
	
		//ペンのセット
		context.strokeStyle = penColor;
		context.lineWidth = penWidth;
		context.lineCap = "round";
		//マウスカーソルの座標を取得
		var x = event.clientX;
		var y = event.clientY;

		//パスの開始
		context.beginPath();
		//座標の移動
		context.moveTo(penX,penY);
		//線の描画
		context.lineTo(x,y);
		//パスの描画
		context.stroke();

		//ペン座標の切り替え
		penX = x;
		penY = y;
	}
}

//描画の終了
function endDraw(event){
	//マウスボタンが離された
	mouseDown = false;
}

//ペンの色を変更
function changeColor(){
	//スライダーの値を取得
	var penR = document.getElementById("penR").value;
	var penG = document.getElementById("penG").value;
	var penB = document.getElementById("penB").value;
	var penA = document.getElementById("penA").value;

	//ペンの色をセット
	penColor = "rgba("+penR+","+penG+","+penB+","+penA+")";

	//ペンの色用のキャンバスの取得
	var canvasColor = document.getElementById("canvasColor"); 	
	//コンテキストの取得
	var contextColor = canvasColor.getContext("2d");

	//ペンの色のを塗りつぶしの四角形で表示
	contextColor.clearRect(0,0,20,20);
	contextColor.fillStyle = penColor;
	contextColor.fillRect(0,0,20,20);
	//ペンの色をテキストで表示
	var textColor = document.getElementById("textColor");
	textColor.innerHTML = "R:"+penR+", G:"+penG+", B:"+penB+", A:"+penA;


}

//基本色をペンの色にセット
function setColor(r,g,b){
  //スライダーに値をセット
  document.getElementById("penR").value = r;
  document.getElementById("penG").value = g;
  document.getElementById("penB").value = b;

  //ペンの色を変更
  changeColor();
}

//ペンの太さを変更
function changeWidth(){
  //スライダーの値を変更
  penWidth = document.getElementById("penW").value;

  // ペンの色用キャンバスの取得
  var canvasWidth = document.getElementById("canvasWidth");
  //コンテキストの取得
  var contextWidth = canvasWidth.getContext("2d");

  //ペンの太さを塗りつぶしの円で表示
  contextWidth.clearRect(0,0,20,20);
  contextWidth.beginPath();
  contextWidth.arc(10,10,penWidth/2,0,2*Math.PI,false);
  contextWidth.fill();

}

//キャンバスをクリア
function clearCanvas(){
  // キャンバスの取得
  var canvas = document.getElementById("main");
  //コンテキストの取得
  var context = canvas.getContext("2d");

  //キャンバスをクリア
  context.clearRect(0,0,canvas.width,canvas.height);

}

//らくがきを別ウィンドウで表示
function showImage(){
  //キャンバスの取得
  var canvas = document.getElementById("main");

  //新しいウィンドウを作成
  var imageWin = window.open("","");
  
  //新しいウィンドウにHTMLを書き込む
  imageWin.document.open();
  imageWin.document.write('<html>');
    imageWin.document.write('<head><title>rakugaki</title></head>');
    imageWin.document.write('<body>');
      //キャンバスのデータをURLデータとして生成
      imageWin.document.write('<img src="'+canvas.toDataURL()+'">');

      imageWin.document.write('</body></html>');
  imageWin.document.close();



}

