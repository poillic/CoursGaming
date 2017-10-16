

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	preload : function(){

	},
	create : function(){
		this.cursors = game.input.keyboard.createCursorKeys();
	},
	update : function(){
		// On vérifie quelle touche est appuyée, la couleur du
		// background est modifiée en fonction

		if( this.cursors.up.isDown ){
			game.stage.backgroundColor = "#007236";
		}else if( this.cursors.down.isDown ){
			game.stage.backgroundColor = "#723600";
		}else if( this.cursors.right.isDown ){
			game.stage.backgroundColor = "#360072";
		}else if( this.cursors.left.isDown ){
			game.stage.backgroundColor = "#720036";
		}
	},
	render : function(){

	}
}

// Création d'un nouvelle objet Game
// Params : Width, height, Renderer : type de rendu
// Parent : bloc dans lequel créer le canvas, Etats du jeu
var game = new Phaser.Game(800, 600, Phaser.CANVAS, null, States);