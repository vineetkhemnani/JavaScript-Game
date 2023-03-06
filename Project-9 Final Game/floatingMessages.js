export class FloatingMessage {
    constructor(value, x, y, targetX, targetY){
       this.value = value;
       this.x = x;
       this.y = y;
       this.targetX = targetX;
       this.targetY = targetY;
       this.markedForDeletion = false;
       this.timer = 0; 
    }
}