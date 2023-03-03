export const states= {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
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
            this.player.setState(states.STANDING_RIGHT);
        }
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
            this.player.setState(states.STANDING_LEFT);
         }
    }
}