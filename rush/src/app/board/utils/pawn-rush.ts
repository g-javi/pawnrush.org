// tslint:disable:no-bitwise

class PawnRush {
  private BLACK = 'b';
  private WHITE = 'w';

  private EMPTY = -1;

  private PAWN = 'p';
  private KNIGHT = 'n';
  private BISHOP = 'b';
  private ROOK = 'r';
  private QUEEN = 'q';
  private KING = 'k';

  private SYMBOLS = 'pnbrqkPNBRQK';

  private DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  private POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*'];

  private PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15]
  };

  private PIECE_OFFSETS = {
    n: [-18, -33, -31, -14,  18, 33, 31,  14],
    b: [-17, -15,  17,  15],
    r: [-16,   1,  16,  -1],
    q: [-17, -16, -15,   1,  17, 16, 15,  -1],
    k: [-17, -16, -15,   1,  17, 16, 15,  -1]
  };

  // tslint:disable:whitespace

  private ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];

  private RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  // tslint:enable:whitespace

  private SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };

  private FLAGS = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q'
  };

  private BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64
  };

  private RANK_1 = 7;
  private RANK_2 = 6;
  private RANK_3 = 5;
  private RANK_4 = 4;
  private RANK_5 = 3;
  private RANK_6 = 2;
  private RANK_7 = 1;
  private RANK_8 = 0;

  private SQUARES = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  private ROOKS = {
    w: [{ square: this.SQUARES.a1, flag: this.BITS.QSIDE_CASTLE},
      { square: this.SQUARES.h1, flag: this.BITS.KSIDE_CASTLE}],
    b: [{ square: this.SQUARES.a8, flag: this.BITS.QSIDE_CASTLE},
      { square: this.SQUARES.h8, flag: this.BITS.KSIDE_CASTLE}]
  };

  private board = new Array(128);
  private kings = {w: this.EMPTY, b: this.EMPTY};
  private turn = this.WHITE;
  private castling = {w: 0, b: 0};
  private ep_square = this.EMPTY;
  private half_moves = 0;
  private move_number = 1;
  private history = [];
  private header = {};

  constructor(private _fen?: string) {
    if (typeof _fen === 'undefined') {
      this.load(this.DEFAULT_POSITION);
    } else {
      this.load(_fen);
    }
  }

  reset() {
    this.load(this.DEFAULT_POSITION);
  }

  generate_fen() {
    let empty = 0;
    let fen = '';

    for (let i = this.SQUARES.a8; i <= this.SQUARES.h1; i++) {
      if (this.board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        const color = this.board[i].color;
        const piece = this.board[i].type;

        fen += (color === this.WHITE) ?
                 piece.toUpperCase() : piece.toLowerCase();
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty;
        }

        if (i !== this.SQUARES.h1) {
          fen += '/';
        }

        empty = 0;
        i += 8;
      }
    }

    let cflags = '';
    if (this.castling[this.WHITE] & this.BITS.KSIDE_CASTLE) { cflags += 'K'; }
    if (this.castling[this.WHITE] & this.BITS.QSIDE_CASTLE) { cflags += 'Q'; }
    if (this.castling[this.BLACK] & this.BITS.KSIDE_CASTLE) { cflags += 'k'; }
    if (this.castling[this.BLACK] & this.BITS.QSIDE_CASTLE) { cflags += 'q'; }

    /* do we have an empty castling flag? */
    cflags = cflags || '-';
    const epflags = (this.ep_square === this.EMPTY) ? '-' : this.algebraic(this.ep_square);

    return [fen, this.turn, cflags, epflags, this.half_moves, this.move_number].join(' ');
  }

  algebraic(i) {
    const f = this.file(i), r = this.rank(i);
    return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);
  }

  rank(i) {
    return i >> 4;
  }

  file(i) {
    return i & 15;
  }

  is_digit(c) {
    return '0123456789'.indexOf(c) !== -1;
  }

  swap_color(c) {
    return c === this.WHITE ? this.BLACK : this.WHITE;
  }

  update_setup(fen) {
    if (this.history.length > 0) { return; }

    if (fen !== this.DEFAULT_POSITION) {
      this.header['SetUp'] = '1';
      this.header['FEN'] = fen;
    } else {
      delete this.header['SetUp'];
      delete this.header['FEN'];
    }
  }

  clear() {
    this.board = new Array(128);
    this.kings = { w: this.EMPTY, b: this.EMPTY };
    this.turn = this.WHITE;
    this.castling = { w: 0, b: 0 };
    this.ep_square = this.EMPTY;
    this.half_moves = 0;
    this.move_number = 1;
    this.history = [];
    this.header = {};
    this.update_setup(this.generate_fen());
  }

  load(fen) {
    const tokens = fen.split(/\s+/);
    const position = tokens[0];
    let square = 0;

    if (!this.validate_fen(fen).valid) {
      return false;
    }

    this.clear();

    for (let i = 0; i < position.length; i++) {
      const piece = position.charAt(i);

      if (piece === '/') {
        square += 8;
      } else if (this.is_digit(piece)) {
        square += parseInt(piece, 10);
      } else {
        const color = (piece < 'a') ? this.WHITE : this.BLACK;
        this.put({ type: piece.toLowerCase(), color: color }, this.algebraic(square));
        square++;
      }
    }

    this.turn = tokens[1];

    // tslint:disable:no-bitwise
    if (tokens[2].indexOf('K') > -1) {
      this.castling.w |= this.BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('Q') > -1) {
      this.castling.w |= this.BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf('k') > -1) {
      this.castling.b |= this.BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf('q') > -1) {
      this.castling.b |= this.BITS.QSIDE_CASTLE;
    }

    this.ep_square = (tokens[3] === '-') ? this.EMPTY : this.SQUARES[tokens[3]];
    this.half_moves = parseInt(tokens[4], 10);
    this.move_number = parseInt(tokens[5], 10);

    this.update_setup(this.generate_fen());

    return true;
  }

  get(square) {
    const piece = this.board[this.SQUARES[square]];
    return (piece) ? { type: piece.type, color: piece.color } : null;
  }

  put(piece, square) {
    /* check for valid piece object */
    if (!('type' in piece && 'color' in piece)) {
      return false;
    }

    /* check for piece */
    if (this.SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }

    /* check for valid square */
    if (!(square in this.SQUARES)) {
      return false;
    }

    const sq = this.SQUARES[square];

    /* don't let the user place more than one king */
    if (piece.type === this.KING &&
      !(this.kings[piece.color] === this.EMPTY || this.kings[piece.color] === sq)) {
      return false;
    }

    this.board[sq] = { type: piece.type, color: piece.color };
    if (piece.type === this.KING) {
      this.kings[piece.color] = sq;
    }

    this.update_setup(this.generate_fen());

    return true;
  }

  validate_fen(fen) {
    const errors = {
      0: 'No errors.',
      1: 'FEN string must contain six space-delimited fields.',
      2: '6th field (move number) must be a positive integer.',
      3: '5th field (half move counter) must be a non-negative integer.',
      4: '4th field (en-passant square) is invalid.',
      5: '3rd field (castling availability) is invalid.',
      6: '2nd field (side to move) is invalid.',
      7: '1st field (piece positions) does not contain 8 \'/\'-delimited rows.',
      8: '1st field (piece positions) is invalid [consecutive numbers].',
      9: '1st field (piece positions) is invalid [invalid piece].',
      10: '1st field (piece positions) is invalid [row too large].',
      11: 'Illegal en-passant square',
    };

    /* 1st criterion: 6 space-seperated fields? */
    const tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] };
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(tokens[5]) || (parseInt(tokens[5], 10) <= 0)) {
      return { valid: false, error_number: 2, error: errors[2] };
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(tokens[4]) || (parseInt(tokens[4], 10) < 0)) {
      return { valid: false, error_number: 3, error: errors[3] };
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, error_number: 4, error: errors[4] };
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, error_number: 5, error: errors[5] };
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, error_number: 6, error: errors[6] };
    }

    /* 7th criterion: 1st field contains 8 rows? */
    const rows = tokens[0].split('/');
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] };
    }

    /* 8th criterion: every row is valid? */
    for (let i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      let sum_fields = 0;
      let previous_was_number = false;

      for (let k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] };
          }
          sum_fields += parseInt(rows[i][k], 10);
          previous_was_number = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] };
          }
          sum_fields += 1;
          previous_was_number = false;
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] };
      }
    }

    if ((tokens[3][1] === '3' && tokens[1] === 'w') ||
      (tokens[3][1] === '6' && tokens[1] === 'b')) {
      return { valid: false, error_number: 11, error: errors[11] };
    }

    /* everything's okay! */
    return { valid: true, error_number: 0, error: errors[0] };
  }

  set_header(args) {
    for (let i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' &&
        typeof args[i + 1] === 'string') {
        this.header[args[i]] = args[i + 1];
      }
    }
    return this.header;
  }

  remove(square) {
    const piece = this.get(square);
    this.board[this.SQUARES[square]] = null;
    if (piece && piece.type === this.KING) {
      this.kings[piece.color] = this.EMPTY;
    }

    this.update_setup(this.generate_fen());

    return piece;
  }

  build_move(board, from, to, flags, promotion) {
    const move = {
      color: this.turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type
    };

    if (promotion) {
      move.flags |= this.BITS.PROMOTION;
      (move as any).promotion = promotion;
    }

    if (board[to]) {
      (move as any).captured = board[to].type;
    } else if (flags & this.BITS.EP_CAPTURE) {
      (move as any).captured = this.PAWN;
    }
    return move;
  }
}
