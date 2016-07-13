function Table(canvas, cellDimension, cellPadding) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.cellDimension = cellDimension;
  this.cellPadding = cellPadding;
}

Table.prototype.clear = function () {
  this.context.clearRect(0, 0, canvas.width, canvas.height);
}

Table.prototype.initCell = function (i, j, state) {
  var 
  	x = (this.cellDimension + this.cellPadding) * i + this.cellPadding,
  	y = (this.cellDimension + this.cellPadding) * j + this.cellPadding, 
  	colorOff = '#66b5ff',
  	colorOn = '#dd6797',
  	color = state ? colorOn : colorOff;

  this.setCellStyle(x, y, this.cellDimension, this.cellDimension, color);
}

Table.prototype.setCellStyle = function (x, y, w, h, color) {
  this.context.fillStyle = color;
  this.context.fillRect(x, y, w, h);
}