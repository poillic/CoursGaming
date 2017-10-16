window.addEventListener('DOMContentLoaded', function(){
	console.log('Drawing');

	var cvs = document.createElement('canvas');
	cvs.width = 1600;
	cvs.height = 32;
	var ctx = cvs.getContext('2d');

	document.body.appendChild(cvs);
	var mario = new Image();
	mario.src = './assets/img/walk.png';

	var char = {
		x : 0,
		y : 0
	};

	var x = 0;
	var y = 0;

	var isWalking = false;
	var reversed = 1;
	mario.onload = function(){
		setInterval( run, 1000/15 );
	}

	function run(){
		ctx.fillStyle = "#5d94fd";
		ctx.fillRect(0, 0, cvs.width, cvs.height);
		if( isWalking ){
			x += 16;
			if( x >= 64 ){
				x = 16;
			}
		}

		ctx.drawImage( mario, x, y, 16, 32, char.x, char.y, 16, 32 );
	}

	window.addEventListener('keydown', function(e){
		if( e.keyCode == 37 || e.keyCode == 39 ){
			isWalking = true;
			if( e.keyCode == 37 ){
				char.x -= 5;
				y = 32;
			}else if( e.keyCode == 39 ){
				char.x += 5;
				y = 0;
			}
		}
	});

	window.addEventListener('keyup', function( e ){
		if( e.keyCode == 37 || e.keyCode == 39 ){
			isWalking = false;
			x = 0;
		}
	});

});
