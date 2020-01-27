class pushBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
    }
    
    think(game) {
        var possibleMoves = game.moves({ verbose: true });
        var move;
        var process = new thoughtProcess();
        var all = new choiceTable("All Moves");
        var selected = new choiceTable("Push Moves");
        for (move of possibleMoves) {
            all.addMove(move);
            if ((game.turn() == 'w' && move['from'][1] < move['to'][1]) || (game.turn() == 'b' && move['from'][1] < move['to'][1])) {
                selected.addMove(move);
                process.setChoice(move);
            }
        }
        if (process.choice == null) {
            process.setChoice(this.randomMove(game));
        }
        process.addElement(all);
        process.addElement(selected);
        return process;

    }
}