var board = null
var $board = $('#myBoard')
var game = new Chess()
var run = false;
var displayGame = game;
var moveStack = [];
var highlighted = null;
var bot1;
var bot2;
var useAnimation = true;
var $board;
const BotTypes = Object.freeze({"random":1, "minimax":2, "neural":3});
var squareToHighlight = null;

$(document).on("keydown", function (e) {
    console.log(e.which);
    switch (e.which) {
        case 32: pauseButton(); break;
        case 37: stepBack(); break;
        case 39: stepForward(); break;
    }
});

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
        useAnimation = false;
        board.position(displayGame.fen(),useAnimation)
        useAnimation = true;
        updateHighlight(displayGame);
        display(displayGame);
    }
}

function stepForward () {
    if (run) {
        pauseButton();
    }
    run = true;
    useAnimation = false;
    play();
    useAnimation = true;
    run = false;
}

function play() {
    if (run) {
        if (moveStack.length>0) {
            displayGame.move(moveStack.pop());
            board.position(displayGame.fen(),useAnimation)
            console.log("Pushing move from stack");
            updateHighlight(displayGame);
            display(displayGame);
        }
        else {
            makeMove();
            display(game);
        }
        
        window.setTimeout(play, 500);
    }
}

function makeMove() {
        var history = game.history();
        var turnNum = Math.floor(history.length/2)+1;

        //Makes a new row for the current move if it doesn't exist.
        var row = document.getElementById("row"+turnNum.toString());
        if (row == null) {
            row = addMoveRow()
        }
        var movetable = document.getElementById("moves")
        movetable.appendChild(row)
        movetable.parentElement.scrollTop = movetable.parentElement.scrollHeight;

        //Requests the move from the relevant bots
        console.log(history.length);
        if (history.length%2 ==0) {
            console.log("bot 1 move");
            move = bot1.think(game);
            game.move(move.choice)
        }
        else {
            move = bot2.think(game);
            game.move(move.choice)
        }
        squareToHighlight = move.choice.to
        board.position(game.fen(),useAnimation);
        
        
        //Gets move just made in game and adds it to the table
        var history = game.history();
        var moveText = document.createTextNode(history[history.length-1])
        currentColumn = updateHighlight(game);
        currentColumn.appendChild(moveText);
        

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

function updateHighlight(currentGame) {
    var history = currentGame.history();
    var turnNum = Math.floor((history.length+1)/2);
    var row = document.getElementById("row"+turnNum.toString());
    
    if (highlighted != null) {
        highlighted.setAttribute("class","");
    }
    if (history.length%2 ==0) {
        document.getElementById("bot1").style.backgroundColor = "grey";
        document.getElementById("bot2").style.backgroundColor = "";
    }
    else{
        document.getElementById("bot2").style.backgroundColor = "grey";
        document.getElementById("bot1").style.backgroundColor = "";

    }

    if (row != null) {
        if (history.length%2 ==0) {
            element = row.children[3];
            console.log("Running 0 path")
        
        }
        else {
        element = row.children[1];
        
        }
        element.setAttribute("class","highlighted");
        highlighted = element;
        return element;
    }
    return null;

}

function display(givenGame) {
    var history = givenGame.history();
    if (history.length%2 ==0) {
        console.log("Displaying bot1 info");
        bot1.display(givenGame)
    }
    else {
        bot2.display(givenGame)
    }

}
 
    
function init() {
var config = {
        pieceTheme: 'libraries/chessboardjs/img/chesspieces/wikipedia/{piece}.png',
        position: 'start',
        onMoveEnd: onMoveEnd,
    }

    board = ChessBoard('myBoard', config);
    $(window).resize(board.resize);
}

function onMoveEnd () {
    console.log('Move end');
    $board = $('#myBoard');
    square = $board.find(('.square-' + squareToHighlight))
    console.log(square);
    square.addClass('highlightsquare')
  }


function start() {
    bot2 = new randomBot(2);
    bot1 = new pushBot(1);
    var overLay = document.getElementById("boardInfo");
    overLay.style.display = "none";
    var controls = document.getElementById("controls");
    controls.style.display = "inline";
    pauseButton();
}