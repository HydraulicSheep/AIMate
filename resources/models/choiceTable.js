class choiceTable {

    constructor(title) {
        this.title = title;
        this.moves = [];
    }

    addMove(move) {
        this.moves.push(move);
    }
    
    
    render() {
        var result = document.createElement("div");
        result.appendChild(document.createTextNode(this.title));
        var move;
        result.appendChild(document.createElement("br"));
        for (move of this.moves) {
            result.appendChild(document.createTextNode(move['san']+" "));
        }
        return result;
    }
}