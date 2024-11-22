import Obstacle from "./obstacle";

export default class TimeDelay extends Obstacle {
    constructor(game) {
        super(game);
        this.color = 'pink';
        this.speedY = .6;
        // Image loading
        this.image = new Image();
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
            this.sw = this.image.width; 
            this.sh = this.image.height;  
        };
        this.image.src = './timedelay.png'; 

        // Sprite frame setup
        this.sx = 0;
        this.sy = 0;
    }
    start() {
        super.start();
        this.color = 'pink';
    }
    draw() {
        if (!this.available) {
            const ctx = this.game.ctx;
            ctx.beginPath();
            // ctx.fillStyle = this.color;
            // // ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            // ctx.rect(this.x, this.y, this.width, this.height)
            // ctx.fill();
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
        }
    }
}