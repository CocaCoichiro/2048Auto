//基本的にGridの中身を色々やりとりするクラス
var GridContainer = function(){
	//点数を保存する
	this.score = 0;
	//マトリクスの大きさを定義する
	this.size = 0;
	//マトリクスを作成する
	this.matrix = new Array();
	
};

//sizeのセット関数
GridContainer.prototype.setSize = function (matrixSize){
	this.size = matrixSize;
}

//初期化するメソッド
GridContainer.prototype.initiate = function(matrixSize){
	//スコアの初期化
	this.score=0;
	
	//サイズの初期化
	this.size=matrixSize;
		
	//配列の初期化
	this.matrix=new Array();
	
	//数字を格納するmatrix配列を定義する
	this.matrix.length=this.size;
	this.matrix.fill(0)
	
	//matrixの数字を全て0に初期化する
	for(var i=0; i<this.size; i++){
		this.matrix[i]=new Array(this.size);
		this.matrix[i].length=this.size;
		this.matrix[i].fill(0);
	}

	//ランダムに一つの関数に対して2を代入する
	var x= Math.floor(Math.random()*this.size);
	var y= Math.floor(Math.random()*this.size);
	this.matrix[x][y]=2;
}

//Grid自体を描画するメソッド
GridContainer.prototype.draw = function(){
	//grid-containerを取得する
	gridContainerHTML=document.querySelector('.grid-container');
	
	//grid-containerの中身を削除する
	while( gridContainerHTML.firstChild ){
		gridContainerHTML.removeChild( gridContainerHTML.firstChild );
		}
	
	//grid-rowとgrid-cellを記述する
	for(var i=0; i<this.size; i++){
		//gridrowのHTML要素を作る
		var gridrowHTML = document.createElement('div');
		gridrowHTML.className="grid-row";
		
		for(var k=0; k<this.size; k++){
			//gridcellのHTML要素を作る
			var gridcellHTML = document.createElement('div');
			gridcellHTML.className="grid-cell";
			//gridrowに追加する
			gridrowHTML.appendChild(gridcellHTML);
		}
		
		//gridContainerに追加する
		gridContainerHTML.appendChild(gridrowHTML);
	}
	//grid-cellのwidthとheightを取得する
	var width = window.getComputedStyle( document.getElementsByClassName('grid-cell').item(0)).width.split("px")[0];
	var height = window.getComputedStyle( document.getElementsByClassName('grid-cell').item(0)).height.split("px")[0];
	var margin = window.getComputedStyle( document.getElementsByClassName('grid-cell').item(0)).marginRight.split("px")[0];
	//game-containerの縦幅と横幅を変更する
	var gameContainer=document.getElementsByClassName("game-container");
	gameContainer.item(0).setAttribute("style","width:"+(width*this.size+margin*this.size +15)+"px"+";height:"+(height*this.size+margin*this.size +15)+"px");
}

//Gridの一番小さい値を2倍にする
GridContainer.prototype.multiplySmallest=function(){
	//もっとも小さい値を格納する変数
	var smallest= Infinity;
	//一番小さい値を検索する
	for (var i=0; i<this.size; i++){
		for(var j=0; j<this.size; j++){
			if(this.matrix[i][j] < smallest && this.matrix[i][j] != 0){
				smallest = this.matrix[i][j];
			}
		}	
	}
	//一番小さい値を2倍する
	for (var i=0; i<this.size; i++){
		for(var j=0; j<this.size; j++){
			if(this.matrix[i][j] === smallest){
				this.matrix[i][j] = this.matrix[i][j]*2;
			}
		}	
	}
}

//Gridの中身を反映するメソッド
GridContainer.prototype.update = function(){
	//gridの中身を反映する
	var gridRow = document.querySelectorAll('.grid-row');
	for(var i=0; i<this.size; i++){
		var gridCell = gridRow.item(i).querySelectorAll('.grid-cell');
		for(var j=0; j<this.size; j++){
			//0の場合は空白文字を入力する
			if(this.matrix[i][j]){
				gridCell.item(j).innerHTML = this.matrix[i][j];
				
				//桁数に応じて表示する文字の大きさを変更する
				digit = this.matrix[i][j].toString(10).length;
				if(digit > 3){
					gridCell.item(j).style.fontSize = (180/digit) + 'px';
				}else{
					gridCell.item(j).style.fontSize = '60px';
				}
				
				
			}else{
				gridCell.item(j).innerHTML = "";
			}
		}
	}
	//スコアの中身を反映する
	var scoreContainer=document.querySelector('.score-container');
	scoreContainer.innerHTML = this.score;
}

