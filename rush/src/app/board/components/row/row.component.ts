import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SquareLabel } from '../../models/square.models';
import { PawnRushService } from '../../services/pawn-rush.service';
import { ALPHA_ROW, NUMERIC_ROW } from '../../utils/chess-utils';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  alpha = ALPHA_ROW;
  squareColor = true;
  rowLength = NUMERIC_ROW;
  board$: Observable<any>;

  @Input() orientation: string; // = 'black';

  constructor(_pawnRush: PawnRushService) {
    this.board$ = _pawnRush.fenBoard;
  }

  ngOnInit() {
    if (this.orientation === 'black') {
      this.alpha = 'hgfedcba'.split('');
    }
  }

  getSquareColor(colNumber) {
    if (colNumber !== 0) {
      this.squareColor = this.squareColor ? false : true;
    }
    return this.squareColor ? 'white' : 'black';
  }

  getSquareLabels(colNumber, rowNumber): SquareLabel {
    const label: SquareLabel = {
      topLabel: undefined,
      bottomLabel: undefined
    };
    label.topLabel = this.orientation === 'black' ? rowNumber + 1 : 8 - rowNumber;
    label.bottomLabel = this.orientation === 'black' ? this.alpha[colNumber] : this.alpha[colNumber];
    return label;
  }
}
