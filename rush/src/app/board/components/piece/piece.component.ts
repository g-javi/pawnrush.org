import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChessPieces } from '../../utils/chess-pieces';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {
  @Input() type: string;

  @ViewChild('dataContainer') dataContainer: ElementRef;

  ngOnInit() {
    this.dataContainer.nativeElement.innerHTML = ChessPieces[this.type];
  }
}
