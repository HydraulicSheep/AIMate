

class randomBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
    }

    think(game) {
        var possibleMoves = game.moves({ verbose: true });
        var process = new thoughtProcess();
        var all = new choiceTable('Possible Moves');
        var move;
        for (move of possibleMoves) {
            all.addMove(move);
        }
        process.choice = this.randomMove(game)
        process.addElement(all);
        return process;  
    }
    
}