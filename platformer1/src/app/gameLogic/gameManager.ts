import { DrawableContext } from "./gameObjects/drawableContext";
import { LevelManager } from "./levelManager";

export class GameManager {

    private oldTimeStamp: number = 0;
    private ctx: CanvasRenderingContext2D;
    private levelManager = new LevelManager();

    constructor(private canvas: HTMLCanvasElement) {
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            throw Error("CanvasRenderingContext2D is null");
        }
        this.ctx = ctx;

        requestAnimationFrame(this.gameLoop);
    }

    gameLoop(timeStamp: number) {
        let delta = timeStamp - this.oldTimeStamp;
        this.update(delta);
        this.draw(timeStamp);

        requestAnimationFrame(this.gameLoop);
    }

    draw(timeStamp: number) {
        let context = new DrawableContext(this.canvas, this.ctx, timeStamp);
        this.levelManager.draw(context);
    }

    update(delta: number) {

    }
}