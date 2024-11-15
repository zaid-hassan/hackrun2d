import Spaceship from "./spaceship";

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.width = canvas.width;
        this.height = canvas.height;

        this.keys = [];

        this.spaceship = new Spaceship(this);


        this.start()

        window.addEventListener('resize', (e) => {
            this.resize(e.target.innerWidth, e.target.innerHeight);
        })
        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            console.log(this.keys)
        })
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
            console.log(this.keys)
        })
    }

    // Helper Functions
    start() {
        this.resize(window.innerWidth, window.innerHeight)
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }
    render(deltaTime) {
        this.spaceship.update(deltaTime);
        this.spaceship.draw();
    }
}