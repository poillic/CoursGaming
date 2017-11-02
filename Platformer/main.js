

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	anim : null,
	player : null,
	isJumping: false,
	preload : function(){
		game.load.atlasXML('player', './assets/img/alienGreen.png', './assets/alienGreen.xml');
	},
	create : function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = game.add.sprite(300, 400, 'player');
		this.player.anchor.setTo( 0.5, 1 );
		this.player.animations.add('idle', [0]);
		this.player.animations.add('walk', [9,10]);
		this.player.animations.add('jump', [5]);

		game.physics.enable( this.player, Phaser.Physics.ARCADE );

		this.cursors = game.input.keyboard.createCursorKeys();
		game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
		this.cursors.spaceKey = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );

	},
	update : function(){	
		this.player.body.velocity.x = 0;

		if( this.cursors.left.isDown ){
			this.player.body.velocity.x = -300;
			this.player.scale.x = -1;
		}else if( this.cursors.right.isDown ){
			this.player.body.velocity.x = 300;
			this.player.scale.x = 1;
		}

		if( this.player.body.velocity.x != 0 ){
			this.player.animations.play('walk', 8, true);
		}else{
			this.player.animations.play('idle', 10, true);
		}

		if( this.cursors.spaceKey.isDown ){
			this.player.animations.play('jump', 8, true);
		}
	},
	render : function(){

	}
}

var game = new Phaser.Game(600, 450, Phaser.CANVAS, null, States);