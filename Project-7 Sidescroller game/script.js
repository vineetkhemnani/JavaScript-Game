window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;
    const fullScreenButton = document.getElementById('fullScreenButton');

    class InputHandler {
        // contain array of input key characters
        // apply eventListeners to the game
        constructor(){
            this.keys = [];
            this.touchY = ''; // starting vertical co-ordinate of touch
            this.touchTreshold = 30;
            window.addEventListener('keydown', e =>{
        // ES6 arrow function dont bind their own 'this' but they
        // inherit the one from their parent scope, this is called lexical scoping
                if ((   e.key === 'ArrowDown' || 
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' || 
                        e.key === 'ArrowRight') 
                        && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                } else if (e.key === 'Enter' && gameOver) restartGame();
                // if Enter key pressed game restarts
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
            window.addEventListener('touchstart', e =>{
                // console.log(e.changedTouches[0].pageY);
                this.touchY = e.changedTouches[0].pageY;

            });
            window.addEventListener('touchmove', e =>{
                // console.log(e.changedTouches[0].pageY);
                const swipeDistance = e.changedTouches[0].pageY - this.touchY;
                if (swipeDistance < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
                else if (swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1) 
                {
                    this.keys.push('swipe down');
                    if(gameOver) restartGame();
                }
            });

            window.addEventListener('touchend', e =>{
                // console.log(e.changedTouches[0].pageY);
                // console.log(this.keys);
                this.keys.splice(this.keys.indexOf('swipe up'), 1);
                this.keys.splice(this.keys.indexOf('swipe down'), 1);

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
            this.x = 100;
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
        restart(){
            // initialize player to original starting position
            this.x = 100;
            this.y = this.gameHeight - this.height;
            this.maxFrame = 8;
            this.frameY = 0;
        }
        draw(context){
            // context.lineWidth = 5;
            // context.strokeStyle='white';
            // // context.strokeRect(this.x, this.y, this.width, this.height);
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2 + 20, this.width/3, 0, Math.PI * 2);
            // context.stroke();
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            // context.strokeStyle='blue';
            // context.beginPath();
            // context.arc(this.x, this.y, this.width/2, 0, Math.PI * 2);
            // context.stroke();
        }
        update(input, deltaTime, enemies){
            // collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width/2 - 20) - (this.x + this.width/2);
                const dy = (enemy.y + enemy.height/2) - (this.y + this.height/2 + 20);
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < enemy.width/3 + this.width/3){
                    gameOver = true;
                }
            });

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
            } else if((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1) && this.onGround()){
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
        restart(){
            this.x = 0;
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
            // context.lineWidth = 5;
            // context.strokeStyle='white';
            // // context.strokeRect(this.x, this.y, this.width, this.height);
            // context.beginPath();
            // context.arc(this.x + this.width/2 - 20, this.y + this.height/2, this.width/3, 0, Math.PI * 2);
            // context.stroke();
            // we were not checking collision detection for white circles but for blue circles
            // context.strokeStyle='blue';
            // context.beginPath();
            // context.arc(this.x, this.y, this.width/2, 0, Math.PI * 2);
            // context.stroke();
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
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
            score++;
        }
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
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);
    }

    function displayStatusText(context) {
        context.textAlign = 'left';
        context.fillStyle = 'black';
        context.font = '40px Helvetica';
        // fillText() - text we want to draw +x and y co-ordinates
        context.fillText('Score: '+ score, 20, 50);
        context.fillStyle = 'white';
        context.font = '40px Helvetica';
        context.fillText('Score: '+ score, 20, 52);
        if (gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'black';
            // context.font = '40px Helvetica';
            context.fillText('GAME OVER, press Enter or swipe down to restart! ', canvas.width/2, canvas.height/2);
            context.fillStyle = 'white';
            // context.font = '40px Helvetica';
            context.fillText('GAME OVER, press Enter or swipe down to restart! ', canvas.width/2 + 2, canvas.height/2);
        }
    }

    function restartGame(){
        player.restart();
        background.restart();
        enemies = [];
        score = 0;
        gameOver = false;
        animate(0);
    }

    function toggleFullScreen(){
        console.log(document.fullscreenElement);
        // document.fullscreenElement- built in read only property on document object
        // that returns the element that is currently being presented in full screen mode
        // if its null it means full screen is not active
        if (!document.fullscreenElement){
            canvas.requestFullscreen().catch(err =>{
                alert(`Error, Cant enable full screen mode: ${err.message}`); //template literal
            });
        } else {
            document.exitFullscreen();
        }
    }
    fullScreenButton.addEventListener('click', toggleFullScreen);

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
        background.update();
        player.draw(ctx);
        player.update(input, deltatTime, enemies);
        // enemy1.draw(ctx);
        // enemy1.update();
        handleEnemies(deltatTime);
        displayStatusText(ctx);
        if (!gameOver) requestAnimationFrame(animate);
        
    }
    animate(0);
});