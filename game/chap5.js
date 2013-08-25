//効果音
var g_dragsound, g_dropsound,  g_deathsound, g_clearsound;
//キャンバスとバグ画像
var g_canvas;
var g_bugimage;
var BUGIMG_SIZE = 48;
var ROW_SIZE = 10;
var COL_SIZE = 10;
//描画リスト
var g_drawlist = new Array();
//タイマーID
var g_timerID;
//ゲームデータ
var g_gamearray;
var g_bugcolors = 6;
var g_erasenum;
var g_rensacount;
var g_normanum;
var g_level = 0;
var MAXBUGCOLORS =6;
//並び定数
var NARABI_NASHI = 0;
var NARABI_YOKO = 2;
var NARABI_TATE = 4;
//選択
var g_1stselected = {x: -1, y: -1};
var g_2ndselected = {x: -1, y: -1};
//アニメーションのスピード
var ochiru_jikan = 6;
var kieru_jikan = 10;
var draw_time = 20;
var drop_time = draw_time * (ochiru_jikan-1);


//ロードイベント
window.addEventListener('load', initGame, false);

//最初に実行する関数
function initGame(){
	var dialog = document.querySelector('#title');
	dialog.style.display = 'block';
	//ボタンのイベント設定
	var btn = document.querySelector('#btn_gamestart');
	btn.addEventListener('click',gamestart_click,false);
	btn = document.querySelector('#btn_nextstage');
	btn.addEventListener('click',nextstage_click,false);
	//サウンド
	g_dragsound = document.querySelector("#dragsound");
	g_dropsound = document.querySelector("#dropsound");
	g_deathsound = document.querySelector("#deathsound");
	g_clearsound = document.querySelector("#clearsound");
	//キャンパスとバグ画像
	g_canvas = document.querySelector('#cvs_stage');
	g_bugimage = document.querySelector('#bugimage');
	g_bugimage.parentNode.removeChild(g_bugimage);
	if(g_mobiledevice == true){
		g_canvas.addEventListener('touchstart', canvas_click, false);
	} else {
		g_canvas.addEventListener('click', canvas_click, false);
	}
	//タイマー始動
	g_timerID = setInterval(timerDraw, draw_time);
}

//タイトル画面のボタンがクリックされた
function gamestart_click(e){
	var dialog = document.querySelector('#title');
	dialog.style.display = 'none';
	startGame();
}

//次のステージボタンが押された
function nextstage_click(e){
	var dialog = document.querySelector('#gameclear');
	dialog.style.display = 'none';
	//レベルを増やす
	g_level++;
	startGame();	
}

//マス目を描画する
function drawGameBoardAll(){
	var context = g_canvas.getContext('2d');
	for(var y=0; y<ROW_SIZE; y++){
		for(var x=0; x<COL_SIZE; x++){
		drawBug(context, x, y, 0, 'noanim');
		}
	}
}

//コマを描画
function drawBox(context, x, y){
	context.clearRect(x * BUGIMG_SIZE, y * BUGIMG_SIZE, BUGIMG_SIZE, BUGIMG_SIZE);
	context.fillStyle = 'rgba(0, 0, 0, 0.7)';
	//選択されたマス目の場合
	if(g_1stselected.x == x && g_1stselected.y == y){
		context.fillStyle = 'yellow';
	}
	context.strokeStyle = 'black';
	context.fillRect(x * BUGIMG_SIZE, y * BUGIMG_SIZE, BUGIMG_SIZE, BUGIMG_SIZE);
	context.strokeRect(x * BUGIMG_SIZE, y * BUGIMG_SIZE, BUGIMG_SIZE, BUGIMG_SIZE);
}




//タイマーを使って描画
function timerDraw(){
	//drawlistが空なら何もしない
	if(g_drawlist.length < 1) return;
	//drawlistを処理
	var context = g_canvas.getContext('2d');
	var l = g_drawlist.length;
	for(var i=0; i<l; ++i){
		//時間を減らす
		g_drawlist[i].jikan--;
		if(g_drawlist[i].jikan > 0){
			//バグを描画
			drawBug(context, g_drawlist[i].x, g_drawlist[i].y, g_drawlist[i].jikan, g_drawlist[i].anim);
		}else{
			//時間が0になったら削除
			g_drawlist.splice(i, 1);
			l--;
			i--;
		}
	}
}

