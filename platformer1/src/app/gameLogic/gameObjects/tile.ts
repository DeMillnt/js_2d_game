import { DrawableContext } from "./drawableContext";
import { GameObject } from "./gameObject";
import { Texture } from "./texture";
import { Position } from "../dto/position";

export class Tile extends GameObject {
    constructor(
        public texture: Texture,
        position: Position = Position.default()) {
        super(position);
    }

    draw(context: DrawableContext): void {
        context.drawImage(this.texture, this.position)
    }
}