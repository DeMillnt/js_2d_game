import { Position } from "../dto/position";
import { TextureEnum } from "../dto/TextureEnum";

export class Texture {
    constructor(
        public id: number,
        public name: string,
        public position: Position,
        public image: HTMLImageElement,
        public type: TextureEnum = TextureEnum.Simple) {
    }

    static default() {
        return new Texture(0, "", Position.default(), new Image());
    }
}