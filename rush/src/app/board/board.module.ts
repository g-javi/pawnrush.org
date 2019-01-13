import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './components/board/board.component';
import { PieceComponent } from './components/piece/piece.component';
import { RowComponent } from './components/row/row.component';
import { SquareComponent } from './components/square/square.component';
import { PawnRushService } from './services/pawn-rush.service';

@NgModule({
  declarations: [BoardComponent, RowComponent, PieceComponent, SquareComponent],
  imports: [
    SharedModule
  ],
  exports: [
    BoardComponent
  ],
  providers: [
    PawnRushService
  ]
})
export class BoardModule { }
