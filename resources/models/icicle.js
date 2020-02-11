
function generateIcicle(data) {

partition = data => {
    //Evaluation that decides the width of the displayed boxes
    const root = d3.hierarchy(data)
        .count() //Counts the number of moves below each to give it a base score
        .each(d => d.value += Math.abs(+d.data.value)) //Adds the actual move value to prioritise more significant moves
        .sort((a, b) => b.width - a.width || b.value - a.value);  
    return d3.partition()
        .size([width-1, height])
      (root);
  }

color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

format = d3.format(",d")

width = 1200

height = 975

  const root = partition(data);
  let focus = root;

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("font", "40px sans-serif");

  const cell = svg
    .selectAll("g")
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

  const rect = cell.append("rect")
      .attr("height", d => d.y1 - d.y0-1)
      .attr("width", d => rectWidth(d))
      .attr("fill-opacity", 0.6)
      .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .style("cursor", "pointer")
      .on("click", clicked);

  const text = cell.append("text")
      .style("user-select", "none")
      .attr("pointer-events", "none")
      .attr("x", 10)
      .attr("y", 40)
      .attr("fill-opacity", d => +labelVisible(d));

  text.append("tspan")
      .text(d => d.data.name);

  const tspan = text.append("tspan")
      .attr("fill-opacity", d => labelVisible(d) * 0.7)
      .text(d => ` ${format(+d.data.value)}`); //Displays the move's score in each box

  cell.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  function clicked(p) {
    focus = focus === p ? p = p.parent : p;

    root.each(d => d.target = {
      x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
      x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
      y0: d.y0 - p.y0,
      y1: d.y1 - p.y0
    });

    const t = cell.transition().duration(750)
        .attr("transform", d => `translate(${d.target.x0},${d.target.y0})`);

    rect.transition(t).attr("width", d => rectWidth(d.target));
    text.transition(t).attr("fill-opacity", d => +labelVisible(d.target));
    tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
  }
  
  function rectWidth(d) {
    return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 3);
  }
  

  function labelVisible(d) {
    return d.x1 <= width && d.x0 >= 0 && d.x1 - d.x0 > 80;
  }

return svg.node()


}