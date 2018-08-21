/**
 * Map module
 * @module map
 */
import L from "leaflet/dist/leaflet";
import { iconForType, d3 } from "./util";

// L.layerGroup
// L.marker
// L.divIcon
// L.latLng
// L.map
// L.tileLayer

const formatDate = d3.timeFormat("%d-%m-%Y");

const alarmeringen = L.layerGroup();

let mymap;

function popupText(d) {
  return `<b>${formatDate(d.date)}</b><br>${d.melding}`;
}

function addMarker(d) {
  L.marker([d.lat, d.lon], {
    icon: L.divIcon({
      html: "<span class='fa-stack fa-2x' style='font-size: 1.2em;'>"
        + "<i class='fas fa-circle fa-stack-2x'></i>"
        + `<i class='fas fa-${iconForType(d.brandinfo)} fa-stack-1x fa-inverse'></i>`
        + "</span>",
      iconSize: [30, 30],
      className: `alarmering prio1-${d.prio1}`,
    }),
  }).addTo(alarmeringen).bindPopup(popupText(d));
}

/** Update the map */
export default function (data) {
  alarmeringen.clearLayers();
  data.filter(d => d.lat && d.lon)
    .map(d => addMarker(d));
  if (data.length > 0 && data[0].lat && data[0].lon) {
    mymap.flyTo(L.latLng(data[0].lat, data[0].lon));
  }
}

/** init */
(function init() {
  const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?", {
      maxZoom: 18,
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
  });

  mymap = L.map("mapid", {
    center: [52.088, 5.4],
    zoom: 10,
    layers: [base, alarmeringen],
  });
}());
