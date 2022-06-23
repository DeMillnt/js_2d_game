import { HttpClient } from "@angular/common/http";
import { Level } from "./level";
import { ResourceManager } from "./resourceManager";

export class GameManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    constructor(canvas: HTMLCanvasElement, http: HttpClient) {

        let resourceManager = new ResourceManager(http);
        resourceManager.loadResources();

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx?.beginPath();
        this.ctx?.rect(0, 0, 10, 10);
        this.ctx?.fill();

        let level = new Level();

    }
}