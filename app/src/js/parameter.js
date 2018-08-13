/**
 * Parameter module
 * @module parameter
 */
let next;

export async function init(label, uri, callback) {
  next = callback;
  const dataset = label.dataset;
  const data = await d3.json(uri + dataset.endpoint);

  // add empty select option
  let empty = {};
  empty[dataset.pk] = "";
  data.unshift(empty);

  if (dataset.control == "select") {
    select(label, dataset, data);
  }
}

function select(label, dataset, data) {
  d3.select(label)
    .append("i")
      .attr("class", "fas fa-spinner fa-spin wait-spinner wait-" + dataset.parameter);

  d3.select(label)
    .append("text")
      .text(dataset.parameter);

  const select = d3.select(label)
    .append("select")
      .attr("class", "form-control form-control-sm")
      .on("change", function() { next(label.dataset, this.value); });

  select.selectAll("option")
      .data(data)
    .enter().append("option")
      .attr("value", d => d[dataset.pk])
      .text(d => d[dataset.desc])
      .each(function(d) {
        if (d[dataset.pk] == dataset.defaultValue) {
          d3.select(this).attr("selected", true);
          next(label.dataset, this.value);
        }
      });
}
