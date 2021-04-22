let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [menu, play],
    autoCenter: true
}

let game = new Phaser.Game(config);

let borderUISize = 4;
let borderPadding = 0;

let keyF, keyR, keyLEFT, keyRIGHT, keyENTER, keyESCAPE;

let launched = false;

let highScore = 0;
let gameOver = false;

let failText1, failText2, failText3;
let p1Rocket;
let p1Score;