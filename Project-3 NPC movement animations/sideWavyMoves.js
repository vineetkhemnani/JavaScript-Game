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
        this.image.src = './enemies/enemy2.png'
        this.speed = Math.random() * 4 + 1; //  speed b/w -2 and 2
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width); //random x co-ord b/w x and canvas.width for spawn enemy
        this.y = Math.random() * (canvas.height - this.height); //random y co-ord b/w y and canvas.height for spawn enemy
        this.frame = 0; //cycle frames horizontally
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // random b/w 1 & 4
        this.angle = 0; // angle of sine wave
        this.angleSpeed = Math.random() * 0.2; //how fast the angle increases
        this.curve = Math.random() * 7; // prominence of movement/depth of movement
    }
    update(){
        this.x-= this.speed; // enemy move towards left
        this.y+= this.curve * Math.sin(this.angle); // sine wave movement along y-axis(values b/w 0 & 1)
        this.angle += this.angleSpeed;
        // this.x += Math.random() * 15 - 7.5; // wiggle motion x-axis
        // this.y += Math.random() * 10 - 5; // wiggle motion y-axis
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