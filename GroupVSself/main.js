

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	img : {},
	anim : null,
	sprites : null,
	preload : function(){
		//Chargement de la spritesheet de la momie
		//Params : Nom, path/to/img.png, frameWidth, frameHeight, nbFrames
		//Phaser va automatiquement découper l'image pour l'affichage
		game.load.spritesheet('mummy', './assets/img/mummy.png', 37, 45, 18);
	},
	create : function(){
		//Création d'un nouveau group
		this.sprites = game.add.physicsGroup( Phaser.Physics.ARCADE );

		//On fait une boucle pour remplir le group de sprites
		for( var i = 0; i < 50; i++ ){
			//On crée le sprite à une position aléatoire
			var s = this.sprites.create(
				game.rnd.integerInRange(100, 700),
				game.rnd.integerInRange(100, 700),
				'mummy'
			);

			s.animations.add('walk');
			s.play('walk', 10, true);
			//On définie la velocité du sprite aléatoirement
			s.body.velocity.set(
				game.rnd.integerInRange(-200, 200),
				game.rnd.integerInRange(-200, 200)
			);
		}

		//setAll permet de définir la propriété demandée à
		//l'ensemble d'un group
		this.sprites.setAll('body.collideWorldBounds', true);
		this.sprites.setAll('body.bounce.x', 1);
		this.sprites.setAll('body.bounce.y', 1);
	},
	update : function(){
		//On applique les collisions sur le group
		game.physics.arcade.collide( this.sprites );
	},
	render : function(){

	}
}

// Création d'un nouvelle objet Game
// Params : Width, height, Renderer : type de rendu
// Parent : bloc dans lequel créer le canvas, Etats du jeu
var game = new Phaser.Game(800, 600, Phaser.CANVAS, null, States);