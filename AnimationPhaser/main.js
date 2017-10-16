

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	img : {},
	anim : null,
	preload : function(){
		//Chargement de la spritesheet de la momie
		//Params : Nom, path/to/img.png, frameWidth, frameHeight, nbFrames
		//Phaser va automatiquement découper l'image pour l'affichage
		game.load.spritesheet('mummy', './assets/img/mummy.png', 37, 45, 18);
	},
	create : function(){
		//Creation du sprite de l'image
		//Params : x, y, nom de l'image
		this.img.mummy = game.add.sprite(0, 0, 'mummy');

		//Redimensionnement de l'image
		this.img.mummy.scale.set(4);

		//Les contours de l'image ne sont pas lissé
		this.img.mummy.smoothed = false;

		//Création d'une nouvelle animation de nom walk
		this.anim = this.img.mummy.animations.add('walk');

		//L'animation est joué
		//Params : FPS, loop
		this.anim.play(10, true);
	},
	update : function(){

	},
	render : function(){

	}
}

// Création d'un nouvelle objet Game
// Params : Width, height, Renderer : type de rendu
// Parent : bloc dans lequel créer le canvas, Etats du jeu
var game = new Phaser.Game(300, 300, Phaser.CANVAS, null, States);