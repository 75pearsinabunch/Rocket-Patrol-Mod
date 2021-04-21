class Menu extends Phaser.Scene {

    constructor() {

        super("menuScene") 

    }

    preload() {

        this.load.image('splash', './assets_custom/homescreen.png');
        this.load.audio('sfx_select', './assets_custom/select.wav');
        this.load.audio('toggle', './assets_custom/toggle.wav');
        this.load.audio('sfx_explosion', './assets_custom/explosion.wav');
        this.load.audio('sfx_torpedo', './assets_custom/fire.wav');
        this.load.audio('theme', './assets_custom/spacetheme.mp3');
        this.load.image('rocket', './assets/pow.png');
        this.load.image('enterprise', './assets/wizardFight.png');
        this.load.image('spaceship', './assets/slime.png');

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

        this.add.text(game.config.width / 2, game.config.height / 2 + 52, 'PRESS SPACE TO CONTINUE!', menuConfig).setOrigin(0.5);
        menuConfig.color = '#FFFFFF';

        menuConfig.fontSize = '22px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 100, 'DIFFICULTY:', menuConfig).setOrigin(0.5);
        
        // toggleable difficulty UI

        this.difficulty = true;
        
        menuConfig.color = '#FFFFFF'

        menuConfig.fontSize = 28;
        this.difficultySettingEasy = this.add.text(game.config.width / 2 - 45, game.config.height / 2 + borderUISize + borderPadding + 127, 'EASY', menuConfig).setOrigin(0.5);
        menuConfig.color = '#FFFFFF'
  
        this.difficultySettingHard = this.add.text(game.config.width / 2 + 45, game.config.height / 2 + borderUISize + borderPadding + 127, 'hard', menuConfig).setOrigin(0.5);

        menuConfig.color = '#FFFFFF'

        menuConfig.fontSize = 15;
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding + 155, 'HIT F TO TOGGLE', menuConfig).setOrigin(0.5);

        // high score

        menuConfig.fontSize = '16px';
        menuConfig.color = '#FFFFFF'

        this.add.text(65, 35, 'HI-SCORE:', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '36px';
        this.highScoreText = this.add.text(65, 65, highScore, menuConfig).setOrigin(0.5);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        game.settings = {

          spaceshipSpeed: 2,
          gameTimer: 60000,
          ammoCount: 2  

        }

    }

    update() {

        // difficulty toggle logic

        if (Phaser.Input.Keyboard.JustDown(keyF)) {

          this.sound.play('toggle');

          if (!this.difficulty) {

            game.settings = {

              spaceshipSpeed: 2.5,
              gameTimer: 60000,
              ammoCount: 2 

            };

            // change visuals

            this.difficultySettingEasy.style.color = '#FFFFFF';

            this.difficultySettingHard.style.color = '#FFFFFF';

            this.difficultySettingHard.text = "hard";
            this.difficultySettingEasy.text = "EASY";
            this.difficulty = !this.difficulty;

          } else {

            game.settings = {

              spaceshipSpeed: 3.5,
              gameTimer: 45000,
              ammoCount: 10   

            };

            // change visuals
            
            this.difficultySettingHard.style.color = '#FFFFFF';
            
            this.difficultySettingEasy.style.color = '#FFFFFF';

            this.difficultySettingHard.text = "HARD";
            this.difficultySettingEasy.text = "easy";
            this.difficulty = !this.difficulty;
          }
        }
        this.highScoreText.text = highScore;
        // game start logic
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.sound.play('sfx_select');
          this.scene.start("playScene");  

        }

    }

}