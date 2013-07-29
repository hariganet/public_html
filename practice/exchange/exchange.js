//為替計算
function exchange(){
  //為替レート、両替する金額の取得
  var rate = document.getElementById("rate").value;
  var inMoney = document.getElementById("inMoney").value;

  //為替計算
  var exchangeMoney = inMoney * rate;

  //両替結果要素へ計算結果を書き込む
  var outMoneyElement = document.getElementById("outMoney");
  outMoneyElement.innerHTML = exchangeMoney + "円";
}
