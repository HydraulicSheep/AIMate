class captureBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
    }

    move(game) {
        var possibleMoves = game.moves({ verbose: true });
        var move;
        for (move of possibleMoves) {
            if (move['flags'].includes('c')||move['flags'].includes('e')) {
                game.move(move);
                return game;
            }
        }
        return this.randomMove(game);
    }
    
}