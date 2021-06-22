class Scene1 extends Phaser.Scene {
    constructor() {
        super('inicio');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('sky1', 'assets/FondoNivel1Prueba.png');
        this.load.image('sky2', 'assets/FondoNivel2.png');
        this.load.image('ground', 'assets/plat_green.png');
        this.load.spritesheet('star', 'assets/Cabra.png', {
            frameWidth: 192,
            frameHeight: 128
        });
        this.load.image('star2', 'assets/star_red.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('hunter', 'assets/cazador.png', {
            frameWidth: 172,
            frameHeight: 192
        });
        this.load.image('FondoInicio', 'assets/Escena 2 INICIO.png');
        this.load.image('BotonJugar', 'assets/BotonJuego.png');
        this.load.image('BotonAyuda', 'assets/BotonAyuda.png');
        this.load.image('BotonCreditos', 'assets/BotonCreditos.png');
        this.load.spritesheet('Dino1', 'assets/Dino1.png', {
            frameWidth: 375,
            frameHeight: 236
        });

        //carga audio
        this.load.audio('recolestrella', 'sounds/recolestrella.mp3');
        this.load.audio('gameover', 'sounds/gameover1.mp3');

    }

    create() {
        this.add.image(400, 300, 'FondoInicio').setScale(0.24)

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Dino1', { start: 8, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        //SALTO A LA IZQUIERDA (NO PUDE HACERLO FUNCIONAR)
        //this.anims.create({
        //key: 'turnleft',
        //frames: this.anims.generateFrameNumbers('Dino1', { start: 2, end: 5 }),
        //frameRate: 10,
        //repeat: -1
        //});

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'Dino1', frame: 4 }],
            frameRate: 20
        });

        //SALTO A LA DERECHA (NO PUDE HACERLO FUNCIONAR)
        //this.anims.create({
        //key: 'turnright',
        //frames: this.anims.generateFrameNumbers('Dino1', { start: 24, end: 27 }),
        //frameRate: 10,
        //repeat: -1
        //});

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Dino1', { start: 15, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            frames: [{ key: 'hunter', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            frames: [{ key: 'star', frame: 3 }],
            frameRate: 20
        });

        var jugarButton = this.add.image(400, 550, 'BotonJugar').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.jugar());

        var ayudaButton = this.add.image(80, 550, 'BotonAyuda').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.ayuda());

        var creditosButton = this.add.image(720, 550, 'BotonCreditos').setScale(0.5)
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