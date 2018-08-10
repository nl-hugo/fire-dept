/**
 * Map dashboard
 * @module dashboard
 */
import * as parameter from "./parameter";
import * as map from "./map";
import * as metrics from "./metrics";


const BASE_URI = "https://fire-dept-api.herokuapp.com/";
const API_ENDPOINT = "alarmeringen/";

let params = {};

let api = {
  getAlarmeringen: function(uri, alarmeringen) {
    return d3.json(uri).then(function(response) {
      if (!alarmeringen) {
        alarmeringen = [];
      }
      // console.log(repsonse);
      alarmeringen = alarmeringen.concat(response.results);
      // console.log(alarmeringen.length + " alarmeringen so far");
      console.log(response.next);
      
      if (response.next) {
        return api.getAlarmeringen(response.next, alarmeringen);
      }
      return alarmeringen;
    });
  }
}


async function update(label, value) {
  console.log(label.pk + " ==> " + value);

  params[label.parameter] = value;
  // console.log(params);

  // console.log("params  " + );
  // console.log("filters " + );

  // Request data from apu once all params are there
  if (Object.keys(params).length === d3.selectAll(".a-parameter").size()) {
    const qs = "?" + serialize(params),
      uri = BASE_URI + API_ENDPOINT + qs;

    console.log(uri);

    let data = await api.getAlarmeringen(uri);
    console.log(data);

    metrics.update(data);

    console.log(map);
    console.log(data);
    map.update(data);
  }
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

// init();
