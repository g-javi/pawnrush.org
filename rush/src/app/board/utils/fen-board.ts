import { emptyBoard, getFileRank } from './chess-utils';

export class FenBoard {
  private _board: any;

  constructor(fen) {
    this._board = emptyBoard();
    this.fen = fen;
  }

  get board() {
    return this._board;
  }

  /**
   * Gets the piece at a square
   */
  piece(square) {
    const [file, rank] = getFileRank(square);
    return this.getPiece(file, rank);
  }

  /**
   * Places a piece in the given square.
   */
  put(square, piece) {
    const [file, rank] = getFileRank(square);
    this.setPiece(file, rank, piece);
  }

  /**
   * Removes the piece at the given square.
   */
  clear(square) {
    this.put(square, '');
  }

  /**
   * Moves a piece.
   */
  move(from, to) {
    const piece = this.piece(from);
    if (!piece) {
      throw new Error('Move Error: the from square was empty');
    }
    this.put(to, piece);
    this.clear(from);
  }

  /**
   * Set the current position.
   *
   */
  set fen(fen) {
    // reset board
    this._board.forEach((r) => { r.length = 0; });

    if (!fen) {
      return;
    }

    if (fen === 'start') {
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    }

    let rank = 0;
    let file = 0;
    let fenIndex = 0;

    let fenChar;
    let count;

    while (fenIndex < fen.length) {
      fenChar = fen[fenIndex];

      if (fenChar === ' ') {
        break; // ignore the rest
      }
      if (fenChar === '/') {
        rank++;
        file = 0;
        fenIndex++;
        continue;
      }

      if (isNaN(parseInt(fenChar, 10))) {
        this.setPiece(file, rank, fenChar);
        file++;
      } else {
        count = parseInt(fenChar, 10);
        for (let i = 0; i < count; i++) {
          this.setPiece(file, rank, '');
          file++;
        }
      }

      fenIndex++;
    }
  }

  /**
   * Get the current position as FEN.
   */
  get fen() {
    const fen = [];
    for (let i = 0; i < 8; i++) {
      let empty = 0;
      for (let j = 0; j < 8; j++) {
        const piece = this.getPiece(j, i);
        if (piece) {
          if (empty > 0) {
            fen.push(empty);
            empty = 0;
          }
          fen.push(piece);
        } else {
          empty++;
        }
      }
      if (empty > 0) {
        fen.push(empty);
      }
      fen.push('/');
    }
    fen.pop();
    return fen.join('');
  }

  private setPiece(file, rank, fenChar) {
    this._board[rank][file] = fenChar;
  }

  private getPiece(file, rank) {
    return this._board[rank][file];
  }
}
