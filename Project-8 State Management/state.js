export const states= {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
}
// ENUM to define constants

class State {
    constructor(state){
        this.state = state; // making state a class property
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super('STANDING_LEFT');   // changing value of state in parent from child class
        this.player = player;
    }
    enter() {
        this.player.frameY = 1;
    }
    handleInput(input) {
        if (input === 'PRESS right')  //set state to STANDING_RIGHT
        {
            this.player.setState(states.RUNNING_RIGHT);
        } 
        else if (input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
    }
}
export class StandingRight extends State {
    constructor(player) {
        super('STANDING_RIGHT');
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
    }
    handleInput(input) {
        if (input === 'PRESS left')   // set state to STANDING_LEFT
        {
            this.player.setState(states.RUNNING_LEFT);
        }  
        else if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
    }
}
export class SittingLeft extends State {
    constructor(player) {
        super('SITTING_LEFT');   // changing value of state in parent from child class
        this.player = player;
    }
    enter() {
        this.player.frameY = 9;
    }
    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.SITTING_RIGHT);
        else if (input === 'RELEASE down') this.player.setState(states.STANDING_LEFT);
    }
}
export class SittingRight extends State {
    constructor(player) {
        super('SITTING_Right');   // changing value of state in parent from child class
        this.player = player;
    }
    enter() {
        this.player.frameY = 8;
    }
    handleInput(input) {
        if (input === 'PRESS left')  this.player.setState(states.SITTING_LEFT);
        else if (input === 'RELEASE down') this.player.setState(states.STANDING_RIGHT);
    }
}
export class RunningLeft extends State {
    constructor(player) {
        super('RUNNING_LEFT');   // changing value of state in parent from child class
        this.player = player;
    }
    enter() {
        this.player.frameY = 7;
    }
    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
        else if (input === 'RELEASE left') this.player.setState(states.STANDING_LEFT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
    }
}
export class RunningRight extends State {
    constructor(player) {
        super('RUNNING_RIGHT');   // changing value of state in parent from child class
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
    }
    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if (input === 'RELEASE right') this.player.setState(states.STANDING_RIGHT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
    }
}