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
var highlightTo = null;
var highlightFrom = null;
const BotTypes = Object.freeze({"random":1, "minimax":2, "neural":3});

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
            game = bot1.move(game);
        }
        else {
            game = bot2.move(game);
        }
        board.position(game.fen(),useAnimation);
        displayGame = game;
        
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
    if (highlightTo != null) {
    highlightTo.css("background-color","")
    highlightFrom.css("background-color","")
    }
    
    $board = $('#myBoard');
    $board.find('.' + 'square-55d63').removeClass('highlightwhitefrom')
    $board.find('.' + 'square-55d63').removeClass('highlightwhiteto')
    $board.find('.' + 'square-55d63').removeClass('highlightblackfrom')
    $board.find('.' + 'square-55d63').removeClass('highlightblackto')
    if (history.length > 0) {
        lastMove = currentGame.undo({ verbose: true })
        currentGame.move(lastMove)
        if ($board.find(('.square-' + lastMove.to)).hasClass('white-1e1d7')) {
            $board.find(('.square-' + lastMove.to)).addClass('highlightwhiteto')
        }
        else {
            $board.find(('.square-' + lastMove.to)).addClass('highlightblackto')
        }
        if ($board.find(('.square-' + lastMove.from)).hasClass('white-1e1d7')) {
            $board.find(('.square-' + lastMove.from)).addClass('highlightwhitefrom')
        }
        else {
            $board.find(('.square-' + lastMove.from)).addClass('highlightblackfrom')
        }
        
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
    
  }


function start() {
    //Reads the dropdowns and gets the selected values
    var bot1e = document.getElementById('bot1selector');
    var bot2e = document.getElementById('bot2selector');
    var bot1string = bot1e.options[bot1e.selectedIndex].value;
    var bot2string = bot2e.options[bot2e.selectedIndex].value;

    //Instantiates bots
    switch (bot1string) {
        case 'randomBot':
            bot1 = new randomBot(1);
            break;
        case 'pushBot':
            bot1 = new pushBot(1);
            break;
        case 'captureBot':
            bot1 = new captureBot(1);
            break;
    }
    switch (bot2string) {
        case 'randomBot':
            bot2 = new randomBot(2);
            break;
        case 'pushBot':
            bot2 = new pushBot(2);
            break;
        case 'captureBot':
            bot2 = new captureBot(2);
            break;
    }

    //Removes the dropdowns and replaces them with the selecte bot names
    var bot1text = bot1e.options[bot1e.selectedIndex].text;
    var bot2text = bot2e.options[bot2e.selectedIndex].text;
    var bot1parent = bot1e.parentElement;
    var bot2parent = bot2e.parentElement;
    bot1parent.removeChild(bot1e);
    bot2parent.removeChild(bot2e);

    bot1parent.appendChild(document.createTextNode(bot1text))
    
    var description1 = document.createElement("div");
    description1.setAttribute("class","description")
    description1.appendChild(document.createElement("br"));
    description1.appendChild(document.createTextNode(bot1.description))
    bot1parent.appendChild(description1)

    bot2parent.appendChild(document.createTextNode(bot2text))
    var description2 = document.createElement("div");
    description2.setAttribute("class","description")
    description2.appendChild(document.createElement("br"));
    description2.appendChild(document.createTextNode(bot2.description))
    bot2parent.appendChild(description2)

    var overLay = document.getElementById("boardInfo");
    overLay.style.display = "none";
    var controls = document.getElementById("controls");
    controls.style.display = "inline";
    updateHighlight(game);
    display(game);
    window.setTimeout(pauseButton, 500);
}

function mouseon(tile) {
    $board = $('#myBoard');
    $(tile.target).css('background-color','green');
    var text = tile.target.textContent
    var gameClone = new Chess()
    gameClone.load_pgn(displayGame.pgn());
    var attempt = gameClone.move(text);
    if (attempt != null) {   
        var squareto = $board.find(('.square-' + attempt.to))
        highlightTo = squareto
        squareto.css("background-color","blue");
        var squarefrom = $board.find(('.square-' + attempt.from))
        highlightFrom = squarefrom
        squarefrom.css("background-color","yellow");
    }
    else {

    }
}

function mouseoff(tile) {
    $(tile.target).css('background-color','');
    var text = tile.target.textContent
    var gameClone = new Chess()
    gameClone.load_pgn(displayGame.pgn());
    var attempt = gameClone.move(text);
    if (attempt != null) {   
        var squareto = $board.find(('.square-' + attempt.to))
        
        squareto.css("background-color","");
        var squarefrom = $board.find(('.square-' + attempt.from))
        
        squarefrom.css("background-color","");
    }
    else {
        gameClone.undo()
        attempt = gameClone.move(text);
        var squareto = $board.find(('.square-' + attempt.to))
        squareto.css("background-color","");
        var squarefrom = $board.find(('.square-' + attempt.from))
        squarefrom.css("background-color","");
    }
}