var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
var stars;
var bombs;
var platforms;
var cursors;
var scoreText;

var timedEvent;
var initialTime;
var timeText;

var stars2;

var x1 = 0;
var tempText;