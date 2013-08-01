//ドラッグ座標と付箋紙頂点のオフセット
var offsetX = 0;
var offsetY = 0;

//ドラッグ
function dragMemo(event){
  //付箋紙のIDを格納
  event.dataTransfer.setData("text", event.target.id);

  //ドラッグした付箋紙の取得
  var memoElement = document.getElementById(event.target.id);
  //ドラッグ座標と付箋紙頂点のオフセットをセット
  offsetX = event.clientX - memoElement.offsetLeft;
  offsetY = event.clientY - memoElement.offsetTop;
}

//ドロップ
function dropMemo(event){
  //格納されたIDを取り出す
  var id = event.dataTransfer.getData("text");

  //ドラッグした付箋紙の取得
  var memoElement = document.getElementById(id);

  //付箋紙の座標をドロップした座標にセット
  memoElement.style.left = event.clientX - offsetX + "px";
  memoElement.style.top = event.clientY - offsetY + "px";
}

//ドラッグ中
function dragOverMemo(event){
  //通常のドラッグの動作を禁止
  event.preventDefault();
}
