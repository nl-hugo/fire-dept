const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const sharedPlugins = require("./sharedPlugins");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    // $: "jquery",
    // jQuery: "jquery",
    // "window.jQuery": "jquery",
    // tether: "tether",
    // Tether: "tether",
    // "window.Tether": "tether",
    // Popper: ["popper.js", "default"],
    // "window.Tether": "tether",
    Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
    // Button: "exports-loader?Button!bootstrap/js/dist/button",
    // Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
    // Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
    // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    // Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
    // Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
    // Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
    // Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
    // Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
    Util: "exports-loader?Util!bootstrap/js/dist/util"
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new BundleAnalyzerPlugin(),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0
  }),
];

module.exports = {
  context: path.resolve(__dirname, "../app"),
  mode: "development",
  devtool: "source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    // path.join(__dirname, "/../app/src/main.js"),
    "bootstrap-loader",
    // "font-awesome/scss/font-awesome.scss",
    "./src/main.js",
  ],
  output: {
    path: path.join(__dirname, "/../dist/"),
    filename: "js/[name].bundle.js",
    // publicPath: "/",
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
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
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
      loader: 'file-loader?name=fonts/[name].[ext]'
    // }, {
    //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    //   use: [{
    //     loader: "url-loader",
    //     options: { limit: 10000, name: "fonts/[name].[ext]" }
    //   }]
    }, {
      test: /\.scss$/,
      loader: ["style-loader", "css-loader", "sass-loader"],
      // exclude: path.resolve(__dirname, 'src/app')
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
        // options: {
        //   presets: ["latest"],
        // },
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
