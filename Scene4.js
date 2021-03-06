class Scene4 extends Phaser.Scene {
    constructor() {
        super("ayuda");
    }

    preload() {
        this.load.image('FondoAyuda', 'assets/Escena 4 AYUDA2.png');
        this.load.image('BotonInicio', 'assets/BotonInicio.png');
    }

    create() {
        this.add.image(400, 300, 'FondoAyuda').setScale(0.24);

        var jugarButton = this.add.image(720, 550, 'BotonJugar').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.play('sonidoboton') & this.jugar());

            var volverButton = this.add.image(440, 550, 'BotonInicio').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.sound.play('sonidoboton') & this.volver());
    }

    jugar() {
        this.scene.start('juego');
    }

    volver() {
        this.scene.start('inicio');
    }

}