class Tree {

    constructor(title,game) {
        this.title = title;
        this.root = new Node(game);
    }

    render(id) {
        var visualTree = document.createElement("div");
        var icicle = generateIcicle(this.root.data);
        console.log("Rendering")
        visualTree.appendChild(icicle)
        return visualTree
    }

    sortNodes() {
        console.log(this.root)
        this.root.children = this.root.children.sort(function(a,b){return b.score - a.score});
        console.log(this.root.children)
    }

}

class Node {

    constructor(state,move,parent) {
        this.parent = parent;
        this.state = state;
        this.children = [];
        this.score = null;
        this.move = move;
        if (move != null) {
            this.name = move.to
        }
        else {
            this.name = ""
        }
        this.data = {"name":this.name,"value":this.score,"children":[]}
        
    }
    
    generateChildren() {
        var move;
        for (move of this.state.moves({verbose :true})) {
            this.state.move(move)
            this.children.push(new Node(new Chess(this.state.fen()),move,this))
            this.state.undo()
        }
    }

}