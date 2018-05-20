//実際に実行するメイン関数相当部分
var grid = new GridContainer();

//gridを初期化する
grid.initiate(4);

//最初にgridをHTMLに描画する
grid.draw();
//描画した内容を表示する
grid.update();

//ループを終了させるためのもの
var timer;


//キーボード入力に応じてマトリクスを移動させる関数
document.addEventListener("keydown", function(event){
	var map ={
			38: 0, // Up
		    39: 1, // Right
		    40: 2, // Down
		    37: 3, // Left
	}
	//押下されたキーの値を取得し，帰り値として渡す
	var mapped = map[event.which];
	
	//指定されたキーが入力された時のみ移動させる
	if(mapped != undefined){
		grid.move(mapped);
		grid.update();
	}
});

//もしNewGameボタンが押されたらマスの値を変更して新しいゲームをスタートする
document.getElementsByClassName("restart-button").item(0).addEventListener("click",function(){
	//gridを初期化する
	grid.initiate(document.getElementById("numberOfRow").value);
	//最初にgridをHTMLに描画する
	grid.draw();
	//描画した内容を表示する
	grid.update();
});

//もしAutoSolveボタンが押されたら自動でクリアさせる
document.getElementsByClassName("auto-button").item(0).addEventListener("click",function(){

	//AI部分 requestAnimationFrameで実装
	function autoSolve(){
		AI(grid);
		grid.update();
		timer = window.requestAnimationFrame(autoSolve);
	}
	autoSolve();
});

//もしstopボタンが押されたら現在の自動処理を止める
document.getElementsByClassName("stop-button").item(0).addEventListener("click",function(){
	window.cancelAnimationFrame(timer);
});

//もしMultiply Samllestが押された場合もっとも小さい数字を2倍する
document.getElementsByClassName("multiply-button").item(0).addEventListener("click",function(){
	grid.multiplySmallest();
	grid.update();
});