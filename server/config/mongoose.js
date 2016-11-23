var mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs'),
    modelsPath = path.join(__dirname, './../models');

mongoose.connect('mongodb://localhost/mean_items');
mongoose.Promise = global.Promise;

fs.readdirSync(modelsPath).forEach(function(file) {
  if (file.indexOf('.js') >= 0) {
    require(path.join(modelsPath, file));
  }
})
