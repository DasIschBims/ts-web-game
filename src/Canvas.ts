// canvas
class Canvas {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }

    clear(): void {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    resize(): void {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }
}

export default Canvas;