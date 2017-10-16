

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	img : {},
	anim : null,
	mummies : null,
	balls : null,
	preload : function(){
		//Chargement de la spritesheet de la momie
		//Params : Nom, path/to/img.png, frameWidth, frameHeight, nbFrames
		//Phaser va automatiquement découper l'image pour l'affichage
		game.load.spritesheet('mummy', './assets/img/mummy.png', 37, 45, 18);
		game.load.image('ball', './assets/img/ball.png');
	},
	create : function(){
		//Création des groups
		this.mummies = game.add.physicsGroup( Phaser.Physics.ARCADE );
		this.balls = game.add.physicsGroup( Phaser.Physics.ARCADE );

		//On fait une boucle pour remplir le group de mummies
		for( var i = 0; i < 20; i++ ){
			//On crée le sprite à une position aléatoire
			var s = this.mummies.create(
				37 * i,
				20,
				'mummy'
			);

			s.animations.add('walk');
		}

		this.mummies.setAll('body.collideWorldBounds', true);
		this.mummies.setAll('body.bounce.x', 1);
		this.mummies.setAll('body.bounce.y', 1);
		for( var i = 0; i < 5; i++ ){
			var b = this.balls.create(
				game.rnd.integerInRange(100, 700),
				game.rnd.integerInRange(500, 700),
				'ball'
			);

			b.body.velocity.set(
				game.rnd.integerInRange(-300, 300),
				game.rnd.integerInRange(-300, 300)
			);
		}
		//setAll permet de définir la propriété demandée à
		//l'ensemble d'un group
		this.balls.setAll('body.collideWorldBounds', true);
		this.balls.setAll('body.bounce.x', 1);
		this.balls.setAll('body.bounce.y', 1);	
	},
	update : function(){
		//On applique les collisions sur le group
		game.physics.arcade.collide(this.mummies, this.balls, function(){}, null, this);
	},
	render : function(){

	}
}

// Création d'un nouvelle objet Game
// Params : Width, height, Renderer : type de rendu
// Parent : bloc dans lequel créer le canvas, Etats du jeu
var game = new Phaser.Game(740, 600, Phaser.CANVAS, null, States);