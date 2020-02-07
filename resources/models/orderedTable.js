class orderedTable {

    constructor(title, nodes) {
        this.title = title;
        this.nodes = nodes;
    }

    render(id) {
        var table = document.createElement("div");
        var header = document.createElement("div");
        header.setAttribute("class","tableHeader")
        header.appendChild(document.createTextNode(this.title));
        table.appendChild(header)
        var moves = document.createElement("div");
        var move;
        var node;
        for (node of this.nodes) {
            var a = document.createElement("div");
            var text = node.move['san'];
            a.appendChild(document.createTextNode(text));
            a.appendChild(document.createTextNode(" : "));
            a.appendChild(document.createTextNode(node.score));
            a.setAttribute("class","orderedItem");
            moves.appendChild(a);
            moves.appendChild(document.createElement("br"));
        }
        table.appendChild(moves);
        table.setAttribute("class","orderedList");
        
        return table;
    }

}