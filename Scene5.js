class Scene5 extends Phaser.Scene {
    constructor() {
        super("superado");
    }

    preload() {
        this.load.image('logo2D', 'assets/logo2D.png');
    }

    create() {
        this.add.image(400, 300, 'sky2');
        this.add.image(400, 568, 'ground').setScale(1)
        this.add.image(400, 100, 'logo2D');

        var jugarButton = this.add.text(660, 550, 'Jugar', { font: '30px Montserrat', color: '#000000' })
            .setInteractive()
            .on('pointerdown', () => this.jugar());

        var volverButton = this.add.text(80, 550, 'Volver', { font: '30px Montserrat', color: '#000000' })
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