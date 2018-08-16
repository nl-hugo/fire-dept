/**
 * Map module
 * @module map
 */
import { iconForType } from "./util";

const formatDate = d3.timeFormat("%d-%m-%Y");
 
const alarmeringen = L.layerGroup(),
    popup = L.popup(),
    station = {
      "lat": 52.0607,
      "lon": 5.3884,
      "desc": "Brandweer Maarn/Maarsbergen",
    };

let mymap;

/** Update the map */
export function update(data) {
  alarmeringen.clearLayers();
  data.filter(d => d.lat && d.lon)
    .map(d => addMarker(d));
  if (data.length > 0 && data[0].lat && data[0].lon) {
    mymap.flyTo(L.latLng(data[0].lat, data[0].lon));
  }
}

function popupText(d) {
  return "<b>" + formatDate(d.date) + "</b><br>" + d.melding;
}

function addMarker(d) {
  L.marker([d.lat, d.lon], {
    icon: L.divIcon({
      html: "<span class='fa-stack fa-2x' style='font-size: 1.2em;'>" +
            "<i class='fas fa-circle fa-stack-2x'></i>" +
            "<i class='fas fa-" + iconForType(d.brandinfo) + " fa-stack-1x fa-inverse'></i>" +
            "</span>",
      iconSize: [30, 30],
      className: "alarmering prio1-" + d.prio1
    })
  }).addTo(alarmeringen).bindPopup(popupText(d));
}

(function init() {
  const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?", {
      maxZoom: 18,
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  });

  mymap = L.map("mapid", {
    center: [station.lat, station.lon], 
    zoom: 11,
    layers: [base, alarmeringen]
  });

  L.marker([station.lat, station.lon], {
    icon: L.divIcon({
      html: "<i class='fas fa-map-marker-alt fa-2x'></i>",
      iconSize: [30, 30],
      className: "alarmering"
    })
  }).addTo(mymap).bindPopup(station.desc);
})();
