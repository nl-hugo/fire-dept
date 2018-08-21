const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "/../app/index.ejs"),
    inject: "body",
    filename: "index.html",
    title: "Brandmeldingen",
    favicon: "favicon.ico"
  }),
  new CleanWebpackPlugin(["dist"], {
    root: path.join(__dirname, '..')
  }),
];

module.exports = plugins;