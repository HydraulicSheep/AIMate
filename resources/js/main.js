var board = null
var game = new Chess()
var run = false;
var displayGame = game;
var moveStack = [];
var highlighted = null;
var bot1;
var bot2;


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
            var history = displayGame.history();
            var turnNum = Math.round(history.length/2);
            var row = document.getElementById("row"+turnNum.toString());
            if (history.length%2 ==0) {
                updateHighlight(row.children[3]);
            }
            else {
                updateHighlight(row.children[1]);
            }
        }
        else {
            makeMove();
        }
        window.setTimeout(play, 500);
    }
}

function makeMove() {
        var history = game.history();
        var turnNum = Math.floor(history.length/2)+1;
        var row = document.getElementById("row"+turnNum.toString());
        if (row == null) {
            row = addMoveRow()
        }
    
        if (turnNum%2 ==0) {
            game = bot1.move(game);
        }
        else {
            game = bot2.move(game);
        }
        board.position(game.fen());

        var history = game.history();
        var moveText = document.createTextNode(history[history.length-1])
        if (history.length%2 ==0) {
            var currentColumn = row.children[3]
        }
        else {
            var currentColumn = row.children[1]
        }
        currentColumn.appendChild(moveText);
        updateHighlight(currentColumn); 

        var movetable = document.getElementById("moves")
        movetable.appendChild(row)
        movetable.parentElement.scrollTop = movetable.parentElement.scrollHeight;

        // exit if the game is over
        if (game.game_over()) return
}

function addMoveRow() {
    var history = game.history();
    var turnNum = Math.floor(history.length/2)+1;
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
    row.appendChild(white);
    row.appendChild(document.createElement("td"));

    var black = document.createElement("td");
    row.appendChild(black);
    row.appendChild(document.createElement("td"));
    return row;
}

function updateHighlight(element) {
    if (highlighted != null) {
        highlighted.setAttribute("class","");
    }
    element.setAttribute("class","highlighted");
    highlighted = element;

}
    
function init() {
var config = {
        pieceTheme: 'libraries/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
        position: 'start'
    }

    board = ChessBoard('myBoard', config);
    $(window).resize(board.resize);
}

function start() {
    bot1 = new randomBot(game);
    bot2 = new randomBot(game);
    var overLay = document.getElementById("boardInfo");
    overLay.style.display = "none";
    var controls = document.getElementById("controls");
    controls.style.display = "inline";
    pauseButton();
}