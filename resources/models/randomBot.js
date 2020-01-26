

class randomBot extends player {

    constructor() {
        super();
    }

    move(game) {
        var possibleMoves = game.moves();
        var randomIndex = Math.floor(Math.random() * possibleMoves.length)
        game.move(possibleMoves[randomIndex])
        return game;  
    }
    
}