var mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs'),
    modelsPath = path.join(__dirname, './../models');

//when starting up mongod; use --port <port_number> to tell mongo to listen on this specific port.
//inside of this mongoose config file; write the following line of code to tell mongoose to look for a different port:
// mongoose.connect('mongodb://localhost:<port_number>/mean_items')

mongoose.connect('mongodb://localhost:9000/mean_items');
mongoose.Promise = global.Promise;

fs.readdirSync(modelsPath).forEach(function(file) {
  if (file.indexOf('.js') >= 0) {
    require(path.join(modelsPath, file));
  }
})
