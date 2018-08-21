/**
 * Parameter module
 * @module parameter
 */
import { d3 } from "./util";

let next;

function addSelect(label, dataset, data) {
  // add empty select option
  const empty = {};
  empty[dataset.pk] = "";
  empty[dataset.desc] = "--alle--";
  data.unshift(empty);

  d3.select(label)
    .append("text")
      .text(dataset.parameter);

  const select = d3.select(label)
    .append("select")
      .attr("class", "form-control form-control-sm")
      .on("change", function res() { next(dataset, this.value); });

  select.selectAll("option")
      .data(data)
    .enter().append("option")
      .attr("value", d => d[dataset.pk])
      .text(d => d[dataset.desc])
      .each(function res(d) {
        if (d[dataset.pk] === dataset.defaultValue) {
          d3.select(this).attr("selected", true);
          next(dataset, this.value);
        }
      });
}

export default async function (label, uri, callback) {
  next = callback;
  const ds = label.dataset;

  // add spinner
  d3.select(label)
    .append("i")
      .attr("class", `fas fa-spinner fa-spin wait-spinner wait-${ds.parameter}`);

  // get data
  const data = await d3.json(uri + ds.endpoint);
  if (ds.control === "select") {
    addSelect(label, ds, data);
  }
}
