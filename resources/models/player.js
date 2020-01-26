
class player  {

    constructor(id,type) {
        this.id = id;
        this.type = type;
    }

    display(data) {
        switch (this.type) {
            case BotTypes.random:
                var i;
                console.log("bot"+this.id);
                var column = document.getElementById("bot"+this.id);
                var datasheet = document.getElementById("bot"+this.id+"thoughts");
                if (datasheet != null) {
                    column.removeChild(datasheet);
                }
                datasheet = document.createElement("div");
                datasheet.setAttribute("id","bot"+this.id+"thoughts")
                for (i=0;i<data.length;i+=2) {
                    var moveText = document.createTextNode(data[i]);
                    datasheet.appendChild(moveText)
                    datasheet.appendChild(document.createElement("br"))
                    var moveText = document.createTextNode(data[i+1]);
                    datasheet.appendChild(moveText)
                    column.appendChild(datasheet);
                    
                }

        }

    }

    move() {


    }

    randomMove(game) {
        var possibleMoves = game.moves();
        var randomIndex = Math.floor(Math.random() * possibleMoves.length)
        game.move(possibleMoves[randomIndex])
        return game;
    }

}