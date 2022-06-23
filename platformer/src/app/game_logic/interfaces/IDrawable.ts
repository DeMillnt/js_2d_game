export interface IDrawable {
    x: number;
    y: number;
    w: number;
    h: number;

    draw(): void;
}