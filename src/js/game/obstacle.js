export default class Obstacle {
    constructor(game) {
        this.game = game;
        if (this.game.width * .06 >= 60) {
            this.width = this.game.width * .06;
        } else {
            this.width = 60;
        }
        this.height = this.width;

        this.x = Math.floor(Math.random() * this.game.width - this.width);
        this.y = -this.height;
        
        this.available = true;
        this.speedY = .5;
    }
    start() {
        this.available = false;
        this.x = Math.floor(Math.random() * this.game.width - this.width) + this.width;
        this.y = -this.height;
    }
    reset() {
        this.available = true;
    }
    update(deltaTime) {
        if (!this.available) {
            this.y += this.speedY * deltaTime;

            if (this.y >= this.game.height) {
                this.reset()
            }
        }
    }
    draw() {
        if (!this.available) {
            const ctx = this.game.ctx;
            ctx.beginPath();
            ctx.fillStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();
        }
    }
}