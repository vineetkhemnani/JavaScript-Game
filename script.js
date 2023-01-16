/** @type {HTMLCanvasElement} */ 
// Collision b/w rectangles that are axis- aliant
//  It only compares X and Y co-ordinates and width and height of two rectangles if they overlap there is a collision
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 600; // 700
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
// returns an object providing information about the size of an element and its position relative to position
// console.log(canvasPosition);
// ctx.fillStyle = 'white';
// ctx.fillRect(50, 50, 100, 150);

class Explosion {
    constructor(x,y){
        this.spriteWidth = 200; // width of each frame
        this.spriteHeight = 179; // height of each frame
        this.width = this.spriteWidth * 0.7; // width of object displayed
        this.height = this.spriteHeight * 0.7; // height of object displayed
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.image = new Image();
        this.image.src = './collision/boom.png';
        this.frame = 0;
        this.timer = 0;
    }
    update(){
        this.timer++;
        if (this.timer % 10 === 0){
            this.frame++;
        }
        // increase frame every 10 frames-> manage speed of animation
    }
    draw(){
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

window.addEventListener('click', function(e){
    // console.log(e);
    // ctx.fillRect(x, y, width, height);
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    ctx.fillStyle = 'white';
    // ctx.fillRect( e.x - canvasPosition.left - 25, e.y - canvasPosition.top - 25, 50, 50);
    // offset e.x and e.y by top and left margin between viewport and canvas
    explosions.push(new Explosion(positionX,positionY));
});

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < explosions.length; i++){
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5){
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();