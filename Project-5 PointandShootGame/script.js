/** @type {HTMLCanvasElement} */ 
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0; // maintain score
ctx.font = '50px Impact';

let timeToNextRaven = 0; // accumulate milisecond values b/w frames until its reaches interval value and trigger next frame
let ravenInterval = 500; // value in ms,time at which next raven is triggered using timeToNextRaven
let lastTime = 0; // hold value of timeStamp from the previous loop

let ravens =[];
class Raven {
    constructor(){
        this.image = new Image();
        this.image.src = './media/raven.png';
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.5 + 0.4; // modify size of ravens
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height); // -this.height to prevent half hidden ravens
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5; // random number b/w 5 and -2.5
        // -ve values above and +ve below for y-direction
        this.markedForDeletion = false; //deleting passed ravens
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50; //adjust cycling of frames speed
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        // select random rgb color
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    update(deltaTime){
        if (this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0.1 * this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
    }
    draw(){
        collisionCtx.fillStyle = this.color; // random color filled
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let explosions = [];
class Explosion {
    constructor(x, y, size){
        this.image = new Image();
        this.image.src = './media/boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = './media/boom.wav';
        this.timeSinceLastFrame = 0; // accumulate deltaTime
        this.frameInterval = 200; // when next frame triggers
        this.markedForDeletion = false;
    }
    update(deltaTime){
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.size, this.size);
    }
}

function drawScore(){
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 53, 80); //two fillstyle for shadow effect
}

window.addEventListener('click', function(e){
    console.log(e.x, e.y);
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1); // getImageData(x,y,width,height)
    //returns an array like object called Uint8ClampedArray(data structure full of unasigned 8-bit integers)
    // console.log(detectPixelColor);
    // Uint8Clamped(data)->(red, green, blue, alpha/opacity)
    // canvas only has ravens rest is transparent, rgb due to CSS body
    // compare rgb values on collisionCanvas rectangles with randomColors and markedforDeletion = true;
    const pc = detectPixelColor.data; // refers to the Uint8Clamped array , pc-> pixelcolor
    ravens.forEach(object=> {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            // collision detected
            object.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(object.x, object.y, object.width));
            // console.log(explosions);
        }
    })
});

// const raven = new Raven();

// we need to create a new raven periodically and that periodic event is triggered on very old slow computers
// as well as fast modern computers at the same time
// to make sure the timings are based on miliseconds and not on power of computer we use timestamps
function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
    // raven.update();
    // raven.draw();
    // console.log('test'); // test animation loop running on console
    let deltaTime = timestamp - lastTime; // value b/w timestamp of this loop and holded timestamp value of previous loop
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    // console.log(deltaTime);
    if (timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
        // console.log(ravens);
        ravens.sort(function(a,b){
            a.width - b.width;
        })
    };
    drawScore();
    // array literal-[...name], ...name->spread operator 
    // create new array and add it to ravens array
    [...ravens, ...explosions].forEach(object=> object.update(deltaTime)); // cycle through ravens array and call update method on each of them
    [...ravens, ...explosions].forEach(object=> object.draw());
    ravens = ravens.filter(object=> !object.markedForDeletion);
    explosions = explosions.filter(object=> !object.markedForDeletion);
    // console.log(ravens);
    requestAnimationFrame(animate); //animate becomes a callback function with an automatic timestamp if we dont assign one
}
animate(0); // pass 0 as an arguement else it starts timestamp as undefined for first loop