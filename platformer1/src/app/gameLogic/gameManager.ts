import { HttpClient } from "@angular/common/http";
import { DrawableContext } from "./gameObjects/drawableContext";
import { LevelManager } from "./levelManager";

export class GameManager {

    private oldTimeStamp: number = 0;
    private ctx: CanvasRenderingContext2D;
    private levelManager;

    constructor(private canvas: HTMLCanvasElement, http: HttpClient) {
        this.levelManager = new LevelManager(http);
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            throw Error("CanvasRenderingContext2D is null");
        }
        this.ctx = ctx;        
    }

    beginGameLoop() {
        this.gameLoop(0);
    }

    gameLoop(timeStamp: number) {
        let delta = timeStamp - this.oldTimeStamp;
        this.oldTimeStamp = timeStamp;
        this.update(delta);
        this.draw(timeStamp);
        
        requestAnimationFrame(() => this.gameLoop(Date.now()));
    }

    draw(timeStamp: number) {
        let context = new DrawableContext(this.canvas, this.ctx, timeStamp);
        this.levelManager.draw(context);
    }

    update(delta: number) {
        
    }
}