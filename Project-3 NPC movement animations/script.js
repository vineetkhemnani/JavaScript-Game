/** @type {HTMLCanvasElement} */ 
// tell vscode this is canvas HTML project and it suggests built-in canvas methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const noOfEnemies = 100;
const enemiesArray = [];

// enemy1 = {
//     x: 10,
//     y: 50,
//     width: 100,
//     height: 100,
// }

class Enemy {
    constructor(){
        this.x = Math.random() * canvas.width; //random x co-ord b/w x and canvas.width
        this.y = Math.random() * canvas.height; //random y co-ord b/w y and canvas.height
        this.width = 100;
        this.height = 100;
        this.speed = Math.random() * 4 - 2; //  speed b/w -2 and 2
    }
    update(){
        this.x+= this.speed;
        this.y+= this.speed;
    }
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
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
    })
    requestAnimationFrame(animate);
}
animate();