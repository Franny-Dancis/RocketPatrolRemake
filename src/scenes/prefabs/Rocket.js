class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.isFiring = false;
    }

    update() {

        // Shoot
        if(this.isFiring){
            this.y -= this.movementSpeed;
            if(this.y < borderUISize*3){
                this.y = game.config.height - borderUISize - borderPadding;
                this.isFiring = false;
            }
        } else {  
            // Left and Right movement
            if(keyLEFT.isDown){
                this.x -= this.movementSpeed;
            }
            if(keyRIGHT.isDown){
                this.x += this.movementSpeed;
            }

            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.isFiring = true;
            }
            
        }

        // Movement Clamp
        this.x = Phaser.Math.Clamp(this.x, 
            borderUISize + borderPadding, 
            game.config.width - borderUISize - borderPadding);
    }

    reset() {
        this.y = game.config.height-borderUISize-borderPadding
        this.isFiring = false;
    }
}