const path = require('path');
const devConfig = require('./webpack.config.js');

const config = Object.assign({}, devConfig, {
  mode: "production",
  entry: [
    path.join(__dirname, '/../app/src/main.js'),
  ],
});

module.exports = config;
