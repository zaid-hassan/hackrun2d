import Obstacle from "./obstacle";

export default class EnergyBall extends Obstacle {
    constructor(game) {
        super(game);
        this.color = 'blue';
    }
    start() {
        super.start();
        this.color = 'blue';
    }
    draw() {
        if (!this.available) {
            const ctx = this.game.ctx;
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}