import { DrawableContext } from "./gameObjects/drawableContext";
import { GameObject } from "./gameObjects/gameObject";
import { IDrawable } from "./interfaces/iDrawable";

export class Level implements IDrawable {
    constructor(private gameObjects: GameObject[]) {
        
    }

    draw(context: DrawableContext): void {
        this.gameObjects.forEach(gameObject => gameObject.draw(context));
    }
}