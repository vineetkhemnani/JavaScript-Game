/** @type {HTMLCanvasElement} */ 
// tell vscode this is canvas HTML project and it suggests built-in canvas methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const noOfEnemies = 20;
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
        this.image.src = './enemies/enemy3.png'
        this.speed = Math.random() * 4 + 1; //  speed b/w -2 and 2
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5; //width of enemy
        this.height = this.spriteHeight / 2.5; //height of enemy
        this.x = Math.random() * (canvas.width - this.width); //random x co-ord b/w x and canvas.width for spawn enemy
        this.y = Math.random() * (canvas.height - this.height); //random y co-ord b/w y and canvas.height for spawn enemy
        this.frame = 0; //cycle frames horizontally
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // random b/w 1 & 4
        this.angle = Math.random() * 500; // angle of sine wave
        this.angleSpeed = Math.random() * 0.5 + 0.5; //how fast the angle increases
        // this.curve = Math.random() * 200 + 50; // prominence of movement/depth of movement
    }
    update(){
        this.x = canvas.width/2 * Math.sin(this.angle * Math.PI/90) + (canvas.width/2 - this.width/2); // enemies oscillate
        // this.x = this.curve * Math.sin(this.angle * Math.PI/180) + (canvas.width/2 - this.width/2); // enemies oscillate
        // characters cycle b/w -200 and +200 when this.curve is used
        this.y =  canvas.height/2 * Math.cos(this.angle * Math.PI/270) + (canvas.height/2 - this.height/2); // enemies oscillate; 
        // cosine wave movement along y-axis(values b/w 0 & 1)
        this.angle += this.angleSpeed;
        // x and y compliment each other forming a circle with this.curve as radius
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