/**
 * Parameter module
 * @module parameter
 */
let next;

export async function init(label, uri, callback) {
  next = callback;
  const dataset = label.dataset;

  // add spinner
  d3.select(label)
    .append("i")
      .attr("class", "fas fa-spinner fa-spin wait-spinner wait-" + dataset.parameter);

  // get data
  const data = await d3.json(uri + dataset.endpoint);

  if (dataset.control == "select") {
    addSelect(label, dataset, data);
  }
}

function addSelect(label, dataset, data) {
  // add empty select option
  let empty = {};
  empty[dataset.pk] = "";
  empty[dataset.desc] = "--alle--";
  data.unshift(empty);

  d3.select(label)
    .append("text")
      .text(dataset.parameter);

  const select = d3.select(label)
    .append("select")
      .attr("class", "form-control form-control-sm")
      .on("change", function() { next(dataset, this.value); });

  select.selectAll("option")
      .data(data)
    .enter().append("option")
      .attr("value", d => d[dataset.pk])
      .text(d => d[dataset.desc])
      .each(function(d) {
        if (d[dataset.pk] == dataset.defaultValue) {
          d3.select(this).attr("selected", true);
          next(dataset, this.value);
        }
      });
}
