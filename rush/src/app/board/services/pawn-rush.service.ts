import { Injectable } from '@angular/core';
import * as Chess from 'chess.js';
import { BehaviorSubject } from 'rxjs';
import { ChessInstance } from '../models/pawn-rush.models';
import { FenBoard } from '../utils/fen-board';
import { MatDialog } from '@angular/material';
import { DiceDialogComponent } from 'src/app/shared/components/dice-dialog/dice-dialog.component';
import { transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class PawnRushService {

  private _gameInstance: ChessInstance;
  private _squareMoves: string[];
  private _fenBoard: FenBoard;
  private _fenBoardSubject: BehaviorSubject<any>;

  constructor(private _dialog: MatDialog) {
    this._gameInstance = new Chess();
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
    const result = this._gameInstance.move(move);

    if (result) {
      console.log(result);
      if (!!result.captured) {
        this._gameInstance.undo();
        this._fenBoard.fen = this._gameInstance.fen();
        this._fenBoardSubject.next(this._fenBoard.board);
        const dialogRef = this._dialog.open(DiceDialogComponent);

        dialogRef.afterClosed().subscribe(data => {
          let piece;
          if (data) {
            this._gameInstance.move(move);
            this._fenBoard.fen = this._gameInstance.fen();
            this._fenBoardSubject.next(this._fenBoard.board);
            piece = event.previousContainer.data[0];
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);

            if (event.container.data.length !== 1) {
              event.container.data.pop();
              event.container.data.pop();
              event.container.data.push(piece);
            }
          } else {
            piece = event.container.data[0];
            transferArrayItem(event.container.data,
              event.previousContainer.data,
              event.previousIndex,
              event.currentIndex);

            if (event.previousContainer.data.length !== 1) {
              // event.previousContainer.data.pop();
              // event.previousContainer.data.pop();
              event.previousContainer.data.push(piece);
            }
          }
          console.log(`Dialog result: ${piece}`, event.previousContainer.data);

        });
        return;
      }
      // this._fenBoard.fen = this._gameInstance.fen();
      // this._fenBoardSubject.next(this._fenBoard.board);
    }
    return result;
  }
}
