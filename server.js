var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended: true}));
// static content
app.use(express.static(path.join(__dirname, "./client/static")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');

routes_setter(app);



app.listen(8000, function() {
 console.log("listening on port 8000");
 console.log("USING SOCKETS");
})