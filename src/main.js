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
let keyLEFT, keyRIGHT, keyDOWN, keyF, keyR, keyP;

/*
Name : Dany Francis
Project Title: Rocket Patrol Mod
Date: 4/18/2021
Estimated Time to Complete: 11 Hours
*/

////////////////////////////////////////////////

/*        POINT BREAKDOWN       \
/                               \
/      4 NEW SFX = 10 POINTS    \
/ HIGH SCORE TRACKING = 5 POINTS\
/ MOUSE CONTROLS = 20 POINTS    \
/ NEW BACKGROUND = 5 POINTS     \
/ ADD TIME MECHANIC = 20 POINTS \
/ MY MUSIC = 5 POINTS           \
/ CONTROL ROCKET AFTER FIRING = 5 POINTS     \
/ INSTRUCTIONS SCREEN = HOPEFULLY SOME POINTS \
*/