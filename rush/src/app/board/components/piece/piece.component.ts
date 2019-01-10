import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ChessPieces } from '../../utils/chesspieces';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {
  // img = ChessPieces.WhitePawn;

  @Input() type: string;
  @ViewChild('dataContainer') dataContainer: ElementRef;


  constructor() { }

  ngOnInit() {
    this.dataContainer.nativeElement.innerHTML = ChessPieces[this.type];
  }

}
