
class player  {

    constructor(id,type) {
        this.id = id;
        this.type = type;
        this.processrecord = [];
    }

    display(game) {
        var process;
        console.log("PROSSE: "+this.processrecord.length)
        if (this.processrecord.length == Math.floor(game.history().length/2)) {
            process = this.think(game);
            this.processrecord.push(process);
            console.log("Path 1")
        }
        else {
            console.log("Path 2")
            process = this.processrecord[Math.floor(game.history().length/2)]
        }
       

        var info = document.getElementById("thinking"+this.id);
        var column = document.getElementById("bot"+this.id);
        if (info != null) {
            $(info).empty()
            column.removeChild(info);
        }
        var newInfo = document.createElement("div");
        newInfo.setAttribute("id","thinking"+this.id)
        var x;
        for (x of process.elements) {
            console.log("Handling one element");
            var element = x.render(this.id)
            if (this.id == 1) {
                element.className += " leftTable"
            }
            else {
                element.className += " rightTable"
            }
            newInfo.appendChild(element)
        }
        column.appendChild(newInfo);
        

    }

    

    move(game) {
        console.log("Length"+game.history().length);
        var process = this.processrecord[Math.floor((game.history().length)/2)]
        if (process == null) {
            console.log("Equals null");
            process = this.think(game);
        }
        console.log("Choice"+process.choice['san']);
        game.move(process.choice);
        return game;
    }

    randomMove(game) {
        var possibleMoves = game.moves({ verbose: true });
        var randomIndex = Math.floor(Math.random() * possibleMoves.length)
        return possibleMoves[randomIndex];
    }

}