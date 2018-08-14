/**
 * Map dashboard
 * @module dashboard
 */
import * as parameter from "./parameter";
import * as map from "./map";
import * as metrics from "./metrics";
import * as facts from "./facts";


const BASE_URI = "https://fire-dept-api.herokuapp.com/";
const API_ENDPOINT = "alarmeringen/";

const parseDate = d3.timeParse("%Y-%m-%d");

let params = { "datum_after": "", };

let api = {
  getAlarmeringen: function(uri, alarmeringen) {
    return d3.json(uri).then(function(response) {
      if (!alarmeringen) {
        alarmeringen = [];
      }
      alarmeringen = alarmeringen.concat(response.results);
      console.debug(response.next);
      
      if (response.next) {
        return api.getAlarmeringen(response.next, alarmeringen);
      }
      return alarmeringen;
    });
  }
}

async function update(label, value) {
  console.debug(label.pk + " ==> " + value);
  params[label.parameter] = value;

  // hide spinners
  d3.selectAll(".wait-spinner.wait-" + label.parameter).classed("hidden", true);

  // Request data from api once all params are there
  if (Object.keys(params).length === d3.selectAll(".a-parameter").size() + 1) {

    // TODO: no parameter hard-coding
    (params["capcodes"] === "" & params["plaats"] === "") ? setDateLimiter(7) : setDateLimiter(-1);

    const qs = "?" + serialize(params),
      uri = BASE_URI + API_ENDPOINT + qs;

    // update ui status
    d3.selectAll(".wait-spinner.wait-metrics").classed("hidden", false);
    d3.selectAll(".a-metric").classed("dimmed", true);

    // get data
    let data = await api.getAlarmeringen(uri);
    data.map(d => d.date = parseDate(d.datum));
    console.debug(data);

    // update ui
    facts.update(data);
    metrics.update(data);
    map.update(data);
  }
}

function setDateLimiter(days) {
  let date = "";
  if (days > 0) {
    date = new Date();
    date = d3.timeFormat("%Y-%m-%d")(date.setDate(date.getDate() - days));
  }
  params["datum_after"] = date;
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) & obj[p] !== "") { //ignores empty args
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

(function init() {
  console.info("Initializing dashboard");

  d3.selectAll(".a-parameter").each(function () {
    parameter.init(this, BASE_URI, update);
  });
})();
