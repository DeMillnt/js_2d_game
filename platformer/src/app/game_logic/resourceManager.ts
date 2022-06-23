import { HttpClient } from "@angular/common/http";

export class ResourceManager {
    get loadCompleted(): boolean {
        return this.loadResourceCount == this.imageNames.length + this.jsonNames.length;
    }
    private loadResourceCount: number = 0;
    private jsonNames = ["spritesheet_enemies.json", "spritesheet_items.json", "spritesheet_players.json", "spritesheet_tiles.json"];
    private imageNames = ["spritesheet_enemies.png", "spritesheet_items.png", "spritesheet_players.png", "spritesheet_tiles.png"];
    private jsonResults: Array<any> = [];

    constructor(private http: HttpClient) { }

    loadResources() {

        this.jsonNames.forEach(name => {
            this.http.get(`assets/${name}`).subscribe(data => {
                this.jsonResults.push((data as { SubTexture: Array<any> }).SubTexture);
            });
        });

        this.imageNames.forEach(name => {

        });
    }
}