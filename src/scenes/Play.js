class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("paperBackground", "./assets/paperBackground.png");
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        
        // Mouse controls
        this.input.on('pointermove', function (pointer) {
            this.p1Rocket.x = pointer.x
        }, this);

        this.input.on('pointerdown', function (pointer) {
            this.p1Rocket.isFiring = true
            this.p1Rocket.sfxRocket.play()
        }, this);

        // set variables for easy access to audio later
        let explosion1 = this.sound.add('explosionSound1');
        let explosion2 = this.sound.add('explosionSound2');
        let explosion3 = this.sound.add('explosionSound3');
        let explosion4 = this.sound.add('explosionSound4');

        // play music
        let backgroundMusic = this.sound.add('bgMusic');
        backgroundMusic.play()

        // paperBackground
        this.paperBackground = this.add.tileSprite(
            0,0,640,480, 'paperBackground', 
        ).setOrigin(0,0);

        // rocket objects
        this.p1Rocket = new Rocket(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        );

        // spaceship objects
        this.ship1 = new Ship(
            this,
            100,
            200,
            'spaceship'
        )
        
        // spaceship objects
        this.ship2 = new Ship(
            this,
            300,
            240,
            'spaceship'
        )
         // spaceship objects
        this.ship3 = new Ship(
            this,
            380,
            150,
            'spaceship'
        )

        // green UI background
        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width, 
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
    
        // keyboard input
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
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
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
    }    

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.paperBackground.tilePositionX += 4;

        this.p1Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship1.update();           // update spaceships (x3)
            this.ship2.update();
            this.ship3.update();
        } 
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        // had to use example code because lecture code was bugged here
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
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
        boom.on('animationcomplete', () => {    // callback after ani completes
          ship.reset();                       // reset ship position
          ship.alpha = 1;                     // make ship visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += 1;
        this.scoreLeft.text = this.p1Score;       
        // randomize explosion sound
        this.sound.play(Phaser.Math.RND.pick(['explosionSound1', 'explosionSound2', 'explosionSound3', 'explosionSound4']));
        this.clock += 1000;  
    } 

    // Added speed up mechanic
    speedUpShips(){
        if (this.clock = 3000) {
            game.settings = {
                spaceshipSpeed: 5
            }
        }
    }
}