//バグを描画する
function drawBug(context, x, y, jikan, anim){
	drawBox(context, x, y);
	//バグがいなければ脱出
	var id = g_gamearray[y][x];
	if(id==0) return;
	if(anim == 'ochiru'){
		//落下する
		context.save();
		var fally = (BUGIMG_SIZE / (ochiru_jikan-1)) * (jikan-1);
		context.translate(0, -fally);
		context.drawImage(g_bugimage, (id-1) * BUGIMG_SIZE, 0, BUGIMG_SIZE, BUGIMG_SIZE,
						 x * BUGIMG_SIZE, y * BUGIMG_SIZE, BUGIMG_SIZE, BUGIMG_SIZE);
		context.restore();	//設定復帰
	}else if(anim == 'kieru'){
		//縮んで消える
		if(jikan == 1){		//最後は何も表示しない
			g_gamearray[y][x] = 0;
			return;
		}
		context.save();			//設定保存
		var sx = x * BUGIMG_SIZE + BUGIMG_SIZE / 2;
		var sy = y * BUGIMG_SIZE + BUGIMG_SIZE / 2;
		var zoom = (1.0 / kieru_jikan) * jikan;
		context.translate(sx, sy);
		context.scale(zoom, zoom);
		context.translate(-sx, -sy);
		context.drawImage(g_bugimage, (id-1) * BUGIMG_SIZE, 0, BUGIMG_SIZE, BUGIMG_SIZE,
							 x * BUGIMG_SIZE, y * BUGIMG_SIZE, BUGIMG_SIZE, BUGIMG_SIZE);
		context.restore();		//設定復帰
	}else{
		//その他のときは普通に表示
		context.drawImage(g_bugimage, (id-1) * BUGIMG_SIZE, 0, BUGIMG_SIZE, BUGIMG_SIZE,
							 x * BUGIMG_SIZE, y * BUGIMG_SIZE, BUGIMG_SIZE, BUGIMG_SIZE);
	}	
}

//ゲーム開始
function startGame(){
	g_erasenum = 0;		//消した数
	g_rensacount = 0;	//連鎖カウンタ
	//レベル設定
	g_bugcolors = 4 + Math.floor(g_level / 5);	//5レベルごとに1種類増える
	if(g_bugcolors > MAXBUGCOLORS) g_bugcolors = MAXBUGCOLORS;
	g_normanum = 100 + (g_level) * 25;
	var norma = document.querySelector('#normcount');
	norma.innerHTML = g_normanum;
	var level = document.querySelector('#levelcount');
	level.innerHTML = g_level + 1;

	//空配列セット
	g_gamearray = new Array();
	for(var y=0; y<ROW_SIZE; y++){
		g_gamearray.push(new Array(COL_SIZE));
	}
	//初期セット
	for(var y=0; y<ROW_SIZE; y++){
		for(var x=0; x<COL_SIZE; x++){
			//乱数をセット
			var r = Math.floor(Math.random() * g_bugcolors) + 1;
			g_gamearray[y][x] = r;
			//重なりチェック
			for(var i=0; i<g_bugcolors; i++){
				if(checkLines(x, y) == NARABI_NASHI) break;
				r = g_gamearray[y][x] + 1;
				if(r>=g_bugcolors) r = 1;
				g_gamearray[y][x] = r;
			}
		}
	}
	g_drawlist = new Array();
	g_1stselected.x = -1;
	g_1stselected.y = -1;
	g_2ndselected.x = -1;
	g_2ndselected.y = -1;
	drawGameBoardAll();
}

//同じ色が縦横に3つ以上並んでいないか4方向をチェック
function checkLines(cx, cy){
	var id = g_gamearray[cy][cx];
	var result = NARABI_NASHI;
	var yoko = checkOneLine(cx, cy, id, -1, 0) + checkOneLine(cx, cy, id, 1, 0) +1;
	var tate = checkOneLine(cx, cy, id, 0, -1) + checkOneLine(cx, cy, id, 0, 1) +1;
	if(yoko > 2) result += NARABI_YOKO;
	if(tate > 2) result += NARABI_TATE;
	return result;
}

