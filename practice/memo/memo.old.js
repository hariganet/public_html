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

//付箋紙ID用のカウンター
var memoCurrentId = 1;

//付箋紙の追加
function addMemo(){
  //入力されたテキストの取得
  var memoText = document.getElementById("memoText").value;

  //選択された色の取得
  var memoColor = "yellow";
  if(document.getElementById("memoY").checked){
    memoColor = "yellow";
  }
  if(document.getElementById("memoR").checked){
    memoColor = "red";
  }
  if(document.getElementById("memoG").checked){
    memoColor = "green";
  }

  //付箋紙DOM要素作成
  var memoElement = document.createElement("a");

  //付箋紙DOM要素のプロパティをセット
  memoElement.href = "#";
  memoElement.id = "memo" + memoCurrentId;
  memoElement.className = "memo " + memoColor;
  memoElement.draggable = true;

  //付箋紙DOM要素のイベントをセット
  memoElement.ondragstart = dragMemo;

  //付箋紙DOM要素のテキストをセット
  memoElement.innerHTML = memoText;

  //付箋紙エリアに作成した付箋紙を追加
  var memoArea = document.getElementById("memoArea");
  memoArea.appendChild(memoElement);

  //カウンターのインクリメント
  memoCurrentId++;  
}



  
