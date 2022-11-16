import Canvas from "../Canvas";

class Player {
    constructor(
        private settings: {
            canvas: Canvas,
            position: { x: number, y: number },
            width: number,
            height: number,
            health: { current: number, max: number },
            movement: { speed: number }
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
            if (keys['w'] && keys['s']) {
                this.move("none");
            } else if (keys['a'] && keys['d']) {
                this.move("none");
            } else if (keys['w'] && keys['a']) {
                this.move("up-left");
                this.setHealth({ current: this.getHealth().current - 1, max: this.getHealth().max });
            } else if (keys['w'] && keys['d']) {
                this.move("up-right");
                this.setHealth({ current: this.getHealth().current - 1, max: this.getHealth().max });
            } else if (keys['s'] && keys['a']) {
                this.move("down-left");
                this.setHealth({ current: this.getHealth().current - 1, max: this.getHealth().max });
            } else if (keys['s'] && keys['d']) {
                this.move("down-right");
                this.setHealth({ current: this.getHealth().current - 1, max: this.getHealth().max });
            } else if (keys['w']) {
                this.move("up");
                this.setHealth({ current: this.getHealth().current - 1, max: this.getHealth().max });
            } else if (keys['a']) {
                this.move("left");
                this.setHealth({ current: this.getHealth().current - 1, max: this.getHealth().max });
            } else if (keys['s']) {
                this.move("down");
                this.setHealth({ current: this.getHealth().current - 1, max: this.getHealth().max });
            } else if (keys['d']) {
                this.move("right");
                this.setHealth({ current: this.getHealth().current - 1, max: this.getHealth().max });
            } else {
                this.move("none");
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

    getPosition(): { x: number, y: number } {
        return this.settings.position;
    }

    move(direction: string, speed: number = this.settings.movement.speed): void {
        switch (direction) {
            case 'up':
                if (this.settings.position.y - speed > 0) {
                    this.settings.position.y -= speed;
                }
                break;
            case 'down':
                if (this.settings.position.y + speed < this.settings.canvas.canvas.height - this.settings.height) {
                    this.settings.position.y += speed;
                }
                break;
            case 'left':
                if (this.settings.position.x - speed > 0) {
                    this.settings.position.x -= speed;
                }
                break;
            case 'right':
                if (this.settings.position.x + speed < this.settings.canvas.canvas.width - this.settings.width) {
                    this.settings.position.x += speed;
                }
                break;
            case 'up-left':
                if (this.settings.position.y - speed > 0 && this.settings.position.x - speed > 0) {
                    this.settings.position.y -= speed / 1.414;
                    this.settings.position.x -= speed / 1.414;
                }
                break;
            case 'up-right':
                if (this.settings.position.y - speed > 0 && this.settings.position.x + speed < this.settings.canvas.canvas.width - this.settings.width) {
                    this.settings.position.y -= speed / 1.414;
                    this.settings.position.x += speed / 1.414;
                }
                break;
            case 'down-left':
                if (this.settings.position.y + speed < this.settings.canvas.canvas.height - this.settings.height && this.settings.position.x - speed > 0) {
                    this.settings.position.y += speed / 1.414;
                    this.settings.position.x -= speed / 1.414;
                }
                break;
            case 'down-right':
                if (this.settings.position.y + speed < this.settings.canvas.canvas.height - this.settings.height && this.settings.position.x + speed < this.settings.canvas.canvas.width - this.settings.width) {
                    this.settings.position.y += speed / 1.414;
                    this.settings.position.x += speed / 1.414;
                }
                break;
            case 'none':
                break;
            default:
                console.log('Invalid direction');
        }
    }

    update(): void {
        this.draw();
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
        movement: { speed: number }
    } {
        return this.settings;
    }
}

export default Player;