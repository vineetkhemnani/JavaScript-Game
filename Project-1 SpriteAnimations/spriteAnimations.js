let spriteAnimations = {
    "idle" : {
        location: [
            {x:0, y:0},
            {x:575, y:0},
            {x:1150, y:0},
            {x:1725, y:0},
            {x:2300, y:0},
            {x:2875, y:0},
            {x:3450, y:0},

        ]
    },
    "jump" : {
        location: [
            {x:0, y:523},
            {x:575, y:523},
            {x:1150, y:523},
            {x:1725, y:523},
            {x:2300, y:523},
            {x:2875, y:523},
            {x:3450, y:523}
        ]
    },
    "run" : {
        location: [
            {x:0, y:1569},
            {x:575, y:1569},
            {x:1150, y:1569},
            {x:1725, y:1569},
            {x:2300, y:1569}
        ]
    }
};

console.log(spriteAnimations["idle"].location[2].x); //1150
console.log(spriteAnimations["idle"].location.length); //7
