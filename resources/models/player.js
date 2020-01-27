
class player  {

    constructor(id,type) {
        this.id = id;
        this.type = type;
    }

    display(game) {
        var process = this.think(game);
        
        var info = document.getElementById("thinking"+this.id);
        var column = document.getElementById("bot"+this.id);
        if (info != null) {
            column.removeChild(info);
        }
        var newInfo = document.createElement("div");
        newInfo.setAttribute("id","thinking"+this.id)
        var x;
        for (x of process.elements) {
            console.log("Handling one element");
            newInfo.appendChild(x.render())
        }
        column.appendChild(newInfo);
        

    }

    move(game) {
        var result = this.think(game);
        game.move(result.choice);
        return game;
    }

    randomMove(game) {
        var possibleMoves = game.moves();
        var randomIndex = Math.floor(Math.random() * possibleMoves.length)
        return possibleMoves[randomIndex];
    }

}