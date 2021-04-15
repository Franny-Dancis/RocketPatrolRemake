let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play, Instructions],
}


let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Added keyDOWN for instructions
let keyLEFT, keyRIGHT, keyDOWN, keyF, keyR;