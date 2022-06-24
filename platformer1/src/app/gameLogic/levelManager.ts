import { HttpClient } from "@angular/common/http";
import { DrawableContext } from "./gameObjects/drawableContext";
import { IDrawable } from "./interfaces/iDrawable";
import { Level } from "./level";
import { ResourceManager } from "./resourceManager";

export class LevelManager implements IDrawable {

    private level = new Level([]);
    private resourceManager: ResourceManager;

    constructor(http: HttpClient) {
        this.resourceManager = new ResourceManager(http);

        this.resourceManager.loadLevel(1);

        this.resourceManager.onLevelLoaded.subscribe(res => {
            this.level = new Level(res);
        })

        console.log();
    }

    draw(context: DrawableContext): void {
        this.level.draw(context);
    }

}