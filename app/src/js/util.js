

const icons = {
  "gebouwbrand": "home",
  "buitenbrand": "tree",
  "hulpverlening": "medkit",
  "voertuig": "car-crash",
  "automatische melding": "bell",
  "overigen": "comment",
  "proefalarm": "question",
  "overige brandgerelateerd": "comment",
  "onderzoek": "search",
}

export function iconForType(t) {
  return icons[t];
}