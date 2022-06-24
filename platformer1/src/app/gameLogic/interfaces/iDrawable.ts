import { DrawableContext } from "../gameObjects/drawableContext";

export interface IDrawable {
    draw(context: DrawableContext): void;
}