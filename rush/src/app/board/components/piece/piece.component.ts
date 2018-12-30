import { Component, OnInit } from '@angular/core';
import { ChessPieces } from '../../utils/chesspieces';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {
  img = ChessPieces.BlackPawn;
  constructor() { }

  ngOnInit() {
  }

}
