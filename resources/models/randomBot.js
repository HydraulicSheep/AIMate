

class randomBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
    }

    move(game) {
        return this.randomMove(game);  
    }
    
}