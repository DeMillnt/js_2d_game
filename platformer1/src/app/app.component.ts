import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GameManager } from './gameLogic/gameManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'platformer1';
  private gameManager: GameManager = {} as GameManager;

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit() {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.gameManager = new GameManager(canvas, this.http);
    this.gameManager.beginGameLoop();
  }
}
