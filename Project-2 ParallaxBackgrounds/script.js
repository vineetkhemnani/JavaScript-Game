// Parallax effect is when foreground layer moves faster than the
// background layer creating a 3d effect and perception of depth
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800; //800
const CANVAS_HEIGHT = canvas.height = 700; //700
let gameSpeed = 5; //dynamic variable for scroll speed

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
    // classes used to create many similar objects
    // class will have same properties and methods but some instances of 
    // these properties will have different values
class Layer{  //mandatory method constructor
//whenever class is called constructor triggers itself,creates blank object
// and assigns values and properties to that blank object based on blueprint 
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image; //ask constructor create property image and set it to image inside parameter
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
        // allows for different speedModifier for each different layer

    }
    update(){
        // move layers horizontally by changing this.x and this.x2
        this.speed = gameSpeed * this.speedModifier;
        // varying speed of each layer without modifying original game speed
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        } 
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw(){
        // 
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height); 
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2); //if gameSpeed=10px then layer will move at 5px
const layer2 = new Layer(backgroundLayer2, 0.4); //if gameSpeed=10px then layer will move at 5px
const layer3 = new Layer(backgroundLayer3, 0.6); //if gameSpeed=10px then layer will move at 5px
const layer4 = new Layer(backgroundLayer4, 0.8); //if gameSpeed=10px then layer will move at 5px
const layer5 = new Layer(backgroundLayer5, 1); //if gameSpeed=10px then layer will move at 10px

const gameObjects = [layer1,layer2,layer3,layer4,layer5];
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //clearing previous frames
    // layer4.update();
    // layer4.draw();
    // layer5.update();
    // layer5.draw();
    gameObjects.forEach(object =>{
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
};
animate();
