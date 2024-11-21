export default class Spaceship {
    constructor(game) {
        this.game = game;

        // Set spaceship dimensions
        this.width = Math.max(this.game.width * 0.05, 50);
        this.height = this.width;

        // Initial position
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - (this.height + 100);

        // Movement variables
        this.velocity = 0;
        this.maxVelocity = 50;
        this.acceleration = 0.05;
        this.deceleration = this.acceleration;

        // Image loading
        this.image = new Image();
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
            this.sw = this.image.width / 3; // Calculate sprite width
            this.sh = this.image.height;   // Set sprite height
        };
        this.image.src = './ship.png'; // Set image source

        // Sprite frame setup
        this.sx = 0;
        this.sy = 0;
        this.frameX = 0;

        this.life = 2;
    }

    update(deltaTime) {
        // Handle movement based on keys
        if (this.game.keys[0] === 'ArrowLeft') {
            this.velocity -= this.acceleration * deltaTime;
            this.frameX = 256; // Left frame
        }
        if (this.game.keys[0] === 'ArrowRight') {
            this.velocity += this.acceleration * deltaTime;
            this.frameX = 128; // Right frame
        }
        if (this.game.keys.length === 0) {
            // Decelerate if no keys are pressed
            if (this.velocity > 0) this.velocity = Math.max(0, this.velocity - this.deceleration * deltaTime);
            if (this.velocity < 0) this.velocity = Math.min(0, this.velocity + this.deceleration * deltaTime);
            this.frameX = 0; // Neutral frame
        }

        // Clamp velocity
        this.velocity = Math.min(this.maxVelocity, Math.max(-this.maxVelocity, this.velocity));

        // Update position
        this.x += this.velocity;

        // Prevent going out of bounds
        if (this.x <= 0) {
            this.x = 0;
            this.velocity = 0;
        }
        if (this.x >= this.game.width - this.width) {
            this.x = this.game.width - this.width;
            this.velocity = 0;
        }
    }

    draw() {
        const ctx = this.game.ctx;
        ctx.beginPath();

        if (this.imageLoaded) {
            // Draw the loaded sprite
            ctx.drawImage(
                this.image,
                this.sx + this.frameX,
                this.sy,
                this.sw,
                this.sh,
                this.x,
                this.y,
                this.width,
                this.height
            );
        } else {
            console.log('Image is still loading...');
        }

        ctx.closePath();
    }
}
