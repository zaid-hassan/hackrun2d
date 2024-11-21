import EnergyBall from "./energyBall";
import Obstacle from "./obstacle";
import Spaceship from "./spaceship";

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.gameOver = false;

        this.width = canvas.width;
        this.height = canvas.height;

        this.score = 0;
        this.highScore = (JSON.parse(localStorage.getItem('ship-highscore')) === null) ? 0 : JSON.parse(localStorage.getItem('ship-highscore'));

        this.keys = [];

        this.spaceship = new Spaceship(this);

        this.timer = {
            obstacle: {
                timer: 0,
                interval: 400,
            },
            energyBall: {
                timer: 0,
                interval: 800,
            }
        }

        this.obstaclePool = [];
        this.energyPool = [];
        this.numberOfObstacles = 100;
        this.numberOfEnergyBalls = 100;
        this.createPool(this.obstaclePool, this.numberOfObstacles, Obstacle);
        this.createPool(this.energyPool, this.numberOfEnergyBalls, EnergyBall);


        this.start()

        window.addEventListener('resize', (e) => {
            this.resize(e.target.innerWidth, e.target.innerHeight);
        })
        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        })
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        })
    }

    // Game Logic Functions

    // Object Pool creation
    createPool(pool, poolSize, EntityClass) {
        for (let i = 0; i < poolSize; i++) {
            pool.push(new EntityClass(this));
        }
    }

    // get the obstacle out of the pool
    getItemFromPool(pool) {
        if (!pool) return null;
        for (let item of pool) {
            if (item.available) {
                return item;
            }
        }
        return null;
    }

    // Start the obstacles
    handleItem(deltaTime, pool, timerObject) {
        if (timerObject.timer < timerObject.interval) {
            timerObject.timer += deltaTime;
        } else {
            timerObject.timer = 0;
            const item = this.getItemFromPool(pool);
            if (item) item.start();
        }
    }

    // Collision detection
    collisionDetection(rect1, rect2) {
        if (rect1.x > rect2.x + rect2.width ||
            rect1.y > rect2.y + rect2.height ||
            rect1.x + rect1.width < rect2.x ||
            rect1.y + rect1.height < rect2.y
        ) {
            return false;
        } else {
            return true;
        }
    }

    // Score
    drawScoreText() {
        const ctx = this.ctx;
        ctx.fillStyle = 'white';
        ctx.font = '60px "Tiny5"';
        
        const scoreText = `${this.score}    ${this.spaceship.life}    ${this.highScore}`;
        const scoreTextWidth = ctx.measureText(scoreText).width;

        const scoreX = (this.width / 2) - (scoreTextWidth / 2);
        const scoreY = this.height * .1;

        ctx.fillText(scoreText, scoreX, scoreY);
    }

    // Highscore calculation
    calculateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('ship-highscore', JSON.stringify(this.highScore))
        }
    }

    gameOver() {
        return this.gameOver;
    }


    // Helper Functions
    start() {
        this.gameOver = false;
        console.log('start', this.gameOver);
        this.resize(window.innerWidth, window.innerHeight)
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }
    render(deltaTime) {
        this.handleItem(deltaTime, this.obstaclePool, this.timer.obstacle);
        this.obstaclePool.forEach(obstacle => {
            obstacle.update(deltaTime);
            obstacle.draw();
        })
        this.handleItem(deltaTime, this.energyPool, this.timer.energyBall);
        this.energyPool.forEach(energyBall => {
            energyBall.update(deltaTime);
            energyBall.draw()
        })
        this.spaceship.update(deltaTime);
        this.spaceship.draw();
        this.obstaclePool.forEach(obstacle => {
            if (!obstacle.available && this.collisionDetection(this.spaceship, obstacle)) {
                console.log('Collision with obstacle!');
                // Handle spaceship damage or game over here
                if (this.spaceship.life > 0) {
                    this.spaceship.life -= 1;
                }
                obstacle.reset();

            }
        });

        console.log(this.spaceship.life)

        if (this.spaceship.life <= 0) {
            this.gameOver = true;
            console.log('gameover', this.gameOver)
        }
        
        this.energyPool.forEach(energyBall => {
            if (!energyBall.available && this.collisionDetection(this.spaceship, energyBall)) {
                console.log('Energy ball collected!');
                // Increase points or power-up
                this.score += 1;
                energyBall.reset();
            }
        });
        this.drawScoreText()
    }
}