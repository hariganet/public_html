//Memoクラス
function Memo(id, text, color, x, y){
  //プロパティ
  this.id = "memo" + id;
  this.text = text;
  this.color = color;
  this.x = x;
  this.y = y;

  //DOM要素を作成するcreateメソッド
  this.create = function(){
    //付箋紙DOM要素の作成
    var memoElement = document.createElement("a");
    memoElement.href = "#";
    memoElement.id = this.id;
    memoElement.className = "memo " + this.color;
    memoElement.draggable = true;
    memoElement.ondragstart = dragMemo;
    memoElement.innerHTML = this.text;

    //付箋紙エリアに作成した付箋紙を追加
    var memoArea = document.getElementById("memoArea");
    memoArea.appendChild(memoElement);
  };
}

//Memoクラスmoveメソッド
Memo.prototype.move = function(x, y){
  //付箋紙頂点座標のセット
  this.x = x;
  this.y = y;

  //付箋紙の移動
  var memoElement = document.getElementById(this.id);
  memoElement.style.left = x + "px";
  memoElement.style.top = y + "px";
};

//連想配列
var memoArray = new Array();

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
  var memo = memoArray[id];

  //付箋紙の座標をドロップした座標にセット
  memo.move(event.clientX - offsetX, event.clientY - offsetY);
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

  //付箋紙オブジェクトの生成
  var memo = new Memo(memoCurrentId, memoText, memoColor, 50, 80);

  //付箋紙DOM要素の作成
  memo.create();

  //付箋紙配列に追加
  memoArray[memo.id] = memo;

  //カウンターのインクリメント
  memoCurrentId++;  
}



  
