class Chessboard {
  constructor(size) {
    this.chessboard = new Map();
    this.fillChessboard(size);
    this.connectSquares();
  }

  //   create square chessboard
  fillChessboard(size) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.chessboard.set(`${i}${j}`, []);
      }
    }
  }

  //   insert keys of possible moves knight could make
  //   from square into Map's value array
  connectSquares(board = this.chessboard) {
    for (let [square] of board) {
      const x = parseInt(square[0]);
      const y = parseInt(square[1]);
      //   list of all possible moves a knight could make
      const moves = [
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 1, y + 2],
        [x - 1, y - 2],
        [x - 2, y + 1],
        [x - 2, y - 1],
      ];

      for (let move of moves) {
        const key = `${move[0]}${move[1]}`;
        if (board.has(key) && !board.get(square).includes(key)) {
          this.chessboard.get(square).push(key);
        }
      }
    }
  }

  // if pattern === chess, logs real chessboard representation
  // of squares (i.e. (A8) => (B6)), else  logs number coords (i.e. (0,0) => (1,2))
  knightMoves(start, end, pattern) {
    const startKey = `${start[0]}${start[1]}`;
    const endKey = `${end[0]}${end[1]}`;
    const queue = [];
    const paths = [];
    const visitedSquares = new Set();
    queue.push([startKey, [startKey]]);
    while (queue.length > 0) {
      const [current, path] = queue.shift();
      visitedSquares.add(current);
      if (current === endKey) {
        paths.push(path);
      }

      const possibleMoves = this.chessboard.get(current);
      for (let move of possibleMoves) {
        if (!visitedSquares.has(move)) {
          queue.push([move, [...path, move]]);
        }
      }
    }

    this.logRoutes(paths, start, end, pattern);
  }

  // log routes depending on how many of them there are
  // if number of routes > 5 then log first and log an object with others within
  logRoutes(array, start, end, pattern) {
    if (array.length === 1) {
      console.log(`Fastest route from (${start}) to (${end}) is:`);
      console.log(this.renderMoves(array[0], pattern));
    } else if (array.length <= 5) {
      console.log(`Fastest routes from (${start}) to (${end}) are:`);
      for (let path of array) {
        console.log(this.renderMoves(path, pattern));
      }
    } else {
      console.log(`First fastest route from (${start}) to (${end}) is:`);
      console.log(this.renderMoves(array[0], pattern));
      const arr = [];
      for (let i = 1; i < array.length; i++) {
        arr.push(this.renderMoves(array[i], pattern));
      }
      console.log(`Others are:`);
      console.log({ routes: arr });
    }
  }
  // returns a string representation of path taken from start to end
  renderMoves(arr, pattern = "number") {
    let str = "";
    let strChess = "";
    const horizontal = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const vertical = ["8", "7", "6", "5", "4", "3", "2", "1"];
    for (let item of arr) {
      const x = parseInt(item[0]);
      const y = parseInt(item[1]);
      strChess += `(${horizontal[x]}${vertical[y]}) => `;
      str += `(${item.split("")}) => `;
    }

    if (pattern === "chess") {
      return strChess.slice(0, strChess.length - 4);
    } else {
      return str.slice(0, str.length - 4);
    }
  }
}

const chess = new Chessboard(8);
chess.knightMoves([0, 0], [1, 2], "chess");
chess.knightMoves([7, 6], [0, 6]);
chess.knightMoves([2, 4], [2, 6], "chess");
