const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const sharedPlugins = require("./sharedPlugins");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development"),
  }),
  new webpack.ProvidePlugin({
    d3: "d3",
    "window.d3": "d3",
    Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
    Util: "exports-loader?Util!bootstrap/js/dist/util"
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    generateStatsFile: true,
    openAnalyzer: false,
    logLevel: "info"
  }),
];

module.exports = {
  context: path.resolve(__dirname, "../app"),
  mode: "development",
  devtool: "source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    "bootstrap-loader",
    "./src/main.js",
  ],
  output: {
    path: path.join(__dirname, "/../dist/"),
    filename: "js/[name].bundle.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
          chunks: "all"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
  plugins: plugins.concat(sharedPlugins),
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: "file-loader",
        options: { limit: 10000, name: "images/[name].[ext]" }
      }]
    }, {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: "file-loader?name=fonts/[name].[ext]"
    }, {
      exclude: /font-awesome/,
      test: /\.scss$/,
      loader: ["style-loader", "css-loader", "sass-loader"],
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ],
    }, {
      exclude: /node_modules/,
      test: /\.js$/,
      use: [{
        loader: "babel-loader",
      }],
    }, {
      exclude: /node_modules/,
      test: /\.js$/,
      use: [{
        loader: "eslint-loader",
      }],
    }],
  },
};
