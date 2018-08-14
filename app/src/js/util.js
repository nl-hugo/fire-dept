/**
 * Util module
 * @module util
 */

const icons = {
  "gebouwbrand": "home",
  "buitenbrand": "tree",
  "hulpverlening": "medkit",
  "voertuig": "car-crash",
  "automatische melding": "bell",
  "proefalarm": "lightbulb",
  "onderzoek": "search",
  "overige brandgerelateerd": "comment",
  "overigen": "comment",
}

/** Returns an icon for the given type */
export function iconForType(t) {
  return d3.map(icons).get(t) || "question";
}

export function className(d) {
  return d.replace(/ /g,"_");
}