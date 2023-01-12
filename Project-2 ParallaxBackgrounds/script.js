const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800; //800
const CANVAS_HEIGHT = canvas.height = 700; //700
let gameSpeed = 15; //dynamic variable for scroll speed

const backgroundLayer1 = new Image();
//built-in image class constructor that creates an image element
// image() - same work as document.create("img");
backgroundLayer1.src = './backgroundLayers/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './backgroundLayers/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './backgroundLayers/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './backgroundLayers/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './backgroundLayers/layer-5.png';

let x = 0;
let x2 = 2400;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //clearing previous frames
    ctx.drawImage(backgroundLayer4, x, 0);
    ctx.drawImage(backgroundLayer4, x2, 0);
    if(x < -2400) x = 2400;
    else x -= gameSpeed; //traversing horizontally using dynamic gameSpeed
    if(x2 < -2400) x2 = 2400;
    else x2 -= gameSpeed;
    // gaping present b/w frames so cant be used
    requestAnimationFrame(animate);
};
animate();
