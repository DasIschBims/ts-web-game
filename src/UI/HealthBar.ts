import Canvas from "../Canvas";

class HealthBar {
    constructor(
        private settings: {
            canvas: Canvas,
            width: number,
            height: number,
            health: { current: number, max: number }
        }
    ) {
        this.settings.canvas = settings.canvas;
        this.settings.width = settings.width;
        this.settings.height = settings.height;
        this.settings.health = settings.health;
    }

    init(): void {
        this.draw();
    }

    update(): void {
        this.draw();
    }

    draw(): void {
        this.settings.canvas.context.fillStyle = '#f00';
        this.settings.canvas.context.fillRect(
            this.settings.width - this.settings.width + 10,
            this.settings.canvas.canvas.height - this.settings.height - 10,
            this.settings.width,
            this.settings.height
        );
        this.settings.canvas.context.fillStyle = '#0f0';
        this.settings.canvas.context.fillRect(
            this.settings.width - this.settings.width + 10,
            this.settings.canvas.canvas.height - this.settings.height - 10,
            this.settings.width * (this.settings.health.current / this.settings.health.max),
            this.settings.height
        );
    }

    getSettings(): {
        canvas: Canvas,
        width: number,
        height: number,
        health: { current: number, max: number }
    } {
        return this.settings;
    }

    setHealth(health: { current: number, max: number }): void {
        this.settings.health = health;
    }
}

export default HealthBar;