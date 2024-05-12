class Level3 extends Phaser.Scene {
    constructor() {
        super("level3");
       
        this.my = {sprite: {}, text: {}};

       
        this.my.sprite.bullet = [];   
        this.maxBullets = 10;          
        
        this.fireClock = 0; 
        this.end = false; 
        this.rabbitFireCount = 0; 
        this.my.sprite.rabbitFire = [];
        this.delayCount = 0;
        this.collisionCheck = false;
    }

    preload() {
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("playerSprites", "sheet.png", "sheet.xml");
        this.load.atlasXML("jumperSprites", "spritesheet_jumper.png", "spritesheet_jumper.xml");
        this.load.atlasXML("spaceshipSprites", "spritesheet_spaceships.png", "spritesheet_spaceships.xml");
        this.load.atlasXML("laserSprites", "spritesheet_lasers.png", "spritesheet_lasers.xml");

        //new assets
        // this.group
        // this.load.image("playerShip", "playerShip1_red.png");
        // this.load.image("rabbitShip", "bunny1_stand.png");
        // this.load.image("rabbitShip", "shipPink.png");
        // this.load.image("rabbitDome", "dome.png");

        // //old assets 
        // this.load.image("playerShip", "playerShip.png");
        //this.load.image("heart", "heart.png");
        // this.load.image("rabbitShip", "rabbitShip.png");

        // For animation
        // this.load.image("fire00", "fire00.png");
        // this.load.image("fire01", "fire01.png");
        // this.load.image("fire02", "fire02.png");
        // this.load.image("fire03", "fire03.png");


        this.load.image("whitePuff00", "whitePuff00.png");
        this.load.image("whitePuff01", "whitePuff01.png");
        this.load.image("whitePuff02", "whitePuff02.png");
        this.load.image("whitePuff03", "whitePuff03.png");

        
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");

        this.load.audio("pew", "laserSmall_001.ogg");
        this.load.audio("boom", "explosionCrunch_000.ogg");
    }
    
    create() {
        let my = this.my;
       
        my.sprite.playerShip = this.add.sprite(game.config.width/2, game.config.height - 40, "playerSprites", "playerShip1_red.png");
        //my.sprite.rabbitShip = this.add.sprite(0, 0, "spaceshipSprites", "shipPink.png");

        //my.sprite.playerShip.setScale(0.5);
        //let rabbitShip = this.rabbitShip; 
        // this.rabbitShip = this.add.group();
        // this.rabbitShip.create(game.config.width/2, 130, "spaceshipSprites", "shipPink.png");
        // this.rabbitShip.create(game.config.width/2, 80, "jumperSprites", "bunny1_stand.png");
        // this.rabbitShip.getChildren()[1].setScale(0.25);
        // this.rabbitShip.create(game.config.width/2, 80, "spaceshipSprites", "dome.png");

        // my.sprite.rabbitShip = this.add.sprite(game.config.width/2, 130, "spaceshipSprites", "shipPink.png");
        
        // my.sprite.rabbitShip = this.add.sprite(game.config.width/2, 80, "jumperSprites", "bunny1_stand.png");
        // my.sprite.rabbitShip.setScale(0.25);
        // my.sprite.rabbitShip = this.add.sprite(game.config.width/2, 80, "spaceshipSprites", "dome.png");
        


        this.currentPoints = [];
       

        this.points = [
            0, 114,
            88, 117,
            154, 81,
            160, 47,
            96, 41,
            74, 90,
            120, 166,
            324, 251,
            540, 271,
            585, 189,
            489, 119,
            315, 141,
            212, 234,
            224, 307,
            341, 401,
            596, 438,
            751, 352,
            735, 278,
            610, 320,
            588, 408,
            652, 478,
            723, 519,
            877, 524,
            979, 462,
            991, 455,
            996, 451
            
        ];

        // this.bunnyPoints = [
        //     800, 400,
        //     700, 300, 
        //     500, 200,
        //     300, 300,
        //     100, 200,
        //     0, 100
        // ];

        this.curve = new Phaser.Curves.Spline(this.points);
        this.runMode = false; 
        my.sprite.rabbitShip = this.add.follower(this.curve, 400, 300, "spaceshipSprites", "shipPink.png");
        my.sprite.rabbit = this.add.follower(this.curve, 400, 250, "jumperSprites", "bunny1_stand.png");
        my.sprite.rabbit.setScale(0.25);
        my.sprite.dome = this.add.follower(this.curve, 400, 240, "spaceshipSprites", "dome.png");
        

        this.rabbitEnemy = this.add.group();
        this.rabbitEnemy.add(my.sprite.rabbitShip);
        this.rabbitEnemy.add(my.sprite.rabbit);
        this.rabbitEnemy.add(my.sprite.dome);
        my.sprite.rabbitShip.visible = true;

        this.rabbitEnemy.alive = true; 

        my.sprite.rabbitShip.scorePoints = 25; 

        // my.sprite.bunnyShip = this.add.follower(this.curve, 400, 300, "spaceshipSprites", "shipGreen.png");
        // my.sprite.bunny = this.add.follower(this.curve, 400, 250, "jumperSprites", "bunny2_stand.png");
        // my.sprite.bunny.setScale(0.25);
        // my.sprite.dome2 = this.add.follower(this.curve, 400, 240, "spaceshipSprites", "dome.png");
        

        // this.bunnyEnemy = this.add.group();
        // this.bunnyEnemy.add(my.sprite.bunnyShip);
        // this.bunnyEnemy.add(my.sprite.bunny);
        // this.bunnyEnemy.add(my.sprite.dome);
        // my.sprite.bunnyShip.visible = true;

        // this.bunnyEnemy.alive = true; 

        // my.sprite.bunnyShip.scorePoints = 10; 

        

        my.sprite.beam = this.add.sprite(-100, -100, "laserSprites", "laserYellow2.png");
        my.sprite.beam.setScale(0.8)
        my.sprite.beam.flipY = true;
        my.sprite.beam.visible = false;

        my.sprite.captureEffect = this.add.sprite(400, 300, "laserSprites", "laserYellow_burst.png");
        my.sprite.captureEffect.setScale(0.5);
        my.sprite.captureEffect.visible = false;

        //let gameObjects = [my.sprite.playerSprite, this.rabbitEnemy, my.sprite.beam, my.sprite.captureEffect];

        // Notice that in this approach, we don't create any bullet sprites in create(),
        // and instead wait until we need them, based on the number of space bar presses

        // Create white puff animation
        this.anims.create({
            key: "puff",
            frames: [
                { key: "whitePuff00" },
                { key: "whitePuff01" },
                { key: "whitePuff02" },
                { key: "whitePuff03" },
            ],
            frameRate: 20,    // Note: case sensitive (thank you Ivy!)
            repeat: 5,
            hideOnComplete: true
        });

        // Create key objects
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.capture = this.input.keyboard.addKey("J");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set movement speeds (in pixels/tick)
        this.playerSpeed = 5;
        this.bulletSpeed = 5;

        

        // Put score on screen
        my.text.score = this.add.bitmapText(580, 0, "rocketSquare", "Score " + myScore);

        // Put title on screen
        this.add.text(10, 5, "Save the Rabbits!", {
            fontFamily: 'Times, serif',
            fontSize: 24,
            wordWrap: {
                width: 100
            }
        });



        if(this.points.length > 0){
            console.log(this.points)
            this.rabbitEnemy.getChildren().forEach(child =>{    
                child.x = this.curve.points[0].x;
                child.y = this.curve.points[0].y;
                child.visible = true;
            });
            let obj = {
                    from: 0,
                    to: 1,
                    delay: 0,
                    duration: 2000,
                    ease: 'Sine.easeInOut',
                    repeat: -1,
                    yoyo: false,
                    rotateToPath: false,
                    rotationOffset: -90
            }
            this.rabbitEnemy.getChildren().forEach(child =>{
                console.log(this.points)
                child.startFollow(obj, 0);
                if(child = my.sprite.rabbit){
                    child.y -= 50;
                }
                if(child = my.sprite.dome){
                    child.y -= 30;
                }
                
                this.rabbitFireCount += 1;
            }); 
        }
        

        

    }

    update() {
        let my = this.my;
        
        
        this.fireClock+=1; 

        // if(this.firefireClock == 200){
            
        // this.runMode = true; 
        // if(this.points.length > 0){
        //     my.sprite.rabbitShip.x = this.curve.points[0].x;
        //     my.sprite.rabbitShip.y = this.curve.points[0].y;
        //     my.sprite.rabbitShip.visible = true;
        //     let obj = {
        //             from: 0,
        //             to: 1,
        //             delay: 0,
        //             duration: 2000,
        //             ease: 'Sine.easeInOut',
        //             repeat: -1,
        //             yoyo: true,
        //             rotateToPath: false,
        //             rotationOffset: -90
        //     }
        //     my.sprite.rabbitShip.startFollow(obj, 0);
        // }


            
        //     this.firefireClock = 0; 
        // }

        
        // Moving left
        if (this.left.isDown) {
            // Check to make sure the sprite can actually move left
            if (my.sprite.playerShip.x > (my.sprite.playerShip.displayWidth/2)) {
                my.sprite.playerShip.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (my.sprite.playerShip.x < (game.config.width - (my.sprite.playerShip.displayWidth/2))) {
                my.sprite.playerShip.x += this.playerSpeed;
            }
        }

        // Check for bullet being fired
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            // Are we under our bullet quota?
            if (my.sprite.bullet.length < this.maxBullets) {
                this.sound.play("pew", {
                    volume: 1 
                });
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.playerShip.x, my.sprite.playerShip.y-(my.sprite.playerShip.displayHeight/2), "playerSprites", "laserBlue01.png")
                );
            }
        }

        //Check for capture beam 
        if(this.capture.isDown){
            my.sprite.beam.visible = true;
            my.sprite.beam.x = my.sprite.playerShip.x;
            my.sprite.beam.y = 470;
        }else{
            my.sprite.beam.visible = false;
        }
        

        this.delayCount++;
        if (this.rabbitFireCount >= 1 && this.fireClock == 10) {
            my.sprite.rabbitFire.push(this.add.sprite(
                my.sprite.rabbitShip.x, my.sprite.rabbitShip.y+(my.sprite.rabbitShip.displayHeight/2), "jumperSprites", "lighting_yellow.png").setScale(0.6)
            ); 
            this.fireClock = 0; 
        }

        
        // Make all of the bullets move
        for (let bullet of my.sprite.rabbitFire) {
                bullet.y += this.bulletSpeed;     
        }


        // Remove all of the bullets which are offscreen
        // filter() goes through all of the elements of the array, and
        // only returns those which **pass** the provided test (conditional)
        // In this case, the condition is, is the y value of the bullet
        // greater than zero minus half the display height of the bullet? 
        // (i.e., is the bullet fully offscreen to the top?)
        // We store the array returned from filter() back into the bullet
        // array, overwriting it. 
        // This does have the impact of re-creating the bullet array on every 
        // update() call. 
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

        // Check for collision with the rabbitShip
        for (let bullet of my.sprite.bullet) {
            if (this.collides(my.sprite.rabbitShip, bullet)) {
                // start animation
                this.puff = this.add.sprite(my.sprite.rabbitShip.x, my.sprite.rabbitShip.y, "whitePuff03").setScale(0.25).play("puff");
                // clear out bullet -- put y offscreen, will get reaped next update
                bullet.y = -100;
                // my.sprite.rabbitShip.setVisible(false);
                // my.sprite.dome.setVisible(false);
                // my.sprite.rabbit.setVisible(false);
                //my.sprite.rabbitShip.x = -100;
                // Update score
                myScore += my.sprite.rabbitShip.scorePoints;
                this.updateScore();
                // Play sound
                this.sound.play("boom", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
                // Have new rabbitShip appear after end of animation
                this.rabbitEnemy.getChildren().forEach(child =>{
                    child.stopFollow();  
                    child.setVisible(false);
                    if(child != my.sprite.rabbit){
                        child.x = -100;
                        child.y = -100;
                    }    
                    
                });
                this.puff.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    my.sprite.rabbit.x = this.puff.x;
                    my.sprite.rabbit.y = this.puff.y;
                    //my.sprite.rabbit.setVisible(true);
                    this.collisionCheck = true; 
                }, this);
                this.rabbitEnemy.alive = false; 
                // my.sprite.rabbit.y += 1000; 
                // console.log("after animation: ", my.sprite.rabbit.y);
                
            }
        }
        
        //make rabbit fall after ship destroyed
        if(this.collisionCheck == true){
            my.sprite.rabbit.setVisible(true)
            //console.log(my.sprite.rabbit.x);
            my.sprite.rabbit.setTexture("jumperSprites", "bunny1_hurt.png");
            my.sprite.rabbit.y += 3;
            
        }        


        if(this.rabbitEnemy.alive == false){
            this.rabbitEnemy.getChildren().forEach(child =>{
                if(child != my.sprite.rabbit){
                    child.x = -100;
                    child.y = -100;
                }
            }); 
        }
        

        if(this.collides(my.sprite.beam, my.sprite.rabbit) && this.collisionCheck == true){
            my.sprite.captureEffect.x = my.sprite.rabbit.x;
            my.sprite.captureEffect.y = my.sprite.rabbit.y;
            myScore += 1;
            this.updateScore();
            console.log(myScore);
            my.sprite.rabbit.setVisible(false);
            my.sprite.captureEffect.setVisible(true);
            if(my.sprite.rabbit.y >= 490){
                my.sprite.rabbit.x = -100;
                my.sprite.rabbit.y = -100;
            }

        }else{
            my.sprite.captureEffect.x = -100;
            my.sprite.captureEffect.y = -100;
            my.sprite.captureEffect.setVisible(false);
        }
        
        for (let fire of my.sprite.rabbitFire) {
            if(this.collides(my.sprite.playerShip, fire)){
                this.scene.start("gameOver")
            }
        }

        // Make all of the bullets move
        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
        }

        if(my.sprite.rabbit.y > 600){
            this.scene.start("level1");
        }
        // if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
        //     this.scene.start("fixedArrayBullet");
        // }

    }



    // A center-radius AABB collision check
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    updateScore() {
        let my = this.my;
        my.text.score.setText("Score " + myScore);
    }

}
         