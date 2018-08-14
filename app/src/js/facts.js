/**
 * Facts module
 * @module metrics
 */
export function update(data) {
  d3.selectAll(".a-fact").each(function() {
    const dataset = this.dataset;
    const valueFormat = dataset.valueformat;
    const timeFormat = dataset.timeformat;
    this.textContent = d3.nest()
      .rollup(v => timeFormat ? // eslint-disable-line no-unused-vars
        d3.timeFormat(timeFormat)(eval(dataset.value)) :
        d3.format(valueFormat)(eval(dataset.value)))
      .entries(data);
  });
}
