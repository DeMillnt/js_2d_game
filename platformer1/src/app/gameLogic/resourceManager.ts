import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Position } from "./dto/position";
import { TextureEnum } from "./dto/TextureEnum";
import { AnimatedTile } from "./gameObjects/animatedTile";
import { GameObject } from "./gameObjects/gameObject";
import { Texture } from "./gameObjects/texture";
import { Tile } from "./gameObjects/tile";

export class ResourceManager {

    public onLevelLoaded = new Subject<GameObject[]>();

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

    loadLevel(count: number) {
        this.loadImages();
        this.loadJson();

        let levelUrl = "assets/levels/1.txt";
        this.resourcesToLoad.push(levelUrl);
        this.get(levelUrl, (res) => {
            this.level = res;
        }, { responseType: "text" });
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
            this.textures.push(new Texture(Number(t.id), t.name, p, image, textureType));
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

                ids.forEach(id => {
                    let gameObject = this.getGameObject(id);
                    if (gameObject) {
                        gameObject.position.x = xCoor;
                        gameObject.position.y = yCoor;
                        if (gameObject) {
                            res.push(gameObject);
                        }
                    }
                });
            });
        });

        return res;
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
    }

    private getGameObject(id: number): GameObject | null {
        let textures = this.getTexturesById(id);
        if (textures.length == 0) {
            return null;
        }
        else if (textures.length == 1) {
            return new Tile(textures[0], new Position(0, 0, textures[0].position.width, textures[0].position.height));
        } else {
            return new AnimatedTile(textures, new Position(0, 0, textures[0].position.width, textures[0].position.height));
        }


    }

    private getTexturesById(id: number): Texture[] {
        let textures = this.textures.filter(t => t.id == id);
        let a = this.animatedTextures.get(id);
        textures = textures.concat(this.animatedTextures?.get(id) ?? []);

        return textures;
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
        let gameObjects = this.parseLevel(this.level);
        this.onLevelLoaded.next(gameObjects);
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