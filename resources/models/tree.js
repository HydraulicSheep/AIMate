class Tree {

    constructor(title,game) {
        this.title = title;
        this.root = new Node(game);
        this.root.generateChildren();
    }

    render(id) {

    }

    

}

class Node {

    constructor(state) {
        this.parent = null;
        this.state = state;
        this.children = [];
    }
    
    generateChildren() {
        for (move of this.state.moves()) {
            this.children.push(this.state.move(move))
        }
    }

}