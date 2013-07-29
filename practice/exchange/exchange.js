//選択された通過を格納する変数を宣言
var selectedCurrency = "ドル";

//通過を選択したときの処理
function changeCurrency(){
  //選択された通過を変数selectedCurrencyに格納
  var currency = document.getElementById("currency");
  selectedCurrency = currency.options[currency.selectedIndex].value;

  //為替レートのDOM要素を取得
  var rateElement = document.getElementById("rate");

  //選択された通過から為替レートをセット
  switch(selectedCurrency){
    case "ドル":
      rateElement.value=77.8;
      break;
    case "ユーロ":
      rateElement.value=102.3;
      break;
    case "人民元":
      rateElement.value=12.3;
      break; 
  default:
      rateElement.value=1;
      break;
  }

  //ボタンのラベルを変更
  document.getElementById("buttonExchange").value = selectedCurrency + "から円に両替";
  document.getElementById("buttonExchange2").value = "円から" + selectedCurrency + "に両替";
}

//為替計算
function exchange(exchangeType){
  //為替レート、両替する金額の取得
  var rate = document.getElementById("rate").value;
  var inMoney = document.getElementById("inMoney").value;

  //計算結果と通過の変数の宣言
  var exchangeMoney;
  var currency;

  //為替計算
  if(exchangeType =="toYen"){
    //選択した通過から円へ両替
    exchangeMoney = inMoney * rate;
    currency = "円";
  }else{
    //円から選択した通過へ両替
    exchangeMoney = inMoney / rate;
    //currency = "ドル";
    currency = selectedCurrency;
  }

  //小数第３位を四捨五入
  exchangeMoney = Math.round(exchangeMoney * 100) / 100;

  //数値をチェック
  if(isNaN(exchangeMoney)){
    alert("数値を入力してください。");
    exchangeMoney ="---";
  }
  //為替レート入力チェック
  if(rate <= 0){
    alert("為替レートには0より大きな数値を入力してください。");
    exchangeMoney = "---";
  }
  //両替結果要素へ計算結果を書き込む
  var outMoneyElement = document.getElementById("outMoney");
  outMoneyElement.innerHTML = exchangeMoney + currency;
}
