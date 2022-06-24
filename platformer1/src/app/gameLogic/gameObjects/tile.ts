import { DrawableContext } from "./drawableContext";
import { IDrawable } from "../interfaces/iDrawable";
import { GameObject } from "./gameObject";
import { Texture } from "./texture";
import { Position } from "../dto/position";

export class Tile extends GameObject implements IDrawable {
    constructor(
        public texture: Texture,
        position: Position) {
        super(position);
    }

    draw(context: DrawableContext): void {
        context.drawImage(this.texture, this.position)
    }
}