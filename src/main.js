let config = {

    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    autoCenter: true

}

let game = new Phaser.Game(config);

let borderUISize = 4;
let borderPadding = 0;

let keyF, keyR, keyLEFT, keyRIGHT, keySPACE, keyESCAPE;

let launched = false;

let highScore = 0;
let gameOver = false;

let torpedoFailText1, torpedoFailText2, torpedoFailText3;
let p1Rocket;
let p1Score;