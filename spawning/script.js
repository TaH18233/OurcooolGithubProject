window.addEventListener("load",function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var enemy,xtemp,ytemp;
	var enemies = [];
	var image = new Image();
	image.src = "images/acmelogoklein.png";
	
	var shot = new Audio('sound/bomb.wav');
	var scream = new Audio('sound/explosion.wav');
	var mouseX,mouseY;	
	
	addEventListener("mousedown",function(e){
		mouseX = e.clientX - canvas.offsetLeft;
		mouseY = e.clientY - canvas.offsetTop;
		shot.currentTime = 0;
		shot.play();
		enemies.forEach(function(enemy){
			if(mouseX > enemy.x && mouseX < enemy.x+enemy.width && mouseY > enemy.y && mouseY< enemy.y + enemy.height){
				scream.currentTime = 0;
				scream.play();
				enemies.splice(enemies.indexOf(enemy),1);
			}
		})
	});
	
	
	setInterval(loop,10);
	
	function loop(){
		if(Math.random()<0.01){			
			xtemp = Math.random()*750;
			enemy = new Enemy(context,xtemp,-150,image);
			enemies.push(enemy);
		}
		context.clearRect(0,0,800,450);
		enemies.forEach(function(enemy){
			enemy.update();
			enemy.draw();
			if(enemy.y>450){
				enemies.splice(enemies.indexOf(enemy),1);
			}
		});
		
	}

	
});

function Enemy(context,x,y,image){
	this.x = x;
	this.y = y;
	this.width = 116;
	this.height = 148;
	var speed = 1;
	var color ="#"+Math.floor(Math.random()*256*256*256).toString(16);
	
	this.update = function(){
		this.y += 2;
	}
	
	this.draw = function(){
		context.drawImage(image,this.x,this.y);
	}
}