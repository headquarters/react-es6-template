// The babel-loader allows us to use ES6 code in any file
// that webpack loads, but this is not one so we use ES5 code in here only.
var express = require('express');
var path = require('path');
var page = require('./page.generated.js');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');
var compiler = webpack(webpackConfig[0]);

var app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig[0].output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', function(req, res) {
    return page(req, res);
});

app.listen(3000, function() {
    console.info('Server listening on port 3000');
})