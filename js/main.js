var 
	canvas = document.getElementById('canvas'),
	counter = document.getElementById('counter'),
	message = document.getElementById('message'),
	moves = document.getElementById('moves');

document.getElementById('play').onclick = function() {
	var 
		size = getSize(),
		boardGame;
	if (size) {
		hideMessage();
		showCanvas();
		showCounter();
		resetMoves();
		boardGame = new BoardGame(canvas, size);
		boardGame.init();
	}
};

function hideCanvas() {	
	canvas.style.display = 'none';
}

function showCanvas() {	
	canvas.style.display = 'block';
}

function hideCounter() {	
	counter.style.display = 'none';
}

function showCounter() {	
	counter.style.display = 'block';
}

function showMessage(numberOfMoves) {	
	var
		msg = 'You solved the problem using ' + numberOfMoves + ' moves';
		node = document.createElement('H3'),
		textnode = document.createTextNode(msg);

	node.appendChild(textnode);
	message.appendChild(node);
	message.style.display = 'block';
}

function hideMessage() {	
	message.style.display = 'none';
}

function getSize() {
	return document.getElementById('size').value;
}

function resetMoves() {
	moves.innerHTML = 0;
}