let playerState = 'idle';
const dropdown = document.getElementById('animations');
// dropdown - corresponds to animations dropdown in HTML file
// addEventListener('change',function(e))-listens for any change event
// e - event object 
dropdown.addEventListener('change', 
function(e){ //callback function
    // every time value changes we change playerState to that value
    playerState = e.target.value; //value corresponds to value of option in HTML
})
const canvas=document.getElementById('canvas1');
// reference to our original canvas in the HTML
const ctx = canvas.getContext('2d');
// The getContext() is a built-in HTML object, with properties and methods for drawing
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 150, 75);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
// let x =0; 
// ctx.fillRect(x,150,150,200);--> replace with line 22
// x++; add at line 23
const playerImage = new Image();
// calling in-built image class constructor
// create an img element same as HTML
playerImage.src = 'shadow_dog.png';
// spritesheet width=6876px & 12 columns--> 6876/12=573
// spritesheet height= 5230px & 10 columns--> 5230/10=523
const spriteWidth=575;
const spriteHeight=523;
// let frameX = 0; // swaps b/w different animations it travels horizontally
// let frameY = 0; // swaps b/w different animations it travels vertically
let gameFrame = 0; // control animation speed
const staggerFrames = 5; //slow down animation by this amount
// higher the staggerFrames slower the animation
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
//state- represents each element as we are cycling through the array
// index- index of objects in array
animationStates.forEach((state, index)=> {
    let frames = {
        loc: [],
    }
    // for-loop that cycles through state.frames property
    for(let j =0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames; //key-value pair
}) ;
// arrow function--> simplified syntax to write a function

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length; //cycle through positions in frame horizontally
    // Math.floor(gameFrame/staggerFrames) % "noOfFrames" in each row
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    // clearRect()- what area on canvas we want to clear
    // entire canvas- (0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // ctx.fillRect(100,50,100,100);
    // fillRect-(x co-ordinate of rect to move, y co-ordin, x- coord of size, y-co-ord of size)
    // ctx.drawImage(playerImage,0,0, CANVAS_WIDTH, CANVAS_HEIGHT); // accepts 3,5,9 arguements
    // drawImage(Imagesrc, moveImage(x), moveImage(y), width, height)
    // drawImage() with 9 arguements
    // drawImage(srcImage, next 4 arguements represent rectangular area to be cut-out,next 4 represent destination on canvas)
    // drawImage(srcImage, sx, sy, sh, sw, dx, dy, dh, dw)
    ctx.drawImage(playerImage, frameX , frameY ,
    spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    // if (gameFrame % staggerFrames == 0){ //true every 5 frames
    //     if(frameX<6) frameX++;
    //     else frameX=0;
    // // code block runs every 5 frames slowing animation 5 times
    // }


    // everytime we want to swap between animations, we have to change value of frameY

    gameFrame++; // ever increasing frames
    requestAnimationFrame(animate);
    // built-in method which simply runs a function passed to it
};
animate();

