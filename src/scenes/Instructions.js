class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    // Very similar to Menu.js, just giving instructions here

    create(){
        // copied menu text config from main
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 100, 'INSTRUCTIONS', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 50, 'Shoot the ENEMY ships', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 50, 'You have 60 seconds' , menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Killing an ENEMY adds 1 second' , menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + 50, 'Hold (F) for the LASER GUN' , menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Tap (F) for the DEFAULT GUN' , menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 100, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // added DOWN key
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }
    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
          spaceshipSpeed: 4,
          gameTimer: 45000    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
    }
}