class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/wizardFight.png');
        this.load.image('pow', './assets/pow.png');
        this.load.image('slime', './assets/slime.png');
        this.load.image('slame', './assets/slame.png');
        this.load.image('slume', './assets/slume.png');
        this.load.image('cloud', './assets/cloud.png');
        this.load.image('grass', './assets/grass.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('castle', './assets/castle.png');
        this.load.image('mountain', './assets/mountain.png');
        this.load.image('river', './assets/river.png');
        this.load.image('tree', './assets/tree.png');
        this.load.image('trea', './assets/trea.png');
        this.load.image('trei', './assets/trei.png');
        this.load.image('wizardStand', './assets/wizardStand.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.sky = this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.mountain = this.add.image(0, 0, 'mountain').setOrigin(0, 0);
        this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud').setOrigin(0, 0);
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0, 0);
        this.river = this.add.tileSprite(0, 0, 640, 480, 'river').setOrigin(0, 0);
        this.tree = this.add.image(0, 0, 'tree').setOrigin(-5, -7);
        this.trea = this.add.image(0, 0, 'trea').setOrigin(-3, -8);
        this.trei = this.add.image(0, 0, 'trei').setOrigin(-18, -10);
        this.castle = this.add.image(0, 0, 'castle').setOrigin(0, 0);
        this.wizardStand = this.add.image(0, 0, 'wizardStand').setOrigin(0, 0);
        // add rocket (p1)
        this.pow = new Pow(this, game.config.width/2, game.config.height - borderUISize, 'pow').setOrigin(this.wizardStand.PositionX, this.wizardStand.Positiony);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize, 'rocket').setOrigin(0, 0.25);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'slime', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'slume', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'slame', 0, 10).setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
          // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        
       // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        this.cloud.tilePositionX -= 0.5;
        this.river.tilePositionX -= 1.75;
         // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.pow.update();
            this.tree.update();
            this.trea.update();
            this.trei.update();
        }

        // check collisions
        if(this.checkCollision(this.pow, this.ship03)) {
            console.log("pow 3");
            this.pow.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.pow, this.ship02)) {
            console.log("pow 2");
            this.pow.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.pow, this.ship01)) {
            console.log("pow 1");
            this.pow.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.pow, this.tree)) {
            console.log("pow 4");
            this.pow.reset();
            this.shipExplode(this.tree);   
        }
        if (this.checkCollision(this.pow, this.trea)) {
            console.log("pow 5");
            this.pow.reset();
            this.shipExplode(this.trea);
        }
        if (this.checkCollision(this.pow, this.trei)) {
            console.log("pow 6");
            this.pow.reset();
            this.shipExplode(this.trei);
        }
    }

    checkCollision(pow, ship) {
    // simple AABB checking
    if (pow.x < ship.x + ship.width && 
        pow.x + pow.width > ship.x && 
        pow.y < ship.y + ship.height &&
        pow.height + pow.y > ship. y) {
            return true;
    } else {
        return false;
        }
    }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });  
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');    
    }
}