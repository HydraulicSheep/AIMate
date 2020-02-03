class choiceTable {

    constructor(title) {
        this.title = title;
        this.moves = [];
    }

    addMove(move) {
        this.moves.push(move);
    }
    
    
    render() {
        var table = document.createElement("div");
        table.setAttribute("style","width: 50%")
        var header = document.createElement("div");
        header.setAttribute("class","tableHeader")
        header.appendChild(document.createTextNode(this.title));
        table.appendChild(header)
        var moves = document.createElement("div");
        var move;
        for (move of this.moves) {
            var a = document.createElement("div");
            var text = move['san'];
            a.appendChild(document.createTextNode(text));
            a.setAttribute("class","thoughtchoice")
            moves.appendChild(a);
        }
        var clearance = document.createElement("div")
        clearance.setAttribute("style","clear: both")
        moves.appendChild(clearance)
        table.appendChild(moves);
        
        return table;
    }
}