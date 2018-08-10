import * as chart from "./mini-chart";
import { iconForType } from "./util";

const div = d3.select(".a-metrics");
  // .append("ul")
    // .attr("class", "fa-ul");

const t = d3.transition()
    .duration(750);

/*
const icons = {
  "gebouwbrand": "home",
  "buitenbrand": "tree",
  "hulpverlening": "medkit",
  "voertuig": "car-crash",
  "automatische melding": "bell",
  "overigen": "comment",
  "proefalarm": "question",
  "overige brandgerelateerd": "comment",
  "onderzoek": "search",
}
*/

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
      // .attr("data-fa-transform", "shrink-6")
      // .attr("data-fa-mask", "fas fa-square");


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




function init() {
  console.info("init metrics");

}

init();