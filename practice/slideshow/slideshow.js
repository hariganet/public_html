//大きな画像ファイルを配列に格納
var imageArray = ["img/sample0.jpg","img/sample1.jpg","img/sample2.jpg","img/sample3.jpg","img/sample4.jpg"];

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


