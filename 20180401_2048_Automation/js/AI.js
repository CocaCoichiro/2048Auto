//20180405　基本的に上に移動させられるだけ移動させる
var AIOne= function(grid){
	//もし左上から右をみて連続していた場合その回数分だけ左に移動させる
	var count=0;
	for(var i=0; i<(grid.size-1); i++){
		if(grid.matrix[i][0] == (grid.matrix[i+1][0]* 2)){	//もし一番上から下を見て2枚ずつになっていたらcountを一つ増やす
			count++;
		}else if(grid.matrix[i][0]==grid.matrix[i+1][0]){//もし一番上から下を見て同じ値のものがあったらcountを一つ増やしてブレイクする
			count++;
			break;
		}else{//それ以外の場合はカウントを0にしてブレイクする
			count=0;
			break;
		}
	}
	
	//カウント分だけ上に移動させる
	for(var i=0; i<count; i++){
		grid.move(0);
	}
	
	//それ以外は左上の順番で動かす
	grid.move(3);
	grid.move(0);
};

//20180407 上左に動かす移動する
var AITwo= function(grid){	
	//それ以外は左上の順番で動かす
	grid.move(3);
	grid.move(0);
};

//現在使用するAIのバージョンを規定する
var AI=AITwo;