console.log('/config/routes.js loaded');
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

var items = require('./../controllers/items.js');
var users = require('./../controllers/users.js');

module.exports = function(app){
    app.post('/login', users.login);
    app.post('/register', users.register);
    app.get('/logout', users.logout);
    app.get('/user/session', users.session);
    app.get('/users', users.getUsers);
    app.post('/createItem', items.createItem);
    app.get('/getItems', items.getItems);
    app.get('/getUser/:userId', users.getUser);
    app.post('/item/completed', items.completed);
}
