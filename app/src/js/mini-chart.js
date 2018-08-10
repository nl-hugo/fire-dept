/**
 * Map mini-chart
 * @module mini-chart
 */


function init() {
  console.log("init minichart");
}

export function update() {
  console.log("update minichart");
  // console.log(elt);
  // console.log(elt.data());

  const svg = d3.selectAll(".a-metric svg");

  svg.each(d => {
    console.log(d.key);
    console.log(d.values);
    addChart(svg, d.values);
  });

  // TODO: aggregeren naar maand
  // TODO: x en y domein over alle minis heen berekenen

}

function addChart(svg, data) {
  var margin = {top: 8, right: 10, bottom: 2, left: 10},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var parseDate = d3.timeParse("%Y-%m-%d");

  // data.forEach(d => d.datum = parseDate(d.datum));
  // console.log(data);


  var x = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(data, d => d.date));

  console.log(x.domain());

/*
  var y = d3.scaleLinear()
      .range([height, 0]);  


  var area = d3.svg.area()
      .x(function(d) { return x(d.datum); })
      .y0(height)
      .y1(function(d) { return y(d.price); });

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.price); });

  svg.append("path")
      .attr("class", "area")
      .attr("d", function(d) { y.domain([0, d.maxPrice]); return area(d.values); });
*/
}
