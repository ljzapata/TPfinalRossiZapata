class Scene3 extends Phaser.Scene {
    constructor() {
        super("creditos");
    }

    preload() {
        this.load.image('FondoCreditos', 'assets/Escena 3 CREDITOS.png');
        this.load.image('BotonInicio', 'assets/BotonInicio.png');
    }

    create() {
        this.add.image(400, 300, 'FondoCreditos').setScale(0.24);

        var jugarButton = this.add.image(720, 550, 'BotonJugar').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.jugar());

            var ayudaButton = this.add.image(80, 550, 'BotonInicio').setScale(0.5)
            .setInteractive()
            .on('pointerdown', () => this.volver());
    }

    jugar() {
        this.scene.start('juego');
    }

    volver() {
        this.scene.start('inicio');
    }

}