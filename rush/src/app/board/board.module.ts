import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { RowComponent } from './components/row/row.component';
import { PieceComponent } from './components/piece/piece.component';
import { SquareComponent } from './components/square/square.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BoardComponent, RowComponent, PieceComponent, SquareComponent],
  imports: [
    SharedModule
  ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
