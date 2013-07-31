//大きな画像ファイルを配列に格納
var imageArray = ["img/sample0.jpg","img/sample1.jpg","img/sample2.jpg","img/sample3.jpg","img/sample4.jpg"];

//画像インデックスを格納する変数を宣言
var currentImage = 0;

//タイマーIDを格納する変数を宣言
var timerId;

//画像を順に切り替える
function changeImage(){
  //画像を表示
  showImage(currentImage);
  //画像インデックスをインクリメント
  currentImage++;
  //画像インデックスが画像数と一致したら先頭に戻す
  if(currentImage == imageArray.length){
    currentImage = 0;
  }
}

//スライドショーを開始
function startSlideShow(){
  //１回目の画像の切り替え
  changeImage();
  timerId = setInterval("changeImage()",10000);
  
  //BGM開始
  var audio = document.getElementById("audio");
  audio.play();

  //ボリュームをセット
  audio.volume = document.getElementById("volume").value;

  //連続クリック対策、開始ボタンを無効に
  document.getElementById("buttonStart").disabled = "true";
}

//スライドショーを一時停止
function pauseSlideShow(){
  //タイマーの停止
  clearInterval(timerId);

  //BGMの一時停止
  var audio = document.getElementById("audio");
  audio.pause();

  //連続クリック対策、開始ボタンを有効に
  document.getElementById("buttonStart").disabled = "false";
}

//スライドショーを停止
function stopSlideShow(){
  //タイマーの停止
  clearInterval(timerId);
  //画像インデックスを先頭に戻す
  currentImage = 0;
  //先頭の画像を表示
  showImage(currentImage);

  //BGMの停止
  var audio = document.getElementById("audio");
  audio.load(); 
}

//画像を表示
function showImage(imageNo){
  //メイン画像の切り替え
  document.getElementById("main").src = imageArray[imageNo];
  
  //すべてのサムネール画像要素の取得
  var thumbImages = document.getElementsByClassName("thumb");
  //selectクラスを削除
  for(var i=0; i<thumbImages.length; ++i){
    thumbImages[i].classList.remove("select");
  }

  //選択されたサムネール画像にselectクラスを追加
  thumbImages[imageNo].classList.add("select");
}

//ボリュームの変更
function changeVolume(){
  //ボリュームをセット
  var audio = document.getElementById("audio");
  audio.volume = document.getElementById("volume").value;
}


