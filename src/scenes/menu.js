class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene") 
    }

    preload() {
        this.load.image('splash', './assets/homescreen.png');
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('toggle', './assets/toggle.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
        this.load.audio('sfx_torpedo', './assets/fire.wav');
        this.load.audio('theme', './assets/spacetheme.mp3');
        this.load.image('rocket', './assets/pow.png');
        this.load.image('wizard', './assets/wizardFight.png');
        this.load.image('slime', './assets/slime.png');
    }

    create() {
        // MUSIC
        if (launched == false) {
          let music = this.sound.add('theme');
          music.volume = 0.05;
          music.loop = true;
          music.play();
          launched = true;
        }

        // homescreen
        this.add.image(0, 0, 'splash').setOrigin(0, 0);

        // NEW UI
        let menuConfig = {
          fontSize: '30px',
          color: '#FFFFFF',
          align: 'left',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 0
        };

        //Menu Text
        this.add.text(game.config.width / 2, 160, 'Slime Invasion', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 360, 'Press ENTER To Continue', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '22px';
        this.add.text(game.config.width/2, 390, 'Difficulty:', menuConfig).setOrigin(0.5);
        
        // toggleable difficulty UI
        this.difficulty = true;
        menuConfig.fontSize = 28;
        this.difficultySettingEasy = this.add.text(game.config.width / 2 - 45, 420, 'EASY', menuConfig).setOrigin(0.5);
        this.difficultySettingHard = this.add.text(game.config.width / 2 + 45, 420, 'hard', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = 15;
        this.add.text(game.config.width / 2, 450, 'Press F To Toggle', menuConfig).setOrigin(0.5);

        // high score
        menuConfig.fontSize = '16px';
        this.add.text(65, 35, 'HI-SCORE:', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '36px';
        this.highScoreText = this.add.text(125, 35, highScore, menuConfig).setOrigin(0.5);

        //inputs setting
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //default game setting: use for debugging 
        game.settings = {
          spaceshipSpeed: 2,
          gameTimer: 60000,
          ammoCount: 20  
        }
    }

    update() {
        // difficulty toggle logic
        //easy mode
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
          this.sound.play('toggle');
          if (!this.difficulty) {
            game.settings = {
              spaceshipSpeed: 2.5,
              gameTimer: 60000,
              ammoCount: 20 
            };
            this.difficultySettingHard.text = "hard";
            this.difficultySettingEasy.text = "EASY";
            this.difficulty = !this.difficulty;
          } else {
            //hard mode
            game.settings = {
              spaceshipSpeed: 3.5,
              gameTimer: 45000,
              ammoCount: 10   
            };
            this.difficultySettingHard.text = "HARD";
            this.difficultySettingEasy.text = "easy";
            this.difficulty = !this.difficulty;
          }
        }
        this.highScoreText.text = highScore;

        // game start logic
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
          this.sound.play('sfx_select');
          this.scene.start("playScene");  
        }
    }
}