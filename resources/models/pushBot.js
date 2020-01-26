class pushBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
    }

    move(game) {
        var possibleMoves = game.moves({ verbose: true });
        var move;
        for (move of possibleMoves) {
            if ((game.turn() == 'w' && move['from'][1] < move['to'][1]) || (game.turn() == 'b' && move['from'][1] < move['to'][1])) {
                game.move(move);
                var data = ['Selected move',move['san']];
                this.display(data);
                return game;
            }
        }
        return this.randomMove(game);
    }
    
}