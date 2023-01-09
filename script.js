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
let frameX = 0; // swaps b/w different animations it travels horizontally
let frameY = 0; // swaps b/w different animations it travels vertically


function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // clearRect()- what area on canvas we want to clear
    // entire canvas- (0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // ctx.fillRect(100,50,100,100);
    // fillRect-(x co-ordinate of rect to move, y co-ordin, x- coord of size, y-co-ord of size)
    // ctx.drawImage(playerImage,0,0, CANVAS_WIDTH, CANVAS_HEIGHT); // accepts 3,5,9 arguements
    // drawImage(Imagesrc, moveImage(x), moveImage(y), width, height)
    // drawImage() with 9 arguements
    // drawImage(srcImage, next 4 arguements represent rectangular area to be cut-out,next 4 represent destination on canvas)
    // drawImage(srcImage, sx, sy, sh, sw, dx, dy, dh, dw)
    ctx.drawImage(playerImage,frameX * spriteWidth, frameY * spriteHeight,
    spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    if(frameX<6) frameX++;
    else frameX=0;

   requestAnimationFrame(animate);
    // built-in method which simply runs a function passed to it
};
animate();

