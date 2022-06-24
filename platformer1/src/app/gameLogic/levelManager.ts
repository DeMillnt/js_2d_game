import { DrawableContext } from "./gameObjects/drawableContext";
import { IDrawable } from "./interfaces/iDrawable";
import { Level } from "./level";

export class LevelManager implements IDrawable {

    private level = new Level([]);

    constructor() {

    }

    draw(context: DrawableContext): void {
        this.level.draw(context);
    }

}