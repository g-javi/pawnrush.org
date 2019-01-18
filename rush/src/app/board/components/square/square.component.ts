import { CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { PawnRushService } from '../../services/pawn-rush.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() color: string;
  @Input() labels: any;
  @Input() xPosition: number;
  @Input() yPosition: string;
  @Input() piece: any;

  data = [];

  constructor(private _pawnRush: PawnRushService) {
  }

  ngOnInit() {
    if (this.piece) {
      this.data.push(this.piece);
    }
  }

  entered(event: CdkDragEnter<string[]>) {
    const moves = this._pawnRush.squareMoves;
    const piece = event.item.dropContainer.data[0] !== 'p' && event.item.dropContainer.data[0] !== 'P' ?
      event.item.dropContainer.data[0].toUpperCase() + event.container.id : event.container.id;
    const elm = event.item.getPlaceholderElement();

    if (event.container.id === event.item.dropContainer.id) {
      // do nothing
    } else if (moves.includes(piece)) { // perform all combination here
      elm.style.backgroundColor = '#63b566';
    } else {
      elm.style.backgroundColor = '#ccc'; // '#a84444';
    }
  }

  exited(event: CdkDragExit<string[]>) {
  }

  started(event: CdkDragStart) {
    this._pawnRush.moves(event.source.dropContainer.id);
  }

  drop(event: CdkDragDrop<string[]>) {
    const move = this._pawnRush.move({
      from: event.previousContainer.id,
      to: event.container.id,
      promotion: 'q' // always promote to a queen for example simplicity
    }, event);

    if (!move) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const data = event.previousContainer.data[0];
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      if (event.container.data.length !== 1) {
        event.container.data.pop();
        event.container.data.pop();
        event.container.data.push(data);
      }
    }
  }
}
