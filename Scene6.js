class Scene6 extends Phaser.Scene {
    constructor() {
        super("gameover");
    }

    preload() {
        this.load.image('logo2D', 'assets/logo2D.png');
    }

    create() {

        var jugarButton = this.add.text(660, 550, 'Jugar', { font: '30px Montserrat', color: '#000000' })
            .setInteractive()
            .on('pointerdown', () => this.sound.play('sonidoboton') & this.jugar());

        var volverButton = this.add.text(80, 550, 'Inicio', { font: '30px Montserrat', color: '#000000' })
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