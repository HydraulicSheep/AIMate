class pointsBot extends player {

    constructor(id) {
        super(id,BotTypes.random);
        this.description = "A bot that minmaxes its point total (traditional points system)";
    }
    
    think(game) {
        var process = new thoughtProcess();
        var pointTree = new Tree("Moves",game);
        //var orderedTable = new
        this.minimax(pointTree.root,2,true);
        pointTree.sortNodes();
        process.choice = pointTree.root.children[0].move;
        return process;

    }

    minimax(node,depth,ourside) {
        if (depth == 0 /*|| is a terminal node*/) {
            node.score = this.scoreFunction(node.state);
            return node.score;
        }
        node.generateChildren();
        var x;
        var value;
        if (ourside) {
            value = -100000;
            for (x of node.children) {
                value = Math.max(value,this.minimax(x,depth-1,false))
            }
        }
        else {
            value = 1000000;
            for (x of node.children) {
                value = Math.min(value,this.minimax(x,depth-1,true));
            }
        }
        node.score = value;
        return value;

    }

    scoreFunction(state) {
        var teststring = state.fen()
        var info = teststring.split(' ')[0]
        var points = 0
        var char;
        if (this.id == 1) {
            for (char of info) {
                switch(char) {
                
                    case 'P': points +=1; break;
                    case 'N': points +=3; break;
                    case 'B': points +=3; break;
                    case 'R': points +=5; break;
                    case 'Q': points +=9; break;
                    case 'p': points -=1; break;
                    case 'n': points -=3; break;
                    case 'b': points -=3; break;
                    case 'r': points -=5; break;
                    case 'q': points -=9; break;
    
                }
    
            }

        }
        else {
            for (char of info) {
                switch(char) {
                
                    case 'p': points +=1; break;
                    case 'n': points +=3; break;
                    case 'b': points +=3; break;
                    case 'r': points +=5; break;
                    case 'q': points +=9; break;
    
                }
    
            }

        }
        
        return points;
    }



}