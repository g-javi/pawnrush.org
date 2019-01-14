import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as PawnRush from '../utils/pawn-rush.class.js';
import { BehaviorSubject } from 'rxjs';
import { DiceDialogComponent } from 'src/app/shared/components/dice-dialog/dice-dialog.component';
import { ChessInstance } from '../models/pawn-rush.models';
import { FenBoard } from '../utils/fen-board';

@Injectable({
  providedIn: 'root'
})
export class PawnRushService {

  private _gameInstance: ChessInstance;
  private _squareMoves: string[];
  private _fenBoard: FenBoard;
  private _fenBoardSubject: BehaviorSubject<any>;

  constructor(private _dialog: MatDialog) {
    this._gameInstance = new PawnRush();
    this._fenBoard = new FenBoard(this._gameInstance.fen());
    this._fenBoardSubject = new BehaviorSubject(this._fenBoard.board);
    (window as any).chess = this._gameInstance;
  }

  get squareMoves() {
    return this._squareMoves;
  }

  get fenBoard() {
    return this._fenBoardSubject.asObservable();
  }

  moves(square: string) {
    this._squareMoves = this._gameInstance.moves({ square: square });
    return this._squareMoves;
  }

  move(move: any, event: any) {
    const containerPiece = this._gameInstance.get(event.container.id);
    const result = this._gameInstance.move(move);

    if (result) {
      if (!!result.captured) {
        this._dialog.open(DiceDialogComponent).afterClosed().subscribe(data => {
          let piece;
          if (data) {
            event.container.data.pop();
            piece = event.previousContainer.data.pop();

            if (!!result.promotion) {
              if (result.color === 'w') {
                piece = 'Q';
              } else {
                piece = 'q';
              }
            }

            event.container.data.push(piece);
          } else {
            this._gameInstance.remove(event.container.id);

            event.previousContainer.data.pop();
            piece = event.container.data.pop();

            if (containerPiece.type === 'p') {
              if (event.previousContainer.id.includes('8') && containerPiece.color === 'w') {
                containerPiece.type = 'q';
                piece = 'Q';
              } else if (event.previousContainer.id.includes('1') && containerPiece.color === 'b') {
                containerPiece.type = 'q';
                piece = 'q';
              }
            }

            this._gameInstance.put(containerPiece, event.previousContainer.id);

            // change board state
            event.previousContainer.data.push(piece);
          }
          this._fenBoard.fen = this._gameInstance.fen();
          this._fenBoardSubject.next(this._fenBoard.board);
          console.log(this._fenBoard.board);
        });
        return;
      }
    }
    this._fenBoard.fen = this._gameInstance.fen();
    this._fenBoardSubject.next(this._fenBoard.board);
    return result;
  }

  private flip() {
    // // const gamePGN = this._gameInstance.pgn();
    // let tokens = this._gameInstance.fen().split(' ');
    // tokens[1] = tokens[1] === 'w' ? 'b' : 'w';
    // this._gameInstance.load(tokens.join(' '));
    // tokens = this._gameInstance.fen().split(' ');
    // tokens[1] = tokens[1] === 'w' ? 'b' : 'w';
    // // this._gameInstance.load_pgn(gamePGN);
    // function set_turn(chess, color) {
    // const color = this._gameInstance.turn() === 'w' ? 'b' : 'w';
    // const tokens = this._gameInstance.fen().split(' ');
    // tokens[1] = color;
    // this._gameInstance.load(tokens.join(' '));
  }
}
