export default class Obstacle {
    constructor(game) {
        this.game = game;
        if (this.game.width * .06 >= 60) {
            this.width = this.game.width * .06;
        } else {
            this.width = 60;
        }
        this.height = this.width;

        this.x = Math.floor(Math.random() * (this.game.width - this.width));
        this.y = -this.height;

        // Image loading
        this.image = new Image();
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
            this.sw = this.image.width; 
            this.sh = this.image.height;  
        };
        this.image.src = './obstacle.png'; 

        // Sprite frame setup
        this.sx = 0;
        this.sy = 0;
        
        this.available = true;
        this.speedY = .5;
    }
    start() {
        this.available = false;
        this.x = Math.floor(Math.random() * (this.game.width - this.width));
        this.y = -this.height;
    }
    reset() {
        this.available = true;
    }
    update(deltaTime) {
        if (!this.available) {
            this.speedY = (this.game.timeDelayActive) ? 0.25 : 0.5;
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
            // ctx.fillStyle = 'green';
            // ctx.rect(this.x, this.y, this.width, this.height);
            if (this.imageLoaded) {
                // Draw the loaded sprite
                ctx.drawImage(
                    this.image,
                    this.sx,
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
            // ctx.fill();
        }
    }
}