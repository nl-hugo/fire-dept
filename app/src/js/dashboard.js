/**
 * Map dashboard
 * @module dashboard
 */
import parameter from "./parameter";
import map from "./map";
import metrics from "./metrics";
import facts from "./facts";
import { d3 } from "./util";

const BASE_URI = "https://fire-dept-api.herokuapp.com/";

const API_ENDPOINT = "alarmeringen/";

const parseDate = d3.timeParse("%Y-%m-%d");

const params = { datum_after: "" };

const api = {
  getAlarmeringen(uri, res) {
    console.debug(uri);
    let alarmeringen = res;
    return d3.json(uri).then((response) => {
      if (!alarmeringen) {
        alarmeringen = [];
      }
      alarmeringen = alarmeringen.concat(response.results);
      if (response.next) {
        return api.getAlarmeringen(response.next, alarmeringen);
      }
      return alarmeringen;
    });
  },
};

function setDateLimiter(days) {
  let date = "";
  if (days > 0) {
    date = new Date();
    date = d3.timeFormat("%Y-%m-%d")(date.setDate(date.getDate() - days));
  }
  params.datum_after = date;
}

function serialize(obj) {
  const str = [];
  Object.keys(obj).forEach((p) => {
    if (obj[p] !== "") {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  });
  return str.join("&");
}

async function update(label, value) {
  console.debug(`${label.pk} ==> ${value}`);
  params[label.parameter] = value;

  // hide spinners
  d3.selectAll(`.wait-spinner.wait-${label.parameter}`).classed("hidden", true);

  // Request data from api once all params are there
  if (Object.keys(params).length === d3.selectAll(".a-parameter").size() + 1) {
    // TODO: no parameter hard-coding
    if (params.capcodes === "" && params.plaats === "") {
      setDateLimiter(7);
    } else {
      setDateLimiter(-1);
    }

    const qs = `?${serialize(params)}`;
    const uri = BASE_URI + API_ENDPOINT + qs;

    // update ui status
    d3.selectAll(".wait-spinner.wait-metrics").classed("hidden", false);
    d3.selectAll(".a-metric").classed("dimmed", true);

    // get and prepare data
    let data = await api.getAlarmeringen(uri);
    // let data = api.getAlarmeringen(uri);
    data = data.filter(d => !d.melding.startsWith("MELDING VERVALT"));
    data.map(d => d.date = parseDate(d.datum)); // eslint-disable-line no-param-reassign, no-return-assign, max-len
    console.debug(data);

    d3.selectAll(".alert").classed("hidden", data.length > 0);
    d3.selectAll(".a-facts").classed("hidden", data.length <= 0);

    // update ui
    facts(data);
    metrics(data);
    map(data);
  }
}

(function init() {
  console.info("Initializing dashboard");
  d3.selectAll(".a-parameter").each(function res() {
    parameter(this, BASE_URI, update);
  });
}());
