import { Position } from "../dto/position";
import { Texture } from "./texture";

export class DrawableContext {
    constructor(
        public canvas: HTMLCanvasElement,
        public ctx: CanvasRenderingContext2D,
        public timeStamp = Date.now()) { }

    drawImage(texture: Texture, destinationPosition: Position) {
        this.ctx.drawImage(texture.image,
            texture.position.x,
            texture.position.y,
            texture.position.width,
            texture.position.height,
            destinationPosition.x,
            destinationPosition.y,
            destinationPosition.width,
            destinationPosition.height);
    }
}