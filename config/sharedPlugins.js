const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "/../app/index.ejs"),
    inject: "body",
    filename: "index.html",
    title: "Brandmeldingen",
    favicon: "favicon.ico"
  }),
];

module.exports = plugins;