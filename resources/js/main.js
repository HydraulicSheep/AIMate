var board = null
var game = new Chess()
var run = false;
var displayGame = game;
var moveStack = [];
var highlighted = null;


function pauseButton () {
    if (run) {
        run = false;
        var button = document.getElementById("playButton");
        button.setAttribute("class","fas fa-play middlecol")
    }
    else {
        run = true;
        var button = document.getElementById("playButton");
        button.setAttribute("class","fas fa-pause middlecol");
        play();
        
    }
    
}


function stepBack () {
    if (displayGame.history().length>0) {
        if (run) {
            pauseButton();
        }
        moveStack.push(displayGame.undo())
        board.position(displayGame.fen())
        if (highlighted != null) {
            highlighted.setAttribute("class","");
        }
        var history = displayGame.history();
        var turnNum = Math.round(history.length/2);
        var row = document.getElementById("row"+turnNum.toString());
        if (history.length%2 ==0) {
            highlighted = row.children[3]
        }
        else {
            highlighted = row.children[1]
        }
        highlighted.setAttribute("class","highlighted")
    }
}

function stepForward () {
    if (run) {
        pauseButton();
    }
    run = true;
    play();
    run = false;
}

function play() {
    if (run) {
        if (moveStack.length>0) {
            displayGame.move(moveStack.pop());
            board.position(displayGame.fen())
            console.log("Pushing move from stack");
            if (highlighted != null) {
                highlighted.setAttribute("class","");
            }
            var history = displayGame.history();
            var turnNum = Math.round(history.length/2);
            var row = document.getElementById("row"+turnNum.toString());
            if (history.length%2 ==0) {
                highlighted = row.children[3]
            }
            else {
                highlighted = row.children[1]
            }
            highlighted.setAttribute("class","highlighted")
        }
        else {
            makeRandomMove();
        }
        window.setTimeout(play, 500);
    }
}

function makeRandomMove () {
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
    
            var white = document.createElement("td");
            //white.setAttribute("class","white")
            row.appendChild(white);
            row.appendChild(document.createElement("td"));
    
            var black = document.createElement("td");
            //black.setAttribute("class","black")
            row.appendChild(black);
            row.appendChild(document.createElement("td"));
        }
        
        
        // exit if the game is over
        if (game.game_over()) return
    
        var randomIdx = Math.floor(Math.random() * possibleMoves.length)
        game.move(possibleMoves[randomIdx])
        board.position(game.fen())
    
    
        var history = game.history();
        if (history.length>0) {
            var node2 = document.createTextNode(history[history.length-1])
           
            if (history.length%2 ==0) {
                var col2 = row.children[3]
            }
            else {
                var col2 = row.children[1]
            }
            col2.appendChild(node2);
            if (highlighted != null) {
                highlighted.setAttribute("class","");
            }
            
            col2.setAttribute("class","highlighted");
            highlighted = col2;
        }
        var movetable = document.getElementById("moves")
        movetable.appendChild(row)
        movetable.parentElement.scrollTop = movetable.parentElement.scrollHeight;
}
    
function init() {
var config = {
        pieceTheme: 'libraries/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
        position: 'start'
    }
    board = ChessBoard('myBoard', config);
    $(window).resize(board.resize);
}      