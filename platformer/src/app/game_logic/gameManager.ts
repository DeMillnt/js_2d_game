export class GameManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx?.beginPath();
        this.ctx?.rect(0, 0, 10, 10);
        this.ctx?.fill();
    }
}