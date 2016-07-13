function BoardGame(canvas, dimension) {
  this.GRID_WIDTH = dimension;
  this.GRID_HEIGHT = dimension;
  this.CELL_PADDING = 4;
  this.CELL_WIDTH = (1280-(dimension*this.CELL_PADDING))/dimension;
  this.cells = this._initMatrix();
  this.table = new Table(canvas, this.CELL_WIDTH, this.CELL_PADDING);
  this.canvas = canvas;
  this.cellSelected = 0;
  this.numberOfMoves = 0;
}

BoardGame.prototype._initMatrix = function (opt_val) {
  var 
    matrix = [],
    i,
    j,
    row;

  for (i = 0; i < this.GRID_WIDTH; i++) {
    row = [];
    for (j = 0; j < this.GRID_HEIGHT; j++) {
      row.push(opt_val);
    }
    matrix.push(row);
  }

  return matrix;
}

BoardGame.prototype.init = function () {
  this.initRandomCell();
  this.canvas.onclick = this.handleClickEvent.bind(this);
  this.show();
}

BoardGame.prototype.getRandomNumber = function (range) {
  return Math.floor(Math.random()*(range) + 1);
}

BoardGame.prototype.initRandomCell = function () {
  var
    numbersOfRandomCell = this.getRandomNumber((this.GRID_HEIGHT*2)-3),
    x,
    y,
    i;

    for(i = 0; i < numbersOfRandomCell; i++) {
      x = this.getRandomNumber(this.GRID_HEIGHT-1);
      y = this.getRandomNumber(this.GRID_HEIGHT-1);
      this.toggleCellState(x, y);
    }
  
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
  this.incrementMoves();
  if (this.isOver()) {
    hideCanvas();
    hideCounter();
    showMessage(this.numberOfMoves);
  } 
}

BoardGame.prototype.toggleCellState = function (x, y) {
  if (x < 0 || x >= this.GRID_WIDTH) return;
  if (y < 0 || y >= this.GRID_HEIGHT) return;
  this.cells[x][y] = !this.cells[x][y];
  var incrementValue = this.cells[x][y] ? 1 : -1;
  this.incrementSelectedCell(incrementValue);
}

BoardGame.prototype.incrementSelectedCell = function (value) {
  this.cellSelected += value;
}

BoardGame.prototype.incrementMoves = function () {
  this.numberOfMoves++;
  moves.innerHTML = this.numberOfMoves;
}

BoardGame.prototype.isOver = function (value) {
  return this.cellSelected === this.GRID_WIDTH * this.GRID_HEIGHT;
}

BoardGame.prototype.getItem = function (x, y) {
  var 
    tile = this.CELL_WIDTH + this.CELL_PADDING,
    overflowX = x > (this.CELL_WIDTH + this.CELL_PADDING) * this.GRID_WIDTH,
    overflowY = y > (this.CELL_WIDTH + this.CELL_PADDING) * this.GRID_WIDTH;

  if (overflowX || overflowY) return null;  

  if (x % tile > this.CELL_PADDING && y % tile > this.CELL_PADDING) {
    return [Math.floor(x / tile), Math.floor(y / tile)];
  } else {
    return null;
  }
}

BoardGame.prototype.show = function () {  
  var i, j;
  this.table.clear();
  
  for (i = 0; i < this.GRID_WIDTH; i++) {
    for (j = 0; j < this.GRID_HEIGHT; j++) {
      this.table.initCell(i, j, this.cells[i][j]);
    }
  }
};