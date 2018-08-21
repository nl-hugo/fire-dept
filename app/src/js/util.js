/**
 * Util module
 * @module util
 */

import { select, selectAll, filter } from "d3-selection";
import {
  min, max, sum, ascending, descending,
} from "d3-array";
import { format } from "d3-format";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeFormat, timeParse } from "d3-time-format";
import * as collection from "d3-collection";
import * as path from "d3-path";
import * as shape from "d3-shape";
import * as fetch from "d3-fetch";

export const d3 = Object.assign({}, {
  select,
  selectAll,
  filter,
  min,
  max,
  sum,
  ascending,
  descending,
  format,
  timeFormat,
  timeParse,
  scaleLinear,
  scaleTime,
}, fetch, collection, path, shape);

const icons = {
  gebouwbrand: "home",
  buitenbrand: "tree",
  hulpverlening: "medkit",
  voertuig: "car",
  "automatische melding": "bell",
  proefalarm: "lightbulb",
  onderzoek: "search",
  "overige brandgerelateerd": "comment",
  overigen: "comment",
};

/** Returns an icon for the given type */
export function iconForType(t) {
  return d3.map(icons).get(t) || "question";
}

export function className(d) {
  return d.replace(/ /g, "_");
}
