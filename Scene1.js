class Scene1 extends Phaser.Scene {
    constructor() {
        super('inicio');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('GameOver', 'assets/Escena 7 JUEGO PERDIDO.png');
        this.load.image('sky1', 'assets/FondoNivel1Prueba.png');
        this.load.image('sky2', 'assets/FondoNivel2Prueba.png');
        this.load.image('ground', 'assets/plat_green.png');
        this.load.image('cabra', 'assets/Cabra1.png');
        this.load.image('cabra2', 'assets/cabra2.png');
        this.load.image('roca', 'assets/meteoritoRedondo.png');
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
        this.load.image('vidamenos', 'assets/UnaVidaMenos.png');
        this.load.image('vidamenos2', 'assets/UnaVidaMenos2.png');


        //carga audio
        this.load.audio('sonidofondo0', 'sounds/sonidoinicio.mp3');
        this.load.audio('sonidofondo1', 'sounds/sonidofondo1.mp3');
        this.load.audio('sonidofondo2', 'sounds/sonidofondo2.mp3');
        this.load.audio('comercabra', 'sounds/powerups2.mp3');
        this.load.audio('sonidogameover', 'sounds/gameover2.mp3');
        this.load.audio('sonidoboton', 'sounds/Switch3.mp3');
            //this.load.audio('sonidoinicio', 'sounds/sonidoinicio')

    }

    create() {
        this.add.image(400, 300, 'FondoInicio').setScale(0.24)

        this.sonido0 = this.sound.add('sonidofondo0',{ volume: 0.1 });
        this.sonido0.loop = true;
        this.sonido0.play();

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Dino1', { start: 8, end: 14 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'Dino1', frame: 4 }],
            frameRate: 20
        });

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
            frames: [{ key: 'cabra', frame: 3 }],
            frameRate: 20
        });

        var jugarButton = this.add.image(400, 550, 'BotonJugar').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.stopAll() & this.sound.play('sonidoboton') & this.jugar());

        var ayudaButton = this.add.image(80, 550, 'BotonAyuda').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.stopAll() & this.sound.play('sonidoboton') & this.ayuda());

        var creditosButton = this.add.image(720, 550, 'BotonCreditos').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.stopAll() & this.sound.play('sonidoboton') & this.creditos());
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