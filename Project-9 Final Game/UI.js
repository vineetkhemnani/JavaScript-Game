export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        //score
        context.fillText('Score: ' + this.game.score, 20, 50);
    }
}