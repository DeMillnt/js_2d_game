import { HttpClient } from "@angular/common/http";
import { Position } from "./dto/position";
import { TextureEnum } from "./dto/TextureEnum";
import { GameObject } from "./gameObjects/gameObject";
import { Texture } from "./gameObjects/texture";

export class ResourceManager {

    private resourcesToLoad: string[] = [];
    private level = "";
    private static TILE_SIZE = 64; //todo: find better solution
    private textures: Texture[] = [];
    private animatedTextures: Map<number, Texture[]> = new Map();
    private animatedTexturesIds: Map<string, number> = new Map();
    private jsonUrls = ["assets/spritesheet_tiles.json", "assets/spritesheet_other.json", "assets/spritesheet_items.json"];
    private jsonAnimateUrls = ["assets/spritesheet_players.json", "assets/spritesheet_enemies.json"];
    private imageUrls = this.jsonUrls.concat(this.jsonAnimateUrls).map(url => url.replace(".json", ".png"));
    private images: Map<string, HTMLImageElement> = new Map();

    constructor(private http: HttpClient) {
        this.resourcesToLoad = this.imageUrls.concat(this.jsonAnimateUrls).concat(this.jsonUrls);
    }

    loadLevel(count: number): GameObject[] {
        this.get("assets/levels/1.txt", (res) => {
            this.level = res;
            this.parseLevel(this.level);
        }, { responseType: "text" });

        this.loadImages();
        this.loadJson();

        return [];
    }

    private loadJson() {
        this.jsonUrls.forEach(url => {
            this.get(url, (res) => {
                this.mapTexture(res, TextureEnum.Simple, url);
            });
        });
        this.jsonAnimateUrls.forEach(url => {
            this.get(url, (res) => {
                this.mapTexture(res, TextureEnum.Animated, url);
            });
        });
    }

    private mapTexture(res: any, textureType: TextureEnum, url: string) {
        res.SubTexture.forEach(t => {
            let p = new Position(t.x, t.y, t.width, t.height);
            let image = this.images?.get(url.replace(".json", ".png")) ?? new Image();
            this.textures.push(new Texture(t.id, t.name, p, image, textureType));
        });
    }

    private parseLevel(level: string): GameObject[] {
        let res: GameObject[] = [];
        let rows = level.split('\n');
        rows.forEach((row, y) => {
            row.split(' ').forEach((cell, x) => {
                let ids = cell.split(',').map(c => Number(c));
                let xCoor = x * ResourceManager.TILE_SIZE;
                let yCoor = y * ResourceManager.TILE_SIZE;

                ids = [];
                ids.forEach(id => {
                    let gameObject = this.getGameObject(id);
                    gameObject.position.x = xCoor;
                    gameObject.position.y = yCoor;
                    if (gameObject) {
                        res.push(gameObject);
                    }
                })
            });
        });

        return [];
    }

    private parseAnimatedTextures() {
        let animatedTextures = this.textures.filter(t => t.type == TextureEnum.Animated);
        animatedTextures.forEach(t => {
            let name = t.name.replace(".png", "");
            let numStr = "";
            let frameCount: number | undefined = undefined;
            for (let i = name.length - 1; i >= 0; i--) {
                if (!Number(numStr + name[i])) {
                    frameCount = Number(numStr);
                    name = name.slice(0, name.length - numStr.length);
                    break;
                }
                numStr += name[i];
            }

            let id = this.animatedTexturesIds.get(name);
            if (!id) {                
                this.animatedTexturesIds.set(name, t.id);
                id = t.id;
            }

            let textures = this.animatedTextures?.get(id) ?? [];
            if (frameCount) {
                textures[frameCount - 1] = t;
            } else {
                textures.push(t);
            }
            this.animatedTextures.set(id, textures);
            
        });
        console.log(this.textures);
        console.log(this.animatedTextures);
    }

    private getGameObject(id: number): GameObject {



        return {} as GameObject;
    }

    private loadImages() {
        this.imageUrls.forEach(url => {
            let image = new Image();
            image.src = url;
            this.images.set(url, image);
            image.onload = () => {
                this.resourceLoaded(url);
            }
        });
    }

    private onLoadFinished() {
        this.parseAnimatedTextures();
    }

    private get(url: string, callback, option = {}) {
        this.http.get(url, option).subscribe(res => {
            callback(res);
            this.resourceLoaded(url);
        });
    }

    private resourceLoaded(url: string) {
        this.resourcesToLoad = this.resourcesToLoad.filter(r => r != url);
        if (this.resourcesToLoad.length == 0) {
            this.onLoadFinished();
        }
    }
}