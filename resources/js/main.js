var board = null
var game = new Chess()
var run = true;
var displayGame = game;
var moveStack = [];


function pause () {
    if (run) {
        run = false;
        var button = document.getElementById("playButton");
        button.setAttribute("class","fas fa-play middlecol")
    }
    else {
        run = true;
        makeRandomMove();
        var button = document.getElementById("playButton");
        button.setAttribute("class","fas fa-pause middlecol");
    }
    
}

function stepBack () {
    if (displayGame.history().length>0) {
        run = false;
        moveStack.push(displayGame.undo())
        board.position(displayGame.fen())
    }
}

function stepForward () {
    if (moveStack.length>0) {
        displayGame.move(moveStack.shift());
        board.position(displayGame.fen())
    }
    else {
        run = true;
        makeRandomMove();
        run = false;
        displayGame = game;
    }
    
}

function makeRandomMove () {
    if (run) {
    var history = game.history();
    var possibleMoves = game.moves();
    var turnNum = Math.floor(history.length/2)+1;
    var row = document.getElementById("row"+turnNum.toString());
    if (row == null) {
        var col = document.createElement("td");
        row = document.createElement("tr")
        row.setAttribute("id","row"+turnNum.toString())
        if (turnNum%2 ==0) {
            row.setAttribute("class","even")
        }
        else {
            row.setAttribute("class","odd")
        }
        var node = document.createTextNode(turnNum.toString()+".");
        col.appendChild(node);
        row.appendChild(col);
    }
    
    
    // exit if the game is over
    if (game.game_over()) return

    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    game.move(possibleMoves[randomIdx])
    board.position(game.fen())


    var history = game.history();
    if (history.length>0) {
        var col2 = document.createElement("td");
        var col3 = document.createElement("td");
        var node2 = document.createTextNode(history[history.length-1])
        col2.appendChild(node2);
        row.appendChild(col2);
        row.appendChild(col3);
    }
    var movetable = document.getElementById("moves")
    movetable.appendChild(row)
    window.setTimeout(makeRandomMove, 500)
    
        
    }
    
}
    var config = {
        pieceTheme: 'libraries/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
        position: 'start'
    }
    board = ChessBoard('myBoard', config);
    $(window).resize(board.resize);
    window.setTimeout(makeRandomMove, 500);
        