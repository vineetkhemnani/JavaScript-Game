// output data-structure same as spriteAnimations.js
const spriteWidth=575;
const spriteHeight=523;
let frameX = 0; // swaps b/w different animations it travels horizontally
let frameY = 0; // swaps b/w different animations it travels vertically
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

console.log(spriteAnimations['idle']);
// console.log(spriteAnimations["idle"].loc[2].x);
