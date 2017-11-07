

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	img : {},
	player: null,
	enemies: null,
	bullets: null,
	fireButton: null,
	spawnTimer: 1000,
	bulletTime: 0,
	stateText: null,
	preload : function(){
		game.load.image('starfield', './assets/img/starfield.jpg');
		game.load.image('player', './assets/img/player.png');
		game.load.image('bullet', './assets/img/laser.png');
		game.load.image('enemy', './assets/img/enemy.png');
	},
	create : function(){
		this.img.bkg = game.add.tileSprite(0, 0, 450, 700, 'starfield');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(30, 'bullet');
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 1);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);

		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
		this.enemies.createMultiple(100, 'enemy');
		this.enemies.setAll('anchor.x', 0.5);
		this.enemies.setAll('anchor.y', 0.5);

		this.player = game.add.sprite(225, 650,'player');
		this.player.anchor.setTo(0.5,0.5);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);

		this.cursors = game.input.keyboard.createCursorKeys();
		this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '42px Arial', fill: '#fff' });
		this.stateText.anchor.setTo(0.5, 0.5);
		this.stateText.visible = false;

		game.time.events.loop(Phaser.Timer.SECOND * 1, this.createEnemy, this);
	},
	update : function(){
		this.img.bkg.tilePosition.y += 2;

		this.player.body.velocity.x = 0;
		if( this.cursors.left.isDown ){
			this.player.body.velocity.x = -200;
		}else if( this.cursors.right.isDown ){
			this.player.body.velocity.x = 200;
		}

		if( this.fireButton.isDown ){
			this.fireBullet();
		}

		game.physics.arcade.overlap( this.bullets, this.enemies, this.bulletHitEnemy, null, this);
		game.physics.arcade.overlap( this.player, this.enemies, this.enemyHitPlayer, null, this);
	},
	render : function(){

	},
	bulletHitEnemy: function(bullet, enemy){
		bullet.kill();
		enemy.kill();
	},
	enemyHitPlayer: function(){
		this.player.kill();
		this.stateText.text=" GAME OVER \n Click to restart";
        this.stateText.visible = true;
		game.input.onTap.addOnce(this.restart,this);
		game.time.events.stop();
		this.enemies.callAll('kill');
		this.bullets.callAll('kill');
	},
	fireBullet: function(){
		if( game.time.now > this.bulletTime){
			var bullet = this.bullets.getFirstExists(false);

			if( bullet ){
				bullet.reset( this.player.x, this.player.y + 8 );
				bullet.body.velocity.y = -400;
				this.bulletTime = game.time.now + 200;
			}
		}
	},
	createEnemy: function(){
		var enemy = this.enemies.getFirstExists(false);

		if( enemy ){
			enemy.reset( game.rnd.integerInRange( 30, 420 ), -200);
			enemy.body.velocity.y = 350;
		}
	},
	restart: function(){
		game.state.restart();
	}
}

var game = new Phaser.Game(450, 700, Phaser.CANVAS, null, States);