
(function(){
	//variáveis
	let cnv = document.querySelector("#meuCanvas");
	let ctx = cnv.getContext("2d");
	let blk;

	//images
	const robot1 = new Image()
	robot1.src = '../images/player1.png'

	const robot2 = new Image()
	robot2.src = '../images/player2.png'

	const wall = new Image()
	wall.src = '../images/wall.png'

	const floor = new Image()
	floor.src = '../images/floor.png'
	

	//Teclas
	const LEFT = 37
	const UP = 38
	const RIGHT = 39
	const DOWN = 40;

	const A = 65;
	const W = 87;
	const D = 68;
	const S = 83;
	//Movimentos
	let mvLeft = mvUp = mvRight = mvDown = false;
	
	let plLeft = plUp = plRight = plDown = false;
	//Arrays
	let sprites = [];
	let blocks = [];
	
	
	//Objetos instanciados com os seguintes parâmetros: posX, posY, Largura, Altura e cor
	var player1 = new Sprite('player1', 50, 700, 50, 50, "robot1", 'player', 300);
	sprites.push(player1);
	
	
	let player2 = new Sprite('player2', 1350, 200, 50, 50, "robot2", 'player', 300);
	sprites.push(player2);
	
	
	let block1 = new Sprite('block1', 90, 70, 300, 350 , "wall");
	sprites.push(block1);
	blocks.push(block1);

	let block2 = new Sprite('block2', 700, 90, 400, 400, "wall");
	sprites.push(block2);
	blocks.push(block2);

	let block3 = new Sprite('block3', 420, 600, 1000, 100, "floor");
	sprites.push(block3);
	blocks.push(block3);
	
	function getImage(image){
		const images = {
			robot1, robot2, wall, floor
		}
		return images[image] || images.robot1
	}
	//entradas
	//Evento disparado quando uma tecla é pressionada
	window.addEventListener("keydown",function(e){
		let key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = true;
				break;
			case UP:
				mvUp = true;
				break;
			case RIGHT:
				mvRight = true;
				break;
			case DOWN:
				mvDown = true;
				break;
		}
	},false);
	
	//Evento disparado quando uma tecla é solta
	window.addEventListener("keyup",function(e){
		let key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = false;
				break;
			case UP:
				mvUp = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
			case DOWN:
				mvDown = false;
				break;
		}
	},false);
	//Player 2 
	window.addEventListener("keydown",function(r){
		let key = r.keyCode;
		switch(key){
			case A:
				plLeft = true;
				break;
			case W:
				plUp = true;
				break;
			case D:
				plRight = true;
				break;
			case S:
				plDown = true;
				break;
		}
	},false);
	
	//Evento disparado quando uma tecla é solta
	window.addEventListener("keyup",function(r){
		let key = r.keyCode;
		switch(key){
			case A:
				plLeft = false;
				break;
			case W:
				plUp = false;
				break;
			case D:
				plRight = false;
				break;
			case S:
				plDown = false;
				break;
		}
	},false);


	//funções
	function loop(){
		window.requestAnimationFrame(loop,cnv);
		update();
		update2();
		render();
	}
	player1.velocidade = 6;

	//Atualizações
	function update(){
		if(mvLeft && !mvRight){
			player1.posX -=player1.velocidade;
		}
		if(mvRight && !mvLeft){
			player1.posX +=player1.velocidade;
		}
		if(mvUp && !mvDown){
			player1.posY -=player1.velocidade;
		}
		if(mvDown && !mvUp){
			player1.posY +=player1.velocidade;
		}
		//Limites da tela
		player1.posX = Math.max(0, Math.min(cnv.width - player1.width, player1.posX));
		player1.posY = Math.max(0, Math.min(cnv.height - player1.height, player1.posY));
		
		//Colisões
		for(let i in blocks){
			let blk = blocks[i];
			if(blk.visible){
				blockRect(player1,blk);
				
			}
			if(blk.visible){
				blockRect(player1,player2);
				
			}
		}
	}
	player2.velocidade = 6;
	//Player 2 
	function update2(){
		if(plLeft && !plRight){
			player2.posX -=player2.velocidade = 6;
		}
		if(plRight && !plLeft){
			player2.posX +=player2.velocidade = 6;
		}
		if(plUp && !plDown){
			player2.posY -=player2.velocidade = 6;
		}
		if(plDown && !plUp){
			player2.posY +=player2.velocidade = 6;
		}
		//Limites da tela
		player2.posX = Math.max(0, Math.min(cnv.width - player2.width, player2.posX));
		player2.posY = Math.max(0, Math.min(cnv.height - player2.height, player2.posY));
		
		//Colisões
		for(let i in blocks){
			var blk = blocks[i];
			if(blk.visible){
					blockRect(player2,blk);
				}								
			}
			if(blk.visible){
				blockRect(player2,player1);				
		}			
		
	}

	//Renderização ou desenho na tela
	function render(){
		ctx.clearRect(0,0,cnv.width,cnv.height);
		for(let i in sprites){
			let spr = sprites[i];
			if(spr.visible){
				
				ctx.drawImage(getImage(spr.image), spr.posX, spr.posY, spr.width, spr.height);
			}
		}		
	}
	loop();
}());