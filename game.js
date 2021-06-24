var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,        
      },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6]
};

var game = new Phaser.Game(config);

var score;
var gameOver;

var player;
var cazador;
var cazador2;
var stars;
var bombs;
var platforms;
var cursors;
var scoreText;

var timedEvent;

var initialTime = 30;
var time;

var timeText;

var stars2;

var x1 = 0;
var x2 = 10;
var tempText;
var tempText2;

var vidas;
var vidasText;