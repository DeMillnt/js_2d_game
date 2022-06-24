import { Position } from "../dto/position";
import { DrawableContext } from "./drawableContext";
import { GameObject } from "./gameObject";
import { Texture } from "./texture";

export class AnimatedTile extends GameObject {
    constructor(
        public textures: Texture[],
        position: Position) {
        super(position);
        for (let i = textures.length - 1; i >= 0; i--) {
            this.textures.push(textures[i]);
        }
    }

    override draw(context: DrawableContext): void {
        let texture = this.textures[Math.floor(context.timeStamp / 100 % this.textures.length)];
        context.drawImage(texture, this.position);
    }
}