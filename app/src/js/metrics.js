/**
 * Metrics module
 * @module metrics
 */
import * as chart from "./mini-chart";
import { iconForType } from "./util";

const div = d3.select(".a-metrics");

const t = d3.transition()
    .duration(750);

export function update(data) {
  console.info("update metrics");

  console.log(data);

  const types = d3.nest()
      .key(d => d.brandinfo)
      .entries(data)
      .sort((a, b) => d3.descending(a.values.length, b.values.length));

  // sort by size
  console.log(types);


  const metrics = div.selectAll(".a-metric")
      .data(types, d => d.key);

  metrics.exit().transition(t)
      .attr("opacity", 1e-6)
      .remove();

  const divs = metrics
    .enter().append("div")
      // .attr("opacity", 1e-6)
      .attr("class", d => "a-metric " + d.key.replace(/ /g,"_"))
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  const stack = divs.append("span")
      .attr("class", "fa-stack fa-2x")
      .style("font-size", "1.2em");

  stack.append("i")
      .attr("class", "fas fa-circle fa-stack-2x");

  stack.append("i")
      .attr("class", d => "fas fa-" + iconForType(d.key) + " fa-stack-1x fa-inverse");

  divs.append("div")
      .attr("class", "title")
      .text(d => d.key);

  divs.append("div")
      .attr("class", "number")
      .text(d => d.values.length);

  divs.append("svg").attr("width", 200).attr("height", 40);
    // .data(d => d.values);

  chart.update();
}

function mouseover() {

}

function mouseout() {
  
}
