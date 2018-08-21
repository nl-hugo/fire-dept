/**
 * Facts module
 * @module metrics
 */
import safeEval from "safe-eval";
import { d3 } from "./util";

export default function (data) {
  d3.selectAll(".a-fact").each(function res() {
    const ds = this.dataset;
    const valueFormat = ds.valueformat;
    const timeFormat = ds.timeformat;
    this.textContent = d3.nest()
      .rollup((v) => {
        const val = safeEval(ds.value, { d3, v });
        return timeFormat
          ? d3.timeFormat(timeFormat)(val)
          : d3.format(valueFormat)(val);
      })
      .entries(data);
    });
}
