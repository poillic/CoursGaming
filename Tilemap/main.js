

// Objet qui va contenir les différents états du jeu
var States = {
	cursors : null,
	anim : null,
	map: null,
	layers: {},
	preload : function(){
		game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tileset', 'assets/tiles_spritesheet.png');
	},
	create : function(){
		this.map = game.add.tilemap('map');
		this.map.addTilesetImage('tiles', 'tileset');
		this.layers.ground = this.map.createLayer('Ground');
		this.layers.platform = this.map.createLayer('Platform');
	},
	update : function(){	

	},
	render : function(){

	}
}

var game = new Phaser.Game(70*32, 70*32, Phaser.CANVAS, null, States);