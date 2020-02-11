class pointsBot extends player {

    constructor(id,depth) {
        super(id,BotTypes.random);
        this.description = "A bot that maximises its points and minimizes enemy points (traditional points system)";
        this.depth = 3;
    }
    
    think(game) {
        var process = new thoughtProcess();
        var pointTree = new Tree("Moves",game);
        this.minimax(pointTree.root,this.depth,true);
        pointTree.sortNodes();
        var choices = new orderedTable("Rankings",pointTree.root.children);
        process.choice = pointTree.root.children[0].move;
        process.addElement(pointTree);
        process.addElement(choices);
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
        node.data['value'] = Math.abs(value)
        if (node.parent != null) {
            node.parent.data['children'].push(node.data)
        }
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
                    case 'P': points -=1; break;
                    case 'N': points -=3; break;
                    case 'B': points -=3; break;
                    case 'R': points -=5; break;
                    case 'Q': points -=9; break;
    
                }
    
            }

        }
        
        return points;
    }



}