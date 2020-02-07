class Tree {

    constructor(title,game) {
        this.title = title;
        this.root = new Node(game);
    }

    render(id) {
        var visualTree = document.createElement("div");
        /*for (node of this.root.children) {
            var a = document.createElement("div");
            var text = "node.move['san'];"
            a.appendChild(document.createTextNode(text));
            visualTree.appendChild(a);
        }*/
        return visualTree;
    }

    sortNodes() {
        console.log(this.root.children)
        this.root.children = this.root.children.sort(function(a,b){return b.score - a.score});
        console.log(this.root.children)
    }

}

class Node {

    constructor(state,move) {
        this.parent = null;
        this.state = state;
        this.children = [];
        this.score = null;
        this.move = move;
    }
    
    generateChildren() {
        var move;
        for (move of this.state.moves({verbose :true})) {
            this.state.move(move)
            this.children.push(new Node(new Chess(this.state.fen()),move))
            this.state.undo()
        }
    }

}