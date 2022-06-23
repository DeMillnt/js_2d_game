import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameManager } from './game_logic/gameManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'platformer';
  constructor(private http: HttpClient) {

  }

  ngAfterViewInit(): void {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    new GameManager(canvas, this.http);
  }
}
