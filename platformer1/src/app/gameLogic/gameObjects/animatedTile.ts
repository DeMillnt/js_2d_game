import { Position } from "../dto/position";
import { DrawableContext } from "./drawableContext";
import { GameObject } from "./gameObject";
import { Texture } from "./texture";

export class AnimatedTile extends GameObject {
    constructor(
        public textures: Texture[],
        position: Position) {
        super(position);
    }

    override draw(context: DrawableContext): void {
        let texture = this.textures[context.timeStamp % this.textures.length];
        context.drawImage(texture, this.position);
    }
}