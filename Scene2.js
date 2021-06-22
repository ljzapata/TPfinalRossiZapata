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

        ////////////////////////////Mis Plataformas y Fondo///////////////////////////
        // Fondo
        this.add.image(400, 800, 'sky1').setScale(0.24);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        platforms.create(650, 260, 'ground').setScale(0.5).refreshBody();
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
            duration: 2000,
            x: 600,
            paused: false,
            yoyo: true,
            repeat: -1
        });

        //Plataforma oscilante vertical
        var plat3 = this.physics.add.image(45, 400, 'ground').setScale(0.3);
        plat3.body.allowGravity = false;
        plat3.body.immovable = true;
        plat3.body.moves = false;

        var tween = this.tweens.add({
            targets: plat3,
            duration: 8000,
            ease: 'Sine.easeInOut',
            y: 1430,
            paused: false,
            yoyo: true,
            repeat: -1
        });

        //////////////////////////////jugador y cazador////////////////////////////////////
        cazador = this.physics.add.sprite(1, 300, 'hunter');
        cazador.setBounce(0);
        cazador.setCollideWorldBounds(true);
        cazador.setScale(0.24);
        cazador.setGravity(0, 300);

        // The player and its settings
        player = this.physics.add.sprite(400, 1400, 'Dino1');

        //  Player physics properties.
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        player.setScale(0.24);

        //  Input Events
        if (cursors = !undefined) {
            cursors = this.input.keyboard.createCursorKeys();
        }

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            sprite: 'star',
            frames: [{ key: 'star', frame: 3 }],
            repeat: 5,
            setXY: {
                x: 12,
                y: 12,
                stepX: 140
            }

        });

        stars2 = this.physics.add.group({
            key: 'star2',
            repeat: 5,
            setXY: {
                x: 82,
                y: 0,
                stepX: 140
            }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        stars2.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        bombs = this.physics.add.group();

        //  Score
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
        tempText = this.add.text(610, 560, 'Tiempo: 180', {
            font: '32px Montserrat',
            fill: '#000',
        });
        tempText.setScrollFactor(0);

        // inicializador de tiempo
        initialTime = 180
        //timedEvent = this.time.delayedCall(1000, this.onSecond, [], this, true);
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(500, 16, '', { fontSize: '32px', fill: '#000' });


        //Para las vidas en pantalla
        vidasText = this.add.text(70, 560, 'Vidas: ' + vidas, {
            font: '32px Montserrat',
            fill: '#000',
        });
        vidasText.setScrollFactor(0);

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, plat2);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(stars, plat2);
        this.physics.add.collider(stars2, platforms);
        this.physics.add.collider(stars2, plat2);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(bombs, plat2);
        this.physics.add.collider(cazador, plat3);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, stars2, this.collectStarRed, null, this);
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);



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
        }
        else {
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

    }


    collectStar(player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText(score);

        if (stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }

        //reproducir sonido
        let sound = this.sound.add('recolestrella', { volume: 0.3 });
        sound.play();

    }

    collectStarRed(player, star) {
        star.disableBody(true, true);

        //  Puntaje para las estrellas rojas
        score += 15;
        scoreText.setText(score);

        if (stars2.countActive(true) === 0) {
            stars2.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
        //reproducir sonido
        let sound = this.sound.add('recolestrella', { volume: 0.3 });
        sound.play();
    }

    hitBomb(player, bomb) {
        this.gameOver()
    }

    gameOver() {
        gameOver = true;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial', fontSize: 70, color: '#ff0000' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('creditos'));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));

        gameOverButton.setScrollFactor(0);
    }

    onSecond() {
        if (!gameOver) {
            initialTime = initialTime - 1; // One second
            tempText.setText('Tiempo: ' + initialTime);
            if (initialTime == 0) {

                var sintiempo = this.add.text(700, 500, 'Sin tiempo\nPerdes una vida', { fontFamily: 'Arial', fontSize: 70, color: '#ff0000' });
                Phaser.Display.Align.In.Center(sintiempo, this.add.zone(400, 300, 800, 600));
                sintiempo.setScrollFactor(0);

                setTimeout(() => {
                    sintiempo.visible = false;
                }, 2000);

                initialTime = 180;
                vidas = vidas - 1;

            }
        }

    }

}