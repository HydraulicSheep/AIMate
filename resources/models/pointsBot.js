class pointsBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
        this.description = "A bot that minmaxes its point total (traditional points system)";
    }
    
    think(game) {
        var process = new thoughtProcess();
        var pointTree = new Tree("Moves",game);

    }



}