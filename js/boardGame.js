function BoardGame(canvas, dimension) {
  this.cells = this._initMatrix(BoardGame.GRID_WIDTH, BoardGame.GRID_HEIGHT);
  this.dimension = dimension;
  this.table = new Table(canvas, BoardGame.CELL_WIDTH, BoardGame.CELL_PADDING);
  this.canvas = canvas;
  this.cellSelected = 0;
  this.numberOfMoves = 0;
}

  BoardGame.CELL_WIDTH = (1280 - 3*4 ) /3;
  BoardGame.CELL_PADDING = 4;
  BoardGame.GRID_WIDTH = 3;
  BoardGame.GRID_HEIGHT = 3;

BoardGame.prototype._initMatrix = function (width, height, opt_val) {
  var 
  	matrix = [],
  	i,
  	j,
  	row;

  for (i = 0; i < width; i++) {
    row = [];
    for (j = 0; j < height; j++) {
      row.push(opt_val);
    }
    matrix.push(row);
  }

  return matrix;
}

BoardGame.prototype.init = function () {
  this.canvas.onclick = this.handleClickEvent.bind(this);
  this.show();
}

BoardGame.prototype.handleClickEvent = function (e) {
  var 
  	rect = this.canvas.getBoundingClientRect(),
  	x = (e.clientX - rect.left) * 2, 
  	y = (e.clientY - rect.top) * 2, 
  	cell = this.getItem(x, y);

  if (cell) {
    this.triggerCell(cell[0], cell[1]);
    this.show();
  }
}

BoardGame.prototype.triggerCell = function (x, y) {
  this.toggleCellState(x, y);
  this.toggleCellState(x, y - 1);
  this.toggleCellState(x + 1, y);
  this.toggleCellState(x, y + 1);
  this.toggleCellState(x - 1, y);

  if (this.isOver()) {
    console.log('WINNER!');
    hideCanvas();
  } 
}

BoardGame.prototype.toggleCellState = function (x, y) {
  if (x < 0 || x >= BoardGame.GRID_WIDTH) return;
  if (y < 0 || y >= BoardGame.GRID_HEIGHT) return;

  this.cells[x][y] = !this.cells[x][y];
  var incrementValue = this.cells[x][y] ? 1 : -1;
  this.incrementSelectedCell(incrementValue);
  this.incrementMoves();  
}

BoardGame.prototype.incrementSelectedCell = function (value) {
  this.cellSelected += value;
}

BoardGame.prototype.incrementMoves = function () {
  this.numberOfMoves ++;
}

BoardGame.prototype.isOver = function (value) {
  return this.cellSelected === BoardGame.GRID_WIDTH * BoardGame.GRID_HEIGHT;
}

BoardGame.prototype.getItem = function (x, y) {
  var 
  	tile = BoardGame.CELL_WIDTH + BoardGame.CELL_PADDING,
  	overflowX = x > (BoardGame.CELL_WIDTH + BoardGame.CELL_PADDING) * BoardGame.GRID_WIDTH,
  	overflowY = y > (BoardGame.CELL_WIDTH + BoardGame.CELL_PADDING) * BoardGame.GRID_WIDTH;

  if (overflowX || overflowY) return null;  

  if (x % tile > BoardGame.CELL_PADDING && y % tile > BoardGame.CELL_PADDING) {
    return [Math.floor(x / tile), Math.floor(y / tile)];
  } else {
    return null;
  }
}

BoardGame.prototype.show = function () {  
  var i, j;
  this.table.clear();
  
  for (i = 0; i < BoardGame.GRID_WIDTH; i++) {
    for (j = 0; j < BoardGame.GRID_HEIGHT; j++) {
      this.table.initCell(i, j, this.cells[i][j]);
    }
  }
};