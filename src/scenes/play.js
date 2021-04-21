class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload()  {
       this.load.image('castle', './assets/castle.png');
       this.load.image('cloud', './assets/cloud.png');
       this.load.image('grass', './assets/grass.png');
       this.load.image('mountain', './assets/mountain.png');
       this.load.image('river', './assets/river.png');
       this.load.image('sky', './assets/sky.png');
       this.load.image('rocket', './assets/pow.png');
       this.load.image('stand', './assets/wizardStand.png');
       this.load.image('wizard', './assets/wizardFight.png');
       this.load.image('slime', './assets/slime.png');
       this.load.image('slame', './assets/slame.png');
       this.load.image('slume', './assets/slume.png');
       this.load.image('tree', './assets/tree.png');
       this.load.image('trea', './assets/trea.png');
       this.load.image('trei', './assets/trei.png');
       this.load.image('spark', './assets_custom/spark.png');
       this.load.spritesheet('explosion', './assets_custom/explosion.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 8});
    }

    create() {
        //background
        this.sky = this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.mountain = this.add.image(0, 0, 'mountain').setOrigin(0, 0);
        this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud').setOrigin(0, 0);
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0, 0);
        this.river = this.add.tileSprite(0, 0, 640, 480, 'river').setOrigin(0, 0);
        this.tree = this.add.image(0, 0, 'tree').setOrigin(-5, -7);
        this.trea = this.add.image(0, 0, 'trea').setOrigin(-3, -8);
        this.trei = this.add.image(0, 0, 'trei').setOrigin(-18, -10);
        this.castle = this.add.image(0, 0, 'castle').setOrigin(0, 0);
        this.wizardStand = this.add.image(0, 0, 'stand').setOrigin(0, 0);
        //player
        this.p1Sprite = this.add.sprite(0, 415, 'wizard').setOrigin(0, 0);
        p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding - 75, 'rocket', 0, this.p1Sprite, game.settings.ammoCount);
        //slimes
        this.ship1 = new Ship(this, (Math.random() * (590 - 50) + 50), 360, 'slime', 0, 30);
        this.ship2 = new Ship(this, (Math.random() * (590 - 50) + 50), 310, 'slame', 0, 50);
        this.ship3 = new Ship(this, (Math.random() * (590 - 50) + 50), 260, 'slume', 0, 70);  //put y to 280 for something funny
        //more trees
        this.tree = this.add.image(0, 0, 'tree').setOrigin(-8, -9);
        this.trea = this.add.image(0, 0, 'trea').setOrigin(-10, -11);
        this.trei = this.add.image(0, 0, 'trei').setOrigin(-7, -12);
        //inputs 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //explosion 
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8, first: 0}),
            frameRate: 30
        });

        p1Score = 0;
        this.timeLeft = game.settings.gameTimer;

        this.statusConfig = {
            fontSize: '28px',
            color: '000000',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 200
        }

        this.scoreText = this.add.text(borderUISize + borderPadding + 8, borderUISize + borderPadding * 2 + 17,"score:", this.statusConfig);
        this.ammoText = this.add.text(borderUISize + borderPadding + 408, borderUISize + borderPadding * 2 + 17, "fireballs:", this.statusConfig);
        this.timeText = this.add.text(borderUISize + borderPadding + 205, borderUISize + borderPadding * 2 + 17, "time:", this.statusConfig);

        this.scoreLeft = this.add.text(borderUISize + borderPadding + 110, borderUISize + borderPadding * 2 + 17, p1Score, this.statusConfig);
        this.ammoRight = this.add.text(borderUISize + borderPadding + 575, borderUISize + borderPadding * 2 + 17, p1Rocket.ammo, this.statusConfig);
        this.timeCenter = this.add.text(borderUISize + borderPadding + 290, borderUISize + borderPadding * 2 + 17, this.timeLeft, this.statusConfig);

        this.statusConfig.fontSize = '20px'
        this.ammoGain = this.add.text(-1000, -1000, '+0 TORPEDOES', this.statusConfig).setOrigin(0.5);

        gameOver = false;

        this.statusConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (!gameOver) {
                if (p1Score > 200) {

                    this.statusConfig.fontSize = '32px'

                    this.add.text(game.config.width/2, 205, 'You Saved the Kingdom', this.statusConfig).setOrigin(0.5);
                    this.statusConfig.fontSize = '20px'

                    this.add.text(game.config.width/2, game.config.height/2 + 30, 'Press R To Restart', this.statusConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 60, 'Press ESC TO Return To Menu', this.statusConfig).setOrigin(0.5);

                } else if (p1Score <= 200) {

                    this.statusConfig.fontSize = '26px'
                    this.add.text(game.config.width/2, 205, 'The Slimes Invaded the Kingdom', this.statusConfig).setOrigin(0.5);

                    this.statusConfig.fontSize = '20px'
                    this.add.text(game.config.width/2, game.config.height/2 + 30, 'PRESS R TO RESTART', this.statusConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 60, 'PRESS ESC TO RETURN TO MENU', this.statusConfig).setOrigin(0.5);
                }

                gameOver = true;
                if (p1Score > highScore) {
                    highScore = p1Score;
                }
            }
        }, null, this);

        this.statusConfig.fontSize = '26px'

        failText1 = this.add.text(game.config.width / 2 + 20, 205, '', this.statusConfig).setOrigin(0.5);
        this.statusConfig.fontSize = '20px'

        failText2 = this.add.text(game.config.width / 2, game.config.height/2 + 30, '', this.statusConfig).setOrigin(0.5);
        failText3 = this.add.text(game.config.width/2, game.config.height/2 + 60, '', this.statusConfig).setOrigin(0.5);
        
    }

    update() {
        this.cloud.tilePositionX -= 0.5;
        this.river.tilePositionX -= 1.75;
        if (!gameOver) {
            this.timeLeft = ((game.settings.gameTimer - this.clock.getElapsed()) / 1000).toFixed(0);
            this.timeCenter.text = this.timeLeft;
        }

        if (gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            this.scene.start("menuScene");
        }
        
        if (!gameOver) {       
            p1Rocket.update(this.starfield);
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
        }

        if (this.checkCollision(p1Rocket, this.ship1)) {
            p1Rocket.alpha = 0;
            p1Rocket.ammo += 1;
            this.checkAmmo();
            p1Rocket.reset();
            this.ship1.moveSpeed += 0.25;
            this.ammoGain.x = this.ship1.x;
            this.ammoGain.y = this.ship1.y - 60;
            this.ammoGain.text = "+1 FIREBALLS";
            this.shipExplode(this.ship1);
        }

        if (this.checkCollision(p1Rocket, this.ship2)) {
            p1Rocket.alpha = 0;
            p1Rocket.ammo += 2;
            this.checkAmmo();
            p1Rocket.reset();
            this.ship2.moveSpeed += 0.25;
            this.ammoGain.x = this.ship2.x;
            this.ammoGain.y = this.ship2.y - 60;
            this.ammoGain.text = "+2 FIREBALLS";
            this.shipExplode(this.ship2);
        }

        if (this.checkCollision(p1Rocket, this.ship3)) {
            p1Rocket.alpha = 0;
            p1Rocket.ammo += 3;
            this.checkAmmo();
            p1Rocket.reset();
            this.ship3.moveSpeed += 0.25;
            this.ammoGain.x = this.ship3.x;
            this.ammoGain.y = this.ship3.y - 60;
            this.ammoGain.text = "+3 FIREBAll";
            this.shipExplode(this.ship3);
        }
        this.ammoRight.text = p1Rocket.ammo;
    }

    checkCollision(rocket, ship) {
        if (rocket.x > ship.x - 30 &&
            rocket.x < ship.x + ship.width - 30 &&
            rocket.y > ship.y &&
            rocket.y < ship.y + ship.height) {
            ship.alpha = 0;
            return true;
        } else {

            return false;
        }
    }

    checkAmmo() {

        if (p1Rocket.ammo < 1) {
            gameOver = true;
            failText1.text = 'No More Fireballs, The Slimes Invaded'
            failText2.text = 'Press R To Restart'
            failText3.text = 'Press ESC To Retrun To Menu'
            gameOver = true;

            if (p1Score > highScore) {
                highScore = p1Score;
            }
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let particle = this.add.particles('spark');
        particle.createEmitter({
            x: ship.x - 30,
            y: ship.y,
            angle: { min: 0, max: 360 },
            speed: 5000,
            accelerationX: -500,
            accelerationY: -500,
            gravityY: 100,
            lifespan: { min: 10, max: 15},
            blendMode: 'ADD'
        });

        let boom = this.add.sprite(ship.x - 75, ship.y - 50, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
            particle.destroy();
            this.ammoGain.text = "";
        });

        p1Score += ship.points;
        this.scoreLeft.text = p1Score;
        this.sound.play('sfx_explosion');

    }
}