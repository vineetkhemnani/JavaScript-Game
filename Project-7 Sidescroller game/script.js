window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let enemies = [];

    class InputHandler {
        // contain array of input key characters
        // apply eventListeners to the game
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e =>{
        // ES6 arrow function dont bind their own 'this' but they
        // inherit the one from their parent scope, this is called lexical scoping
                if ((   e.key === 'ArrowDown' || 
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' || 
                        e.key === 'ArrowRight') 
                        && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
                // console.log(e.key, this.keys);
            });
            window.addEventListener('keyup', e =>{
            //  key released event handler
            //  find index of key pressed and remove it from keys array
                        if (e.key === 'ArrowDown' || 
                            e.key === 'ArrowUp' ||
                            e.key === 'ArrowLeft' || 
                            e.key === 'ArrowRight')  {
                            this.keys.splice(this.keys.indexOf(e.key), 1);
                        }
                        // console.log(e.key, this.keys);
                    });
        }
    }

    class Player {
        //  gameWidth, gameHeight define game boundaries for player object
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200; // spriteWidth
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById("playerImage");
            this.frameX = 0;
            this.maxFrame = 8;
            this.frameY = 0;
            this.speed = 0; // horizontal speed modifier
            this.vy = 0;
            this.weight = 1;
            this.fps = 20; // how fast we cycle frames in the spriteSheet
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps; // time till each frame lasts
        }
        draw(context){
            // context.fillStyle= 'white';
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime){
            // animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }


        //  controls
            if (input.keys.indexOf('ArrowRight') > -1){
            this.speed = 5;
            } else if(input.keys.indexOf('ArrowLeft') > -1){
            this.speed = -5;
            } else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
            this.vy -= 32; // height of jump modifier
            } else {
            this.speed = 0;
            }

        // horizontal movement
        this.x+= this.speed;
        if (this.x < 0) this.x = 0;
        else if(this.x>this.gameWidth-this.width) this.x = this.gameWidth-this.width;
        // vertical movement
        this.y += this.vy;
        if (!this.onGround()){
            this.vy += this.weight;
            this.maxFrame = 6;
            this.frameY = 1;
        } else {
            this.vy = 0;
            this.maxFrame = 8;
            this.frameY = 0;
        }
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }

        onGround(){
          return this.y >= this.gameHeight - this.height;  
        }
    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 10;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
    }
    
    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20; // how fast we cycle frames in the spriteSheet
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps; // time till each frame lasts
            this.speed = 8;
            this.markedForDeletion = false;

        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(deltaTime){
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.markedForDeletion = true;
        }
    }

    function handleEnemies(deltaTime){
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            // console.log(enemies);
            let randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => enemy.markedForDeletion = false)
    }

    function displayStatusText() {

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    // const enemy1 = new Enemy(canvas.width, canvas.height);

    let lastTime = 0; //hold value of timeStamp from prev animation frame
    let enemyTimer = 0; // reaches a limit triggers something and resets back to zero
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp){
        const deltatTime = timeStamp - lastTime; // deltaTime= how many milliseconds our computer takes to serve one animation frame
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        // background.update();
        player.draw(ctx);
        player.update(input, deltatTime);
        // enemy1.draw(ctx);
        // enemy1.update();
        handleEnemies(deltatTime);
        requestAnimationFrame(animate);
        
    }
    animate(0);
});