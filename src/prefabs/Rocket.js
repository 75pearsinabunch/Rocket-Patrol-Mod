class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, ship, ammoCount) {

        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 3.5;
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_torpedo');
        this.sfxRocket.volume = 0.5;
        this.ship = ship;
        this.shipX = this.x;
        this.alpha = 0;
        this.ammo = ammoCount;

    }

    update() {
        if (this.isFiring) {
            this.y -= this.movementSpeed * 5 / 3.5;
            this.alpha = 1;
            if(this.y < borderUISize * 1.5) {
                this.reset();
                this.alpha = 0;
            }
        }
        if (keyLEFT.isDown) {
            this.shipX -= this.movementSpeed;
            if (!this.isFiring) {
                this.x -= this.movementSpeed;
                this.x = this.shipX;
            }
        }
        if (keyRIGHT.isDown) {
            this.shipX += this.movementSpeed;
            if (!this.isFiring) {
                this.x += this.movementSpeed;
                this.x = this.shipX;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring && this.ammo > 0) {
            this.x = this.shipX;
            this.isFiring = true;
            this.sfxRocket.play();
            this.ammo -= 1;
        }
        this.x = Phaser.Math.Clamp(this.x, borderUISize + borderPadding + 30, game.config.width - borderUISize - borderPadding - 30);
        this.shipX = Phaser.Math.Clamp(this.shipX, borderUISize + borderPadding + 30, game.config.width - borderUISize - borderPadding - 30);
        this.ship.x = this.shipX - 17;
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding - 75;
        this.isFiring = false;
        if (p1Rocket.ammo < 1) {
            gameOver = true;
            torpedoFailText1.text = 'TORPEDOES EXPENDED, MISSION FAILED'
            torpedoFailText2.text = 'PRESS R TO RESTART'
            torpedoFailText3.text = 'PRESS ESC TO RETURN TO MENU'
            gameOver = true;
            if (p1Score > highScore) {
                highScore = p1Score;
            }
        }
    }

}