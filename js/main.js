var canvas = document.getElementById('canvas');

document.getElementById('play').onclick = function() {
    //canvas.style.display = 'block';
    //var b = new Board(canvas);
	//b.init();
	showCanvas();
	var b = new BoardGame(canvas, 4);
	b.init();
};

function hideCanvas() {	
	canvas.style.display = 'none';
}

function showCanvas() {	
	canvas.style.display = 'block';
}