if (module.hot) {
  module.hot.accept();
}

import "../styles/style.scss";
import "../images/";

// const routes = {
//   dashboard: () => {
//     System.import("./dashboard").then((dashboard) => {
//       dashboard.draw();
//     }).catch((err) => {
//       console.log("Chunk loading failed " + err);
//     });
//   }
// };

// demo async loading with a timeout
// setTimeout(routes.dashboard, 1000);

import * as draw from "./dashboard";
console.log(draw);
draw.draw();