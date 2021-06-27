class Scene8 extends Phaser.Scene {
    constructor() {
        super("terminado");
    }

    preload() {
        this.load.image('termina', 'assets/Escena 8 JUEGO SUPERADO.png');
        this.load.image('BotonInicio', 'assets/BotonInicio.png');
    }

    create() {
        this.add.image(400, 300, 'termina').setScale(0.24);

        var jugarButton = this.add.image(720, 550, 'BotonJugar').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.play('sonidoboton') & this.jugar());

        var ayudaButton = this.add.image(80, 550, 'BotonInicio').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.play('sonidoboton') & this.volver());

        scoreText = this.add.text(130, 300, score, {
            font: '80px Montserrat',
            fill: '#ff0000',
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#ffffff',
                blur: 5,
                stroke: true,
                fill: true
            }
        });
    }

    jugar() {
        this.scene.start('juego');
    }

    volver() {
        this.scene.start('inicio');
    }

}