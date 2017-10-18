

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	img : {},
	anim : null,
	mummies : null,
	ball : null,
	preload : function(){
		game.load.image('starfield', './assets/img/starfield.jpg');
	},
	create : function(){
		this.img.bkg = game.add.tileSprite(0,0,600,450, 'starfield');
	},
	update : function(){
	
	},
	render : function(){

	}
}

// Création d'un nouvelle objet Game
// Params : Width, height, Renderer : type de rendu
// Parent : bloc dans lequel créer le canvas, Etats du jeu
var game = new Phaser.Game(600, 450, Phaser.CANVAS, null, States);