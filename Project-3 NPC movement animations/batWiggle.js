/** @type {HTMLCanvasElement} */ 
// tell vscode this is canvas HTML project and it suggests built-in canvas methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const noOfEnemies = 10;
const enemiesArray = [];

// const enemyImage = new Image();
// enemyImage.src = './enemies/enemy1.png';
let gameFrame = 0;

// enemy1 = {
//     x: 10,
//     y: 50,
//     width: 100,
//     height: 100,
// }

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = './enemies/enemy1.png'
        this.speed = Math.random() * 4 - 2; //  speed b/w -2 and 2
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width); //random x co-ord b/w x and canvas.width for spawn enemy
        this.y = Math.random() * (canvas.height - this.height); //random y co-ord b/w y and canvas.height for spawn enemy
        this.frame = 0; //cycle frames horizontally
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // random b/w 1 & 4
    }
    update(){
        // this.x+= this.speed;
        // this.y+= this.speed;
        this.x += Math.random() * 15 - 7.5; // wiggle motion x-axis
        this.y += Math.random() * 10 - 5; // wiggle motion y-axis
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