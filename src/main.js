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

let keyF, keyR, keyLEFT, keyRIGHT, keyENTER, keyESCAPE;

let launched = false;

let highScore = 0;
let gameOver = false;

let failText1, failText2, failText3;
let p1Rocket;
let p1Score;






console.log("Alvaro Perez");
console.log("Rocket Patrol Mod: Slime Invasion");
console.log("4/19/2021");
console.log("Estmated working time: 15 hours");

console.log("Score Breakdown:");
console.log("Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)");
console.log("Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)");
console.log("Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) ");
console.log("Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20)");
console.log("Display the time remaining (in seconds) on the screen (10)");
console.log("Create a new title screen (e.g., new artwork, typography, layout) (10)");

console.log("Citation:");
console.log("https://freesound.org/people/broumbroum/sounds/50561/");
console.log("https://freesound.org/people/j1987/sounds/335745/");
console.log("https://freesound.org/people/zgump/sounds/86330/");
console.log("https://freesound.org/people/renatalmar/sounds/264981/");
console.log("https://jsfiddle.net/munibmir/mqcs47w9/1/");
console.log("https://phaser.io/examples/v3/view/physics/arcade/bullets-group");
