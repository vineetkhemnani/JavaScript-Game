/** @type {HTMLCanvasElement} */ 
// tell vscode this is canvas HTML project and it suggests built-in canvas methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const noOfEnemies = 8;
const enemiesArray = [];

// const enemyImage = new Image();
// enemyImage.src = './enemies/enemy1.png';
let gameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = './enemies/enemy4.png'
        this.speed = Math.random() * 4 + 1; //  speed b/w -2 and 2
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2.5; //width of enemy
        this.height = this.spriteHeight / 2.5; //height of enemy
        this.x = Math.random() * (canvas.width - this.width); //random x co-ord b/w x and canvas.width for spawn enemy
        this.y = Math.random() * (canvas.height - this.height); //random y co-ord b/w y and canvas.height for spawn enemy
        this.newX = Math.random() * (canvas.width - this.width); //random x co-ord b/w x and canvas.width for spawn enemy
        this.newY = Math.random() * (canvas.height - this.height); //random y co-ord b/w y and canvas.height for spawn enemy
        this.frame = 0; //cycle frames horizontally
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // random b/w 1 & 4
        this.interval = Math.floor(Math.random() * 200 + 50);
        //each character resets at a random interval
        // wrapped in Math.floor to take only integer values as gameFrame also integer
    }
    update(){
        if(gameFrame % this.interval === 0){
            //every 30 frames
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height); 
        }
        let dx = this.x - this.newX; // distance on x axis b/w x and newX
        let dy = this.y - this.newY; // distance on y axis b/w y and newY
        this.x -= dx/70;
        this.y -= dy/70;

        if(this.x + this.width < 0) this.x = canvas.width;
        // if(x + widthofObject < 0)-> object disappears place it at right corner of canvas
        // animate sprites
        if(gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

for(let i = 0; i < noOfEnemies;i++){
    enemiesArray.push(new Enemy());
}
console.log(enemiesArray);
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
   
    enemiesArray.forEach(enemy=>{
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();