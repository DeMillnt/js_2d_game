import { Position } from "../dto/position";

export class Texture {
    constructor(
        public position: Position,
        public image: HTMLImageElement) { }
}