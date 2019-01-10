import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() color: string;
  @Input() labels: string;
  @Input() xPosition: number;
  @Input() yPosition: number;
  @Input() piece: any;

  todo = [];
  constructor() { }

  ngOnInit() {

    if (this.piece) {
      this.todo.push(this.piece);
    }
  }


  drop(event: CdkDragDrop<string[]>) {

    console.log(event.previousContainer);
    let result = (window as any).chess.move(event.container.id);
    const a = event.previousContainer.data[0] === 'k' ? 'K' : event.previousContainer.data[0];
    if (!result) {
      result = (window as any).chess.move(a + event.container.id);
    }
    if (event.container.data.length) {
      console.log(event.previousContainer.id[0] + 'x' + event.container.id);
      result = (window as any).chess.move(event.previousContainer.id[0] + 'x' + event.container.id);

      if (!result) {
        console.log(a + 'x' + event.container.id);

        result = (window as any).chess.move(a + 'x' + event.container.id);
      }
    }
    if (!result) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // event.container.data.pop();
    } else {
      const data = event.previousContainer.data[0];
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('hewe', event.container);
      // (window as any).chess.ascii();
      // console.log(event.container.data);

      if (event.container.data.length !== 1) {
        event.container.data.pop();
        event.container.data.pop();
        event.container.data.push(data);
      }

      // console.log(event.container.data);
      // event.container.data.pop();
    }
  }
}
