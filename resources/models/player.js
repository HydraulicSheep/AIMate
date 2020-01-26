
class player  {


    display() {

    }

    move() {


    }

    randomMove(game) {
        var possibleMoves = game.moves();
        var randomIndex = Math.floor(Math.random() * possibleMoves.length)
        game.move(possibleMoves[randomIndex])
        return game;
    }

}