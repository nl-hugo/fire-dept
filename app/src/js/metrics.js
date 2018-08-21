/**
 * Metrics module
 * @module metrics
 */
import chart from "./mini-chart";
import { iconForType, className, d3 } from "./util";

const div = d3.select(".a-metrics");

export default function (data) {
  const types = d3.nest()
      .key(d => d.brandinfo)
      .entries(data)
      .sort((a, b) => {
        const res = a.values.length === b.values.length
        ? d3.ascending(a.key, b.key)
        : d3.descending(a.values.length, b.values.length);
        return res;
      });

  d3.selectAll(".wait-spinner.wait-metrics").classed("hidden", true);
  div.selectAll(".a-metric").remove();

  const metrics = div.selectAll(".a-metric")
      .data(types)
    .enter().append("div")
      .attr("class", d => `a-metric ${className(d.key)}`);

  metrics.html(d => "<span class='fa-stack fa-2x' style='font-size: 1.2em;'>"
        + "<i class='fas fa-circle fa-stack-2x'></i>"
        + `<i class='fas fa-${iconForType(d.key)} fa-stack-1x fa-inverse'></i>`
        + "</span>");

  metrics.append("div")
      .attr("class", "title")
      .text(d => d.key);

  metrics.append("div")
      .attr("class", "number")
      .text(d => d.values.length);


  metrics.append("svg").attr("width", 200).attr("height", 60);

  chart();
}
