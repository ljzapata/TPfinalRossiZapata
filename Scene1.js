class Scene1 extends Phaser.Scene {
    constructor() {
        super('inicio');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('sky2', 'assets/Fondo_Prueba.png');
        this.load.image('ground', 'assets/platnew.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('star2', 'assets/star_red.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });

        //carga audio
        this.load.audio('recolestrella', 'sounds/recolestrella.mp3');
        this.load.audio('gameover', 'sounds/gameover1.mp3');

    }

    create() {

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        var jugarButton = this.add.text(340, 540, 'Jugar', { font: '40px Montserrat', color: '#ff0000' })
            .setInteractive()
            .on('pointerdown', () => this.jugar());

        var ayudaButton = this.add.text(80, 550, 'Ayuda', { font: '30px Montserrat', color: '#ff0000' })
            .setInteractive()
            .on('pointerdown', () => this.ayuda());

        var creditosButton = this.add.text(610, 550, 'Créditos', { font: '30px Montserrat', color: '#ff0000' })
            .setInteractive()
            .on('pointerdown', () => this.creditos());
    }

    jugar() {
        this.scene.start('juego');
    }

    ayuda() {
        this.scene.start('ayuda');
    }

    creditos() {
        this.scene.start('creditos');
    }


}