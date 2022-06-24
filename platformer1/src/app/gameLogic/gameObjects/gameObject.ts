import { Position } from "../dto/position";
import { IDrawable } from "../interfaces/iDrawable";
import { DrawableContext } from "./drawableContext";

export class GameObject implements IDrawable {
    constructor(public position: Position) { }

    draw(context: DrawableContext): void {
        return;
    }
}