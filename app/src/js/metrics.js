/**
 * Metrics module
 * @module metrics
 */
import * as chart from "./mini-chart";
import { iconForType, className } from "./util";

const div = d3.select(".a-metrics");

export function update(data) {
  const types = d3.nest()
      .key(d => d.brandinfo)
      .entries(data)
      .sort((a, b) => 
        a.values.length === b.values.length ? 
        d3.ascending(a.key, b.key) : 
        d3.descending(a.values.length, b.values.length));

  d3.selectAll(".wait-spinner.wait-metrics").classed("hidden", true);
  div.selectAll(".a-metric").remove();

  const metrics = div.selectAll(".a-metric")
      .data(types)
    .enter().append("div")
      .attr("class", d => "a-metric " + className(d.key))
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  const stack = metrics.append("span")
      .attr("class", "fa-stack fa-2x")
      .style("font-size", "1.2em");

  stack.append("i")
      .attr("class", "fas fa-circle fa-stack-2x");

  stack.append("i")
      .attr("class", d => "fas fa-" + iconForType(d.key) + " fa-stack-1x fa-inverse");

  metrics.append("div")
      .attr("class", "title")
      .text(d => d.key);

  metrics.append("div")
      .attr("class", "number")
      .text(d => d.values.length);


  metrics.append("svg").attr("width", 200).attr("height", 60);

  chart.update();
}

function mouseover(d) {
  // console.log(d);
}

function mouseout(d) {
}
