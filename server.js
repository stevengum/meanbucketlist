const express = require('express');
const session = require('express-session');
const bp = require('body-parser');
const path = require('path');
var app = express(),
    port = process.env.port || 8000;

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(bp.json());

app.use(express.static(path.join(__dirname, "/client")))
app.use(express.static(path.join(__dirname, "/client/assets")))
app.use(express.static(path.join(__dirname, "/bower_components")))

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, ()=>{
    console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Server listening on 8000');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
})
