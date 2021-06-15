class Scene3 extends Phaser.Scene {
    constructor() {
        super("creditos");
    }

    preload() {
        this.load.image('logo2D', 'assets/logo2D.png');
    }

    create() {
        this.add.image(400, 300, 'sky2');
        this.add.image(400, 568, 'ground').setScale(1)
        this.add.image(400, 100, 'logo2D');


        var puntajefinal = this.add.text(0, 0, score, {
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

        Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(400, 300, 800, 600));

        var datosfin = [
            "UNRAF 2021",
            "Programación 1",
            "Docentes: Nicolás Nocete - Federico Degiovanni",
            "Alumno: Nicolás Rossi"
        ];
        this.add.text(20, 390, datosfin, { font: '20px Montserrat', color: '#ffffff' })

        var restartButton = this.add.text(610, 550, 'Jugar', { font: '30px Montserrat', color: '#000000' })
            .setInteractive()
            .on('pointerdown', () => this.jugar());

        var volverButton = this.add.text(80, 550, 'Volver', { font: '30px Montserrat', color: '#000000' })
            .setInteractive()
            .on('pointerdown', () => this.volver());
    }

    jugar() {
        this.scene.start('juego');
        this.sound.stopAll();
    }

    volver() {
        this.scene.start('inicio');
    }

}