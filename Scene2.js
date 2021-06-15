class Scene2 extends Phaser.Scene {
    constructor() {
        super('juego');
    }

    create() {
        ////////////////////////////Mis Plataformas y Fondo///////////////////////////
        //  A simple background for our game
        this.add.image(420, 300, 'sky2');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //Plataforma oscilante
        var plat2 = this.physics.add.image(80, 460, 'ground').setScale(0.12);
        plat2.body.allowGravity = false;
        plat2.body.immovable = true;
        plat2.body.moves = false;

        var tween = this.tweens.add({
            targets: plat2,
            x: 350,
            paused: false,
            yoyo: true,
            repeat: -1
        });

        //Plataforma oscilante vertical
        var plat3 = this.physics.add.image(50, 60, 'ground').setScale(0.12);
        plat3.body.allowGravity = false;
        plat3.body.immovable = true;
        plat3.body.moves = false;

        var tween = this.tweens.add({
            targets: plat3,
            duration: 3000,
            y: 500,
            paused: false,
            yoyo: true,
            repeat: -1
        });



        //  Here we create the ground.
        platforms.create(400, 568, 'ground').setScale(1.1).refreshBody();

        //  Now let's create some ledges
        platforms.create(640, 400, 'ground').setScale(0.6).refreshBody();
        platforms.create(10, 250, 'ground').setScale(0.6).refreshBody();
        platforms.create(790, 220, 'ground').setScale(0.6).refreshBody();
        platforms.create(370, 315, 'ground').setScale(0.12).refreshBody();
        platforms.create(370, 180, 'ground').setScale(0.12).refreshBody();

        // The player and its settings (Mantengo original)
        player = this.physics.add.sprite(100, 450, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(0.85);

        //  Input Events
        if (cursors = !undefined) {
            cursors = this.input.keyboard.createCursorKeys();
        }

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 5,
            setXY: {
                x: 12,
                y: 0,
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

        stars.children.iterate(function(child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        stars2.children.iterate(function(child) {

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

        //Para el tiempo en pantalla
        tempText = this.add.text(610, 560, 'Time: 0', {
            font: '32px Montserrat',
            fill: '#000',

        });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, plat2);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(stars, plat2);
        this.physics.add.collider(stars2, platforms);
        this.physics.add.collider(stars2, plat2);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(bombs, plat2);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, stars2, this.collectStarRed, null, this);
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        // Inicializacion de variables.
        score = 0;
        gameOver = false;

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
            player.setVelocityY(-220);
        }

        //acá la idea es encontrar una alternativa para el cálculo del tiempo a 60 cuadros por seg
        x1 = x1 + 0.01666;
        tempText.setText('Time: ' + Math.trunc(x1));

    }

    collectStar(player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText(score);

        if (stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            stars.children.iterate(function(child) {

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
            stars2.children.iterate(function(child) {
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

    }

}