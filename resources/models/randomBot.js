

class randomBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
        this.description = "A bot that moves randomly.";
    }

    think(game) {
        var possibleMoves = game.moves({ verbose: true });
        var process = new thoughtProcess();
        var all = new choiceTable('Possible Moves');
        var move;
        for (move of possibleMoves) {
            all.addMove(move);
        }
        var final = new choiceTable('Random Selection');
        process.choice = this.randomMove(game)
        final.addMove(process.choice);
        process.addElement(all);
        process.addElement(final);
        return process;  
    }
    
}