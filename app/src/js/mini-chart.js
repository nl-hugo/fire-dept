/**
 * Map mini-chart
 * @module mini-chart
 */
import { className, d3 } from "./util";

function addChart(key, numbers, dateRange, maxValue) {
  const svg = d3.select(`.a-metric.${className(key)} svg`);

  const margin = {
    top: 35, right: 5, bottom: 2, left: 5,
  };

  const width = +svg.attr("width") - margin.left - margin.right;

  const height = +svg.attr("height") - margin.top - margin.bottom;

  const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

  const parseDate = d3.timeParse("%Y-%m-%d");

  // sort by date
  numbers.sort((a, b) => d3.ascending(a.key, b.key));

  // compute cumulative sum
  let sum = 0;
  numbers.map((d) => {
    const res = d;
    res.date = parseDate(res.key);
    sum += res.value;
    res.count = sum;
    return res;
  });

  // duplicate last value to ensure data until today
  numbers.push({
    date: dateRange[1],
    count: numbers[numbers.length - 1].count,
  });

  const x = d3.scaleTime()
      .range([0, width])
      .domain(dateRange);

  const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxValue]);

  const area = d3.area()
      .curve(d3.curveMonotoneX)
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.count));

  const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x(d => x(d.date))
      .y(d => y(d.count));

  g.append("path")
      .attr("class", "area")
      .attr("d", area(numbers));

  g.append("path")
      .attr("class", "line")
      .attr("d", line(numbers));
}

export default function () {
  const elt = d3.selectAll(".a-metric svg");
  const data = elt.data().map(d => d.values).reduce((a, b) => a.concat(b), []);

  const numbers = d3.nest()
    .key(d => d.brandinfo)
    .key(d => d.datum)
    .rollup(d => d.length)
    .entries(data);

  console.debug(numbers);

  const dateRange = [new Date(), new Date()];
  dateRange[0].setDate(dateRange[0].getDate() - 35);

  const maxValue = d3.max(numbers, d => d3.sum(d.values, e => e.value));

  elt.each((d) => {
    const dt = numbers.filter(n => n.key === d.key)[0];
    addChart(dt.key, dt.values, dateRange, maxValue);
  });
}