//Gridの中身を動かすメソッド
//引数directionの中身 0:Up 1:Right 2:Down 3:Left
GridContainer.prototype.move = function(direction){
	//上方向に移動させる
	if(direction==0){
		//まず0がある場合はその方向に移動させる
		for (var k=0; k<this.size; k++){
			for (var i=0; i<this.size; i++){
				for(var j=0; j<(this.size-1); j++){
					if(this.matrix[j][i] == 0){
						this.matrix[j][i] = this.matrix[j+1][i];
						this.matrix[j+1][i] = 0;
					}
				}
			}
		}
		//次に同じ数字が連続している場合はその方向の数字と結合させる
		for (var i=0; i<this.size; i++){
			for(var j=0; j<(this.size-1); j++){
				if(this.matrix[j][i] == this.matrix[j+1][i]){
					this.score = this.score+this.matrix[j][i];
					this.matrix[j][i] = this.matrix[j+1][i]*2;
					this.matrix[j+1][i] = 0;
				}
			}
		}
		//また0がある場合はその方向に移動させる
		for (var k=0; k<this.size; k++){
			for (var i=0; i<this.size; i++){
				for(var j=0; j<(this.size-1); j++){
					if(this.matrix[j][i] == 0){
						this.matrix[j][i] = this.matrix[j+1][i];
						this.matrix[j+1][i] = 0;
					}
				}
			}
		}
	}
	
	//右方向に移動させる
	if(direction==1){
		//まず0がある場合はその方向に移動させる
		for (var k=0; k<this.size; k++){
			for (var i=0; i<this.size; i++){
				for(var j=0; j<(this.size-1); j++){
					if(this.matrix[i][this.size-j-1] == 0){
						this.matrix[i][this.size-j-1] = this.matrix[i][this.size-j-2];
						this.matrix[i][this.size-j-2] = 0;
					}
				}
			}
		}
		//次に同じ数字が連続している場合はその方向の数字と結合させる
		for (var i=0; i<this.size; i++){
			for(var j=0; j<(this.size-1); j++){
				if(this.matrix[i][this.size-j-1] == this.matrix[i][this.size-j-2]){
					this.score = this.score+this.matrix[i][this.size-j-1];
					this.matrix[i][this.size-j-1] = this.matrix[i][this.size-j-2]*2;
					this.matrix[i][this.size-j-2] = 0;
				}
			}
		}
		//また0がある場合はその方向に移動させる
		for (var k=0; k<this.size; k++){
			for (var i=0; i<this.size; i++){
				for(var j=0; j<(this.size-1); j++){
					if(this.matrix[i][this.size-j-1] == 0){
						this.matrix[i][this.size-j-1] = this.matrix[i][this.size-j-2];
						this.matrix[i][this.size-j-2] = 0;
					}
				}
			}
		}
	}
	
	//下方向に移動させる
	if(direction==2){
		//まず0がある場合はその方向に移動させる
		for (var k=0; k<this.size; k++){
			for (var i=0; i<this.size; i++){
				for(var j=0; j<(this.size-1); j++){
					if(this.matrix[this.size-j-1][i] == 0){
						this.matrix[this.size-j-1][i] = this.matrix[this.size-j-2][i];
						this.matrix[this.size-j-2][i] = 0;
					}
				}
			}
		}
		//次に同じ数字が連続している場合はその方向の数字と結合させる
		for (var i=0; i<this.size; i++){
			for(var j=0; j<(this.size-1); j++){
				if(this.matrix[this.size-j-1][i] == this.matrix[this.size-j-2][i]){
					this.score = this.score+this.matrix[this.size-j-1][i];
					this.matrix[this.size-j-1][i] = this.matrix[this.size-j-2][i]*2;
					this.matrix[this.size-j-2][i] = 0;
				}
			}
		}
		//まず0がある場合はその方向に移動させる
		for (var k=0; k<this.size; k++){
			for (var i=0; i<this.size; i++){
				for(var j=0; j<(this.size-1); j++){
					if(this.matrix[this.size-j-1][i] == 0){
						this.matrix[this.size-j-1][i] = this.matrix[this.size-j-2][i];
						this.matrix[this.size-j-2][i] = 0;
					}
				}
			}
		}
	}
	
	//左方向に移動させる
	if(direction==3){
		//まず0がある場合はその方向に移動させる
		for (var k=0; k<this.size; k++){
			for (var i=0; i<this.size; i++){
				for(var j=0; j<(this.size-1); j++){
					if(this.matrix[i][j] == 0){
						this.matrix[i][j] = this.matrix[i][j+1];
						this.matrix[i][j+1] = 0;
					}
				}
			}
		}
		//次に同じ数字が連続している場合はその方向の数字と結合させる
		for (var i=0; i<this.size; i++){
			for(var j=0; j<(this.size-1); j++){
				if(this.matrix[i][j] == this.matrix[i][j+1]){
					this.score = this.score+this.matrix[i][j];
					this.matrix[i][j] = this.matrix[i][j+1]*2;
					this.matrix[i][j+1] = 0;
				}
			}
		}
		//また0がある場合はその方向に移動させる
		for (var k=0; k<this.size; k++){
			for (var i=0; i<this.size; i++){
				for(var j=0; j<(this.size-1); j++){
					if(this.matrix[i][j] == 0){
						this.matrix[i][j] = this.matrix[i][j+1];
						this.matrix[i][j+1] = 0;
					}
				}
			}
		}
	}
	
	//0のセルがあるかどうかを検索してあった場合に2を挿入する
	var count=0;
	this.matrix.forEach(function(val){
		val.forEach(function(val2){
			if(val2 == 0){
				count++;
			}
		});
	});
	if(count != 0){
		while(1){
			var x= Math.floor(Math.random()*this.size);
			var y= Math.floor(Math.random()*this.size);
			if(this.matrix[x][y] == 0){
				this.matrix[x][y] = 2;
				break;
			}
		}
	}
}


