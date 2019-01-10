import { Component, OnInit } from '@angular/core';
import * as Chess from 'chess.js';
import FENBoard from 'fen-chess-board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  state = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`;
  constructor() { }

  ngOnInit() {
    (window as any).chess = new Chess();

    (window as any).fenBoard = new FENBoard(this.state);
  }

}
