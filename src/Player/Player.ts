import Canvas from "../Canvas";

class Player {
    constructor(
        private settings: {
            canvas: Canvas,
            position: { x: number, y: number },
            width: number,
            height: number,
            health: { current: number, max: number },
            movement: { speed: number, friction: number, step: number }
        }
    ) {
        let keys: any = [];

        this.settings.canvas = settings.canvas;
        this.settings.position = settings.position;
        this.settings.width = settings.width;
        this.settings.height = settings.height;
        this.settings.health = settings.health;
        this.settings.movement = settings.movement;

        document.addEventListener('keydown', (event: KeyboardEvent) => {
            keys[event.key] = true;
        });
        document.addEventListener('keyup', (event: KeyboardEvent) => {
            keys[event.key] = false;
        });

        setInterval(() => {
            // move player but if two keys are pressed move diagonally
            if (keys['w'] && keys['a']) {
                this.move('up-left');
            } else if (keys['w'] && keys['d']) {
                this.move('up-right');
            } else if (keys['s'] && keys['a']) {
                this.move('down-left');
            } else if (keys['s'] && keys['d']) {
                this.move('down-right');
            } else if (keys['w']) {
                this.move('up');
            } else if (keys['s']) {
                this.move('down');
            } else if (keys['a']) {
                this.move('left');
            } else if (keys['d']) {
                this.move('right');
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.settings.health.current < this.settings.health.max) {
                this.settings.health.current++;
            }
        }, 5000);
    }

    init(): void {
        this.draw();
    }

    draw(): void {
        let sprite = new Image();
        sprite.src = 'src/Sprites/player.png';
        this.settings.canvas.context.drawImage(sprite, this.settings.position.x, this.settings.position.y, this.settings.width, this.settings.height);
    }

    drawHealthBar(): void {
        this.settings.canvas.context.fillStyle = '#f00';
        this.settings.canvas.context.fillRect(this.settings.position.x, this.settings.position.y - 20, this.settings.width, 10);
        this.settings.canvas.context.fillStyle = '#0f0';
        this.settings.canvas.context.fillRect(this.settings.position.x, this.settings.position.y - 20, this.settings.width * (this.settings.health.current / this.settings.health.max), 10);
    }

    getPosition(): { x: number, y: number } {
        return this.settings.position;
    }

    move(direction: string, speed: number = this.settings.movement.speed, step: number = this.settings.movement.step, friction: number = this.settings.movement.friction): void {
        switch (direction) {
            case 'up':
                this.settings.position.y -= speed;

                if (speed > 0) {
                    this.move(direction, speed - step * friction, step, friction);
                }
                break;
            case 'down':
                this.settings.position.y += speed;

                if (speed > 0) {
                    this.move(direction, speed - step * friction, step, friction);
                }
                break;
            case 'left':
                this.settings.position.x -= speed;

                if (speed > 0) {
                    this.move(direction, speed - step * friction, step, friction);
                }
                break;
            case 'right':
                this.settings.position.x += speed;

                if (speed > 0) {
                    this.move(direction, speed - step * friction, step, friction);
                }
                break;
            case 'up-left':
                this.settings.position.y -= speed;
                this.settings.position.x -= speed;

                if (speed > 0) {
                    this.move(direction, speed - step * friction, step, friction);
                }
                break;
            case 'up-right':
                this.settings.position.y -= speed;
                this.settings.position.x += speed;

                if (speed > 0) {
                    this.move(direction, speed - step * friction, step, friction);
                }
                break;
            case 'down-left':
                this.settings.position.y += speed;
                this.settings.position.x -= speed;

                if (speed > 0) {
                    this.move(direction, speed - step * friction, step, friction);
                }
                break;
            case 'down-right':
                this.settings.position.y += speed;
                this.settings.position.x += speed;

                if (speed > 0) {
                    this.move(direction, speed - step * friction, step, friction);
                }
                break;
        }
    }

    update(): void {
        this.draw();
        this.drawHealthBar();
    }

    getHealth(): { current: number, max: number } {
        return this.settings.health;
    }

    setHealth(health: { current: number, max: number }): void {
        this.settings.health = health;
    }

    getSettings(): {
        canvas: Canvas,
        position: { x: number, y: number },
        width: number,
        height: number,
        health: { current: number, max: number },
        movement: { speed: number, step: number }
    } {
        return this.settings;
    }
}

export default Player;