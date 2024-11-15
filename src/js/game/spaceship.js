export default class Spaceship {
    constructor(game) {
        this.game = game;

        this.width = this.game.width * .05;
        this.height = this.width;

        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - (this.height + 30);

        this.velocity = 0;
        this.maxVelocity = 50;
        this.acceleration = .05;
        this.deceleration = this.acceleration;

        this.image = new Image();
        this.image.src = './ship.png'

        this.sx = 0;
        this.sy = 0;
        this.sw = this.image.width / 3;
        this.sh = this.image.height;
    }
    update(deltaTime) {

        if (this.game.keys[0] === 'ArrowLeft') {
            this.velocity -= this.acceleration * deltaTime;
        }
        if (this.game.keys[0] === 'ArrowRight') {
            this.velocity += this.acceleration * deltaTime;
        }
        if (this.game.keys.length === 0) {
            // this.velocity *= .9;
            if (this.velocity > 0) this.velocity = Math.max(0, this.velocity - this.deceleration * deltaTime);
            if (this.velocity < 0) this.velocity = Math.min(0, this.velocity + this.deceleration * deltaTime);
        }

        this.velocity = Math.min(this.maxVelocity, Math.max(-this.maxVelocity, this.velocity));
        console.log(this.velocity)



        this.x += this.velocity;

        if (this.x <= 0) {
            this.x = 0;
            this.velocity = 0
        }
        if (this.x >= this.game.width - this.width) {
            this.x = this.game.width - this.width;
            this.velocity = 0;
        }
    }
    draw() {
        const ctx = this.game.ctx;
        ctx.beginPath();
        ctx.fillStyle = 'green';
        // ctx.rect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height)
        ctx.fill();
        ctx.closePath();
    }
}
