import { Component, OnInit, Input } from '@angular/core';
import { SquareLabel } from '../../models/square.models';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  alpha = 'abcdefgh'.split('');
  squareColor = true;
  rowLength = [...Array(8)];

  @Input() orientation: string; // = 'black';

  constructor() { }

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
