// src/dashboard.js
import * as d3 from "d3";

console.log("Loaded!", d3);

export const draw = () => {
  const svg = d3.select("svg"),
    // margin = {top: 20, left: 20},
    // width = +svg.attr("width"),
    // height = +svg.attr("height"),
    g = svg.append("g");

  d3.json("https://fire-dept-api.herokuapp.com/api/alarmeringen/?page=1", (error, data) => {
    console.log(error);
    console.log(data);

    g.selectAll("text")
      .data(data["results"].slice(0, 10))
      .enter().append("text")
      .attr("y", (d, i) => i * 15)
      .text(d => d.datum + " " + d.tijd + " - " + d.melding);
  });
};