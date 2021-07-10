class Scene2 extends Phaser.Scene {
    constructor() {
        super('juego');
    }

    create() {

        // Inicializacion de variables.
        score = 0;
        gameOver = false;
        vidas = 3;

        this.physics.world.setBounds(0, 0, 800, 1600, true, true, true, true);
        this.cameras.main.setBounds(0, 0, 800, 1600);

        //SONIDOS
        this.sonido1 = this.sound.add('sonidofondo1', { volume: 0.1 });
        this.sonido1.loop = true;
        this.sonido1.play();
        this.sonidogameover = this.sound.add('sonidogameover', { volume: 0.1 })
            ////////////////////////////Mis Plataformas y Fondo///////////////////////////
            // Fondo
        this.add.image(400, 800, 'sky1').setScale(0.24);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        platforms.create(620, 260, 'ground').setScale(0.5).refreshBody();
        platforms.create(220, 460, 'ground').setScale(0.5).refreshBody();
        platforms.create(790, 510, 'ground').setScale(0.5).refreshBody();
        platforms.create(600, 610, 'ground').setScale(0.5).refreshBody();
        platforms.create(370, 660, 'ground').setScale(0.5).refreshBody();
        platforms.create(220, 810, 'ground').setScale(0.5).refreshBody();
        platforms.create(750, 810, 'ground').setScale(0.5).refreshBody();
        platforms.create(400, 960, 'ground').setScale(0.5).refreshBody();
        platforms.create(790, 1090, 'ground').setScale(0.5).refreshBody();
        platforms.create(220, 1090, 'ground').setScale(0.5).refreshBody();
        platforms.create(470, 1210, 'ground').setScale(0.5).refreshBody();
        platforms.create(220, 1360, 'ground').setScale(0.5).refreshBody();
        platforms.create(700, 1360, 'ground').setScale(0.5).refreshBody();

        //  Piso
        platforms.create(400, 1565, 'ground').setScale(2.2).refreshBody();

        //Plataforma oscilante horizontal
        var plat2 = this.physics.add.image(200, 360, 'ground').setScale(0.5);
        plat2.body.allowGravity = false;
        plat2.body.immovable = true;
        plat2.body.moves = false;

        var tween = this.tweens.add({
            targets: plat2,
            duration: 3000,
            x: 600,
            paused: false,
            yoyo: true,
            repeat: -1
        });

        //Plataforma oscilante vertical
        //var plat3 = this.physics.add.image(45, 400, 'ground').setScale(0.3);
        //plat3.body.allowGravity = false;
        //plat3.body.immovable = true;
        //plat3.body.moves = false;

        //var tween = this.tweens.add({
        //targets: plat3,
        //duration: 8200,
        //ease: 'Sine.easeInOut',
        //y: 1430,
        //paused: false,
        //yoyo: true,
        //repeat: -1
        //});

        //////////////////////////////jugador y cazador////////////////////////////////////
        cazador = this.physics.add.image(30, 330, 'caza');
        cazador.setBounce(0);
        cazador.setCollideWorldBounds(true);
        cazador.setScale(0.24);
        cazador.body.setAllowGravity(false);
        cazador.setVelocityY(200);

        // The player and its settings
        player = this.physics.add.sprite(400, 1450, 'Dino1');

        //  Player physics properties.
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.setScale(0.2);

        //  Input Events
        if (cursors = !undefined) {
            cursors = this.input.keyboard.createCursorKeys();
        }

        //Empiezan a caer desde la altura Y = 10, y subiendo 220 unidades por cada una

        cabras = this.physics.add.group({
            key: 'cabra',
            repeat: 4,
            setXY: {
                x: 80,
                y: 10,
                stepX: 150,
                stepY: 220,
            }
        });
        //Empiezan a caer desde la altura Y = 750, y bajando 220 unidades por cada una
        cabras2 = this.physics.add.group({
            key: 'cabra2',
            repeat: 4,
            setXY: {
                x: 150,
                y: 1300,
                stepX: 150,
                stepY: -220,
            }
        });

        cabras.children.iterate(function(child) {
            //  Darle a cada cabra distinto rebote(bounce)
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        cabras2.children.iterate(function(child) {

            //  Darle a cada cabra distinto rebote(bounce)
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        rocas = this.physics.add.group();

        //  Puntaje
        scoreText = this.add.text(320, 16, '00', {
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

        scoreText.setScrollFactor(0);

        //////////////////////////////Tiempo en pantalla////////////////////////////////
        tempText = this.add.text(610, 560, 'Tiempo: ' + initialTime, {
            font: '32px Montserrat',
            fill: '#000',
        });
        tempText.setScrollFactor(0);

        // Inicializador de tiempo
        time = initialTime
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(500, 16, '', { fontSize: '32px', fill: '#000' });


        //Para las vidas en pantalla
        vidasText = this.add.text(70, 560, 'Vidas: ' + vidas, {
            font: '32px Montserrat',
            fill: '#000',
        });
        vidasText.setScrollFactor(0);


        //////////////se agrega la clase "dardo" con sus atributos y funciones////////////////
        dardo = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Sprite,
            initialize:

            //  constructor de dardo
                function dardo(scene) {

                Phaser.Physics.Arcade.Sprite.call(this, scene, 0, 0, 'dardo');
                scene.add.existing(this);
                scene.physics.add.existing(this);

            },

            //  cada vez que se dispara un dardo
            disparo: function(x, y) {

                this.setPosition(x, y);
                this.setVelocityX(300);
                this.setScale(0.03);
                this.body.setAllowGravity(false);
                this.setActive(true);
                this.setVisible(true);
                this.setCollideWorldBounds(false);

            },

        });

        //  se hace un conjunto de dardos
        dardos = this.add.group({

            classType: dardo,
            runChildUpdate: true

        });

        //  Colision player con platforms & cabras con platforms & player con meteorito
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, plat2);
        this.physics.add.collider(cabras, platforms);
        this.physics.add.collider(cabras, plat2);
        this.physics.add.collider(cabras2, platforms);
        this.physics.add.collider(cabras2, plat2);
        this.physics.add.collider(rocas, platforms);
        this.physics.add.collider(rocas, plat2);
        //this.physics.add.collider(cabras, plat3);
        //this.physics.add.collider(cabras2, plat3);
        //this.physics.add.collider(player, plat3);
        //this.physics.add.collider(cazador, plat3);
        this.physics.add.collider(cazador, platforms);

        //  Checks to see if the player overlaps with any of the cabras, if he does call the collectCabras function
        this.physics.add.overlap(player, cabras, this.collectCabras, null, this);
        this.physics.add.overlap(player, cabras2, this.collectCabras2, null, this);
        this.physics.add.collider(player, rocas, this.hitRoca, null, this);
        this.physics.add.overlap(player, dardos, this.hitDardo, null, this);



    }

    update() {
        if (gameOver) {
            return
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

        //if (cursors.up.isDown && cursors.left.isDown) {
        //player.setVelocityY(-330);
        //player.anims.play('turnleft')
        //} else if (cursors.up.isDown && cursors.right.isDown) {
        //player.setVelocityY(330);

        //player.anims.play('turnright')

        //seguimiento de cámara
        this.cameras.main.startFollow(player);

        if (vidas == 0) {
            this.gameOver()
        }

        if (score >= 400) {
            ult_disparo = 200;
            this.sound.stopAll();
            this.scene.start('superado');
        }
        //////////////cuándo dispara el cazador y con qué frecuencia (cada 2 seg)///////////
        if ((cazador.y >= player.y * 0.99) & (cazador.y <= player.y * 1.01)) {

            if (ult_disparo > time) {
                var balita = dardos.get();

                // esto se hace para que el disparo no aparezca delante del jugador
                this.children.bringToTop(balita);
                this.children.bringToTop(cazador);

                if (balita) {
                    balita.disparo(cazador.x, cazador.y);
                    ult_disparo = time - 2;
                }
            }
        }

        ////////////bajo la velocidad del cazador en el nivel 1////////////////

        if (cazador.body.blocked.down) {
            cazador.setVelocityY(-150)
        } else if (cazador.body.blocked.up) {
            cazador.setVelocityY(150)
        }
    }


    collectCabras(player, cabra) {
        cabra.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText(score);

        console.log(cabras.countActive(true))

        if (cabras.countActive(true) === 0) {
            //  A new batch of cabras to collect
            cabras.children.iterate(function(child) {

                // cuando se vuelve a mostrar, se cambia la posicion
                child.enableBody(true, child.x, Phaser.Math.Between(20, 1300), true, true);

            });

            ///////////////desactivo la creación de rocas para cabras blancas en el nivel 1/////////
            //var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            //var roca = rocas.create(x, 16, 'roca');
            //roca.setBounce(1);
            //roca.setCollideWorldBounds(true);
            //roca.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(0.05, 0.15));
            //roca.allowGravity = false;
            //roca.setScale(0.5);

        }

        //reproducir sonido
        let sound = this.sound.add('comercabra', { volume: 0.1 });
        sound.play();

    }

    collectCabras2(player, cabra2) {
        cabra2.disableBody(true, true);

        //  Puntaje para las estrellas rojas
        score += 15;
        scoreText.setText(score);

        console.log(cabras2.countActive(true))

        if (cabras2.countActive(true) === 0) {
            cabras2.children.iterate(function(child) {
                child.enableBody(true, child.x, Phaser.Math.Between(20, 1300), true, true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var roca = rocas.create(x, 16, 'roca');
            roca.setBounce(1);
            roca.setCollideWorldBounds(true);
            roca.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(0.05, 0.15));
            roca.allowGravity = false;
            roca.setScale(0.8);

        }
        //reproducir sonido
        let sound = this.sound.add('comercabra', { volume: 0.4 });
        sound.play();
    }

    hitRoca(player, roca) {
        if (vidas > 1) {
            vidas = vidas - 1;
            vidasText.setText('Vidas:' + vidas);
            roca.disableBody(true, true);
            this.physics.pause();
            var resumegame = this.add.image(700, 500, 'vidamenos2').setScale(0.24)
                .setInteractive()
                .on('pointerdown', () => resumegame.visible = false & this.reinicio());
            Phaser.Display.Align.In.Center(resumegame, this.add.zone(400, 300, 800, 600));
            resumegame.setScrollFactor(0);
            //this.scene.pause();

        } else {
            this.gameOver();
        }

    }

    hitDardo(player, dardos) {
        if (vidas > 1) {
            vidas = vidas - 1;
            vidasText.setText('Vidas:' + vidas);
            dardos.disableBody(false, true);
            this.physics.pause();
            var resumegame = this.add.image(700, 500, 'vidamenos3').setScale(0.24)
                .setInteractive()
                .on('pointerdown', () => resumegame.visible = false & this.reinicio());
            Phaser.Display.Align.In.Center(resumegame, this.add.zone(400, 300, 800, 600));
            resumegame.setScrollFactor(0);
            //this.scene.pause();

        } else {
            this.gameOver();
        }
    }

    reinicio() {
        this.physics.resume();
        //resumegame.visible = false;
    }

    gameOver() {
        gameOver = true;

        ult_disparo = 200;

        this.physics.pause();
        this.sound.stopAll();
        this.sonidogameover.play();

        player.setTint(0xff0000);

        player.anims.play('turn');

        var gameOverButton = this.add.image(700, 500, 'GameOver').setScale(0.24)
            .setInteractive()
            .on('pointerdown', () => this.sound.play('sonidoboton') & this.scene.start('creditos'));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));

        gameOverButton.setScrollFactor(0);
    }

    onSecond() {
        if (!gameOver) {
            time = time - 1; // One second
            tempText.setText('Tiempo: ' + time);
            if (time == 0) {

                time = initialTime;
                ult_disparo = 200;

                vidas = vidas - 1;
                vidasText.setText('Vidas:' + vidas);

                if (vidas) {
                    var sintiempo = this.add.image(700, 500, 'vidamenos').setScale(0.24);
                    Phaser.Display.Align.In.Center(sintiempo, this.add.zone(400, 300, 800, 600));
                    sintiempo.setScrollFactor(0); //texto fijo en la camara

                    setTimeout(() => {
                        sintiempo.visible = false;
                    }, 2000);
                }

            }
        }

    }

}