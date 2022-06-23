import { GameObject } from "./gameObject";
import { IDrawable } from "../interfaces/IDrawable";

export class Tile extends GameObject implements IDrawable {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(): void {
        return;
    }

}