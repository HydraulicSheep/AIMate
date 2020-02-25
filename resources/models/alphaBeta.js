class alphaBeta extends player {

    constructor(id,depth) {
        super(id,BotTypes.random);
        this.description = "A bot that minmaxes points with alpha-beta pruning";
        this.depth = depth
    }
    
    think(game) {
        var process = new thoughtProcess();
        var pointTree = new Tree("Moves",game);
        this.minimaxab(pointTree.root,this.depth,-200001,200001,true);
        pointTree.sortNodes();
        var choices = new orderedTable("Rankings",pointTree.root.children);
        var x = []
        var c;
        var s = pointTree.root.children[0].score
        for (c of pointTree.root.children) {
            if (c.score == s) {
                x.push(c)
            }
            else {
                break;
            }
        }

        var index = Math.floor(Math.random()*(x.length-1))

        process.choice = pointTree.root.children[index].move;
        process.addElement(pointTree);
        process.addElement(choices);
        return process;

    }

    minimaxab(node,depth,a,b,ourside) {
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
                value = Math.max(value,this.minimaxab(x,depth-1,a,b,false))
                a = Math.max(a,value)
                if (a >= b) {break;}
            }
        }
        else {
            value = 100000;
            for (x of node.children) {
                value = Math.min(value,this.minimaxab(x,depth-1,a,b,true));
                b = Math.min(b,value)
                if (a >= b) {break;}
            }
        }
        node.updateScore(value);
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