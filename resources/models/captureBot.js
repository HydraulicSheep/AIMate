class captureBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
        this.description = "A bot that tries to capture or failing that, makes a random move.";
    }

    think(game) {
        var possibleMoves = game.moves({ verbose: true });
        var move;
        var process = new thoughtProcess();
        var all = new choiceTable("All Moves");
        var selected = new choiceTable("Capture Moves");
        var final = new choiceTable("Random Selection");
        for (move of possibleMoves) {
            all.addMove(move);
            if (move['flags'].includes('c')||move['flags'].includes('e')) {
                selected.addMove(move);
                process.setChoice(move);
            }
        }
        if (process.choice == null) {
            process.setChoice(this.randomMove(game));
        }
        final.addMove(process.choice);
        process.addElement(all);
        process.addElement(selected);
        process.addElement(final);
        return process;
    }


    
    
}