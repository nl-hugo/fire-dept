
// let mymap, mapLink;

import { iconForType } from "./util";
 

let /*mymap, popup,*/ alarmeringen;

const station = {
  "lat": 52.060462,
  "lon": 5.388007,
  "desc": "Brandweer Maarn/Maarsbergen",
}


export function update(data) {
  // remove all existing markers, except the station
  alarmeringen.clearLayers();


  data.filter(d => d.lat && d.lon)
    .map(d => addMarker(d.lat, d.lon, d.melding, iconForType(d.brandinfo), alarmeringen));
}
/*
function onMapClick(e) {
  popup.setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}
*/
function addMarker(lat, lon, desc, icon, layer) {
  L.marker([lat, lon], {
    icon: L.divIcon({
      html: "<i class='fas fa-circle fa-stack-2x'></i>",
      iconSize: [30, 30],
      className: "myDivIcon"
    })
  }).addTo(layer);

  L.marker([lat, lon], {
    icon: L.divIcon({
      html: "<i class='fas fa-"+ icon +" fa-stack-1x fa-inverse'></i>",
      iconSize: [30, 30],
      className: "myDivIcon"
    })
  }).addTo(layer).bindPopup(desc);
}

(function init() {

  const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?", {
  // L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
      maxZoom: 18,
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, " +
          "<a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, " +
          "Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      id: "mapbox.streets"
  }); //.addTo(mymap);

  alarmeringen = L.layerGroup();

  const mymap = L.map("mapid", {
    center: [station.lat, station.lon], 
    zoom: 11,
    layers: [base, alarmeringen]
  });

  const popup = L.popup();


  // L.control.layers(base, alarmeringen).addTo(mymap);

  L.marker([station.lat, station.lon], {
    icon: L.divIcon({
      html: "<i class='fas fa-map-marker-alt fa-2x'></i>",
      iconSize: [30, 30],
      className: "myDivIcon"
    })
  }).addTo(mymap).bindPopup(station.desc);

  // addMarker(station.lat, station.lon, station.desc, "map-marker-alt", base);

  // mymap.on("click", onMapClick);
})();
