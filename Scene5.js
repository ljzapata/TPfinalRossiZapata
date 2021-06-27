class Scene5 extends Phaser.Scene {
    constructor() {
        super("superado");
    }

    preload() {
        this.load.image('supera', 'assets/Escena 6 NIVEL SUPERADO.png');
        this.load.image('fondosupera', 'assets/FondoNivel2.png');
        this.load.image('BotonInicio', 'assets/BotonInicio.png');
    }

    create() {
        this.add.image(400, 800, 'fondosupera');
        this.add.image(400, 300, 'supera').setScale(0.24);

        var jugarButton = this.add.image(720, 550, 'BotonJugar').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.play('sonidoboton') & this.jugar());

        var ayudaButton = this.add.image(80, 550, 'BotonInicio').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.play('sonidoboton') & this.volver());
    }

    jugar() {
        this.scene.start('juego2');
    }

    volver() {
        this.scene.start('inicio');
    }

}