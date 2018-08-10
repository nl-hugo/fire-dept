/**
 * Map module
 * @module map
 */
import { iconForType } from "./util";

const parseDate = d3.timeFormat("%d-%m-%Y");
 
const alarmeringen = L.layerGroup(),
    popup = L.popup(),
    station = {
      "lat": 52.0607,
      "lon": 5.3884,
      "desc": "Brandweer Maarn/Maarsbergen",
    };

/** Update the map */
export function update(data) {
  alarmeringen.clearLayers();
  data.filter(d => d.lat && d.lon)
    .map(d => addMarker(d));
}

function popupText(d) {
  return "<b>" + parseDate(d.datum) + "</b><br>" + d.melding;
}

function addMarker(d) {
  // d.lat, d.lon, d.melding, iconForType(d.brandinfo), alarmeringen
  L.marker([d.lat, d.lon], {
    icon: L.divIcon({
      html: "<i class='fas fa-circle fa-stack-2x'></i>",
      iconSize: [30, 30],
      className: "myDivIcon prio1-" + d.prio1
    })
  }).addTo(alarmeringen);

  L.marker([d.lat, d.lon], {
    icon: L.divIcon({
      html: "<i class='fas fa-"+ iconForType(d.brandinfo) +" fa-stack-1x fa-inverse'></i>",
      iconSize: [30, 30],
      className: "myDivIcon"
    })
  }).addTo(alarmeringen).bindPopup(popupText(d));
}

(function init() {
  const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?", {
      maxZoom: 18,
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, " +
          "<a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, " +
          "Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      id: "mapbox.streets"
  });

  const mymap = L.map("mapid", {
    center: [station.lat, station.lon], 
    zoom: 11,
    layers: [base, alarmeringen]
  });

  L.marker([station.lat, station.lon], {
    icon: L.divIcon({
      html: "<i class='fas fa-map-marker-alt fa-2x'></i>",
      iconSize: [30, 30],
      className: "myDivIcon"
    })
  }).addTo(mymap).bindPopup(station.desc);
})();
