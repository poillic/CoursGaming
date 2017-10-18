

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	img : {},
	palette : null,
	anim : null,
	bricks: null,
	ball : null,
	ballOnPaddle : true,
	preload : function(){
		game.load.image('starfield', './assets/img/starfield.jpg');
		game.load.image('palette', './assets/img/palette.png');
		game.load.image('brick-green', './assets/img/brick_green.png');
		game.load.image('brick-blue', './assets/img/brick_blue.png');
		game.load.image('ball', './assets/img/ball.png');
	},
	create : function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.checkCollision.down = false;

		this.img.bkg = game.add.tileSprite(0, 0, 600, 450, 'starfield');

		this.palette = game.add.sprite(300, 420, 'palette');
		this.palette.anchor.set(.5, 0);
		game.physics.enable( this.palette, Phaser.Physics.ARCADE );
		this.palette.checkWorldBounds = true;
		this.palette.body.bounce.set(1);
		this.palette.body.immovable = true;
		this.palette.body.collideWorldBounds = true;
		
		this.ball = game.add.sprite(0, 0, 'ball');
		this.ball.anchor.set(.5, 1);
		this.ball.reset( this.palette.x, this.palette.y);
		this.ball.checkWorldBounds = true;
		game.physics.enable( this.ball, Phaser.Physics.ARCADE );
		this.ball.body.bounce.set(1);
		this.ball.body.collideWorldBounds = true;

		this.cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
		this.cursors.spaceKey = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );

		this.bricks = game.add.group();
		this.bricks.enableBody = true;
		this.bricks.physicsBodyType = Phaser.Physics.ARCADE;

		this.ball.events.onOutOfBounds.add( this.ballLost, this );

		for( var y = 0; y < 8; y++){
			for( var x = 0; x < 10; x++){
				var sprite = x % 2 ? 'brick-blue' : 'brick-green';
				var b = this.bricks.create(50 + (x*50), 30 + (y*15), sprite);
				b.body.immovable = true;
			}		
		}

		this.bricks.setAll('body.bounce', 1);
	},
	update : function(){	
		this.palette.body.velocity.x = 0;

		if( this.cursors.left.isDown ){
			this.palette.body.velocity.x = -300;
		}else if( this.cursors.right.isDown ){
			this.palette.body.velocity.x = 300;
		}

		if( this.ballOnPaddle ){
			this.ball.x = this.palette.x;
		}

		if( this.cursors.spaceKey.isDown ){
			this.releaseBall();
		}

		game.physics.arcade.collide( this.ball, this.bricks, this.destroyBrick, null, this );
		game.physics.arcade.collide( this.ball, this.palette, this.setBallDirection, null, this );
	},
	render : function(){

	},
	releaseBall: function(){
		if( this.ballOnPaddle ){
			this.ballOnPaddle = false;
			this.setBallDirection(this.ball, this.palette);
		}
	},
	destroyBrick: function(ball, brick){
		brick.destroy();
	},
	setBallDirection: function(ball, palette){
		if( !this.ballOnPaddle ){	
			var angle = (ball.x - palette.x - 40) * 1.125 - 45;
			game.physics.arcade.velocityFromAngle(angle, 300, this.ball.body.velocity);
		}
		
	},
	ballLost: function(){
		this.ballOnPaddle = true;
		this.palette.reset( 300, 420 );
		this.ball.reset( this.palette.x, this.palette.y );
	}
}

var game = new Phaser.Game(600, 450, Phaser.CANVAS, null, States);