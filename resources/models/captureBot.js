class captureBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
    }

    think(game) {
        var possibleMoves = game.moves({ verbose: true });
        var move;
        var process = new thoughtProcess();
        var all = new choiceTable();
        var selected = new choiceTable();
        for (move of possibleMoves) {
            all.addMove(move);
            if (move['flags'].includes('c')||move['flags'].includes('e')) {
                selected.addMove(move);
                process.setchoice(move);
            }
        }
        if (process.choice == null) {
            process.setchoice(this.randomMove(game));
        }
        process.addElement(all);
        process.addElement(selected);
        return process;
    }


    
    
}