//dx,dyが示す方向のみチェックし、同じ色のバグの数を返す
//返値に中央のバグは含まない（返値が1なら実際は2個並んでいることになる）
function checkOneLine(cx, cy, id, dx, dy){
	var result = 0;
	while(true){
		cx += dx;
		cy += dy;
		//範囲内チェック
		if(cx < 0 || cx >= COL_SIZE || cy < 0 || cy >= ROW_SIZE){
			return result;
		}
		if(g_gamearray[cy][cx] != id) return result;
		result++;
	}
}

//canvasのクリック処理
function canvas_click(e){
	//if(g_rensacount>0) return;	//連鎖中は動かせないようにする
	var x, y;
	if(g_mobiledevice == true ){
		var box = e.target.getBoundingClientRect();
		x = Math.floor((e.touches[0].clientX - box.left) / BUGIMG_SIZE);
		y = Math.floor((e.touches[0].clientY - box.top) / BUGIMG_SIZE);		
	} else if(e.offsetX != undefined){
		x = Math.floor(e.offsetX / BUGIMG_SIZE);
		y = Math.floor(e.offsetY / BUGIMG_SIZE);
	}else{
		var box = e.target.getBoundingClientRect();
		x = Math.floor((e.clientX - box.left) / BUGIMG_SIZE);
		y = Math.floor((e.clientY - box.top) / BUGIMG_SIZE);
	}
	//範囲内チェック
	if(x < 0 || x >= COL_SIZE || y < 0 || y >= ROW_SIZE) return;
	//選択変更
	var context = g_canvas.getContext('2d');
	//1回目のクリックか判定
	if(g_1stselected.x < 0){
		g_1stselected.x = x;
		g_1stselected.y = y;
		drawBug(context, x, y, 0, 'noanim');
		if(g_mobiledevice == false){
			try{
				g_dragsound.currentTime = 0;
				g_dragsound.play();
			}catch(e){
			}
		}
	}else{
		//2回目のクリック
		//隣接していないマス目なら選択解除
		try{
			g_dropsound.currentTime = 0;
			g_dropsound.play();
		}catch(e){
		}
		if(Math.abs(x - g_1stselected.x) + Math.abs(y - g_1stselected.y) != 1){
			var oldx = g_1stselected.x;
			var oldy = g_1stselected.y;
			g_1stselected.x = -1;
			g_1stselected.y = -1;
			drawBug(context, oldx, oldy, 0, 'noanim');
			return;
		}
		g_2ndselected.x = x;
		g_2ndselected.y = y;
		//入れ替え
		var temp = g_gamearray[g_2ndselected.y][g_2ndselected.x];
		g_gamearray[g_2ndselected.y][g_2ndselected.x] = g_gamearray[g_1stselected.y][g_1stselected.x];
		g_gamearray[g_1stselected.y][g_1stselected.x] = temp;
		drawBug(context, g_1stselected.x, g_1stselected.y, 0, 'noanim');
		drawBug(context, g_2ndselected.x, g_2ndselected.y, 0, 'noanim');
		//0.5秒後に入れ替えチェック
		setTimeout(replaceBug, 500);
	}
}

//入れ替えチェック
function replaceBug(){
	//消せるかどうかのチェック
	var x1 = g_1stselected.x;
	var y1 = g_1stselected.y;
	var x2 = g_2ndselected.x;
	var y2 = g_2ndselected.y;
	var check = checkLines(x1, y1);
	var oldcheck = checkLines(x2, y2);
	if(check == NARABI_NASHI && oldcheck == NARABI_NASHI){
		//入れ替えを戻す
		var temp = g_gamearray[y2][x2];
		g_gamearray[y2][x2] = g_gamearray[y1][x1];
		g_gamearray[y1][x1] = temp;
	}else{
		//並んでいる要素を消す
		g_rensacount = 0;
		eraseBugAll();
	}
	//選択解除して描画
	g_1stselected.x = -1;
	g_1stselected.y = -1;
	g_2ndselected.x = -1;
	g_2ndselected.y = -1;
	var context = g_canvas.getContext('2d');
	drawBug(context, x1, y1, 0, 'noanim');
	drawBug(context, x2, y2, 0, 'noanim');
}

//消去
function eraseBugAll(){
	var needdrop = false;
	var erasenum = 0;	//今回消す数を調べる	
	//消去チェック
	for(var y=0; y<ROW_SIZE; y++){
		for(var x=0; x<COL_SIZE; x++){
			//空き状態(id = 0)でないときのみ並びチェック
			var id = g_gamearray[y][x];
			if(id != 0){
				var right = checkOneLine(x, y, id, 1, 0);
				var down = checkOneLine(x, y, id, 0, 1);
				//横消去
				if(right+1 > 2){
					for(var i=0; i<right+1; ++i){
						if(checkEraseList(x+i, y) == false){
							g_drawlist.push({x:x+i, y:y, jikan:kieru_jikan, anim:'kieru'});
							erasenum++;
						}	
					}
					needdrop = true;
				}
				//縦消去
				if(down+1 > 2){
					for(var i=0; i<down+1; ++i){
						if(checkEraseList(x, y+i) == false){
							g_drawlist.push({x:x, y:y+i, jikan:kieru_jikan, anim:'kieru'});
							erasenum++;
						}
					}
					needdrop = true;
				}
			}
		}
	}
	//消去したバグの数を記録する
	if(erasenum > 0){
		erasenum += Math.floor(erasenum / 10)*5;	//同時に10以上消したらボーナス
		g_erasenum += erasenum * (g_rensacount+1);	//連鎖で倍
		var norma = document.querySelector('#normcount');
		var norma_temp = g_normanum - g_erasenum;
		if(norma_temp < 0){
			norma_temp = 0;
		}
		norma.innerHTML = norma_temp;
		if(g_mobiledevice == false){
			try{
				g_deathsound.currentTime = 0;
				g_deathsound.play();
			} catch(e){}
		}
	}
	//クリアチェック
	if(g_normanum < g_erasenum){
		setTimeout(clearStage, 2000);
		if(g_mobiledevice == false){
			try{
				g_clearsound.currentTime = 0;
				g_clearsound.play();
			} catch(e){}
		}
		return;
	}
	//必要なら落とす
	if(needdrop == true){
		setTimeout(dropBug, drop_time * 2);
		g_rensacount++;
	}else{
		g_rensacount = 0;
	}
}

//バグを落とす
function dropBug(){
	var moredrop = false;
	for(var x=0; x<COL_SIZE; x++){
		for(var y=ROW_SIZE-1; y>=0; y--){
			if(g_gamearray[y][x] == 0){
				//落下アニメ追加
				for(var i=0; i<=y; i++){
					g_drawlist.push({x:x, y:i, jikan:ochiru_jikan, anim:'ochiru'});
				}
				//1マス落とす
				for(; y>0; y--){
					g_gamearray[y][x] = g_gamearray[y-1][x];
					//さらに落とす必要があるかどうかチェック
					if(g_gamearray[y][x] == 0) moredrop = true;
				}
				//一番上に新しいバグを追加
				var r = Math.floor(Math.random() * g_bugcolors) + 1;
				g_gamearray[0][x] = r;
			}
		}
	}
	//必要ならさらに落とす
	if(moredrop == true) setTimeout(dropBug, drop_time);
	else setTimeout(eraseBugAll, 500);
}

//正確な消去数を調べるためにすでに消去のリストに登録済みかどうかを調べる
//登録済みならtrue、登録されていないならfalseを返す
function checkEraseList(x, y){
	var l = g_drawlist.length;
	for(var i=0; i<l; i++){
		if( g_drawlist[i].x == x &&
			g_drawlist[i].y == y &&
			g_drawlist[i].anim =='kieru')
		{
			return true;
		}
	}
	return false;
}

//ゲームクリア画面の表示
function clearStage(){
	var dialog = document.querySelector('#gameclear');
	dialog.style.display = 'block';
}
