/** @type {HTMLCanvasElement} */ 
window.addEventListener('load', function(){
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 800;

class Game {
    constructor(ctx, width, height){
        // convert global properties to class properties
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 1000; // interval after which enemies will be generated
        this.enemyTimer = 0; // enemy reset timer
        // console.log(this.enemies);
    }
    update(deltaTime){ //updating entire game
        this.enemies = this.enemies.filter(object => !object.markedForDeletion);
        if(this.enemyTimer > this.enemyInterval){
            this.#addNewEnemy();
            this.enemyTimer = 0;
            console.log(this.enemies);
        }else{
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach(object => object.update(deltaTime)); // run forEach loop for each object in the array

    }
    draw(){
        this.enemies.forEach(object => object.draw(this.ctx)); // calling draw method forEach object in the enemies array

    }
    #addNewEnemy(){ //#-> private member method
    // called everytime whenever a new enemy is created in the game
        this.enemies.push(new Worm(this)); // constructor call to create a new object
    }
}

class Enemy {
    constructor(game){
        // constructor(game) -> access to game object inside enemy class
        this.game = game;
        // console.log(game);
        
        this.markedForDeletion = false;

    }
    update(deltaTime){ //updating enemies
        this.x-= this.vx * deltaTime;
        // remove enemies
        if(this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(ctx){
        // ctx in draw method calls the Game class ctx to work on
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Worm extends Enemy {
    constructor(hame){
        super(game);
        this.spriteWidth = 229; // width of each frame of spriteSheet
        this.spriteHeight = 171; // height of each frame of spriteSheet
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = this.game.width; //starting co-ordinates of enemies
        this.y = Math.random() * this.game.height;
        this.image = worm; // elements in DOM with an id attribute are automatically added to the script as global variables
        // it means that we can access any html elements from javascript using its id
        // console.log(worm);
        this.vx = Math.random() * 0.1 + 0.1; // velocity at x
    }
}

const game = new Game(ctx, canvas.width, canvas.height);
let lastTime = 1;
function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    // time between current loop timestamp and previous loop timestamp
    //lastTime holds timeStamp from previous loop
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    // console.log(deltaTime);
    requestAnimationFrame(animate); 
    // requestAnimationFrame() passes an automatic timestamp
    // it passes an automatic timestamp to animate each time it runs
}
animate(0);
});