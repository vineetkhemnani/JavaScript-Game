/** @type {HTMLCanvasElement} */ 
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven = 0; // accumulate milisecond values b/w frames until its reaches interval value and trigger next frame
let ravenInterval = 500; // value in ms,time at which next raven is triggered using timeToNextRaven
let lastTime = 0; // hold value of timeStamp from the previous loop
let ravens =[];
class Raven {
    constructor(){
        this.image = new Image();
        this.image.src = './images/raven.png';
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4; // modify size of ravens
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
    }
    update(deltaTime){
        // if (this.y || this.y > canvas.height - this.height){
        //     this.directionY = this.directionY * -1;
        // }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }

        

    }
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

// const raven = new Raven();

// we need to create a new raven periodically and that periodic event is triggered on very old slow computers
// as well as fast modern computers at the same time
// to make sure the timings are based on miliseconds and not on power of computer we use timestamps
function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    };
    // array literal-[...name], ...name->spread operator 
    // create new array and add it to ravens array
    [...ravens].forEach(object=> object.update(deltaTime)); // cycle through ravens array and call update method on each of them
    [...ravens].forEach(object=> object.draw());
    ravens = ravens.filter(object=> !object.markedForDeletion);
    console.log(ravens);
    requestAnimationFrame(animate); //animate becomes a callback function with an automatic timestamp if we dont assign one
}
animate(0); // pass 0 as an arguement else it starts timestamp as undefined for first loop