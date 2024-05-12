class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}};

        // Create a property inside "sprite" named "bullet".
        // The bullet property has a value which is an array.
        // This array will hold bindings (pointers) to bullet sprites
        this.my.sprite.bullet = [];   
        this.maxBullets = 10;           // Don't create more than this many bullets
        this.bulletCooldown = 3;        // Number of update() calls to wait before making a new bullet
        this.bulletCooldownCounter = 0;
        
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");

    }

    create() {
        this.nextScene = this.input.keyboard.addKey("R");
        this.add.text(200, 250, "Game Over!", {
            fontFamily: 'Times, serif',
            fontSize: 80,
        });

        this.add.text(350, 350, "Press r to restart", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        if(myScore > previousScore){
            myScore = previouScore;
        }
        my.text.score = this.add.bitmapText(580, 0, "rocketSquare", "High Score: " + myScore);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("level1");
        }

    }
}
         