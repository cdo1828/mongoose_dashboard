var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/penguins');

var PenguinSchema = new mongoose.Schema({
	name: String,
	date: Date
})

var Penguin = mongoose.model('Penguins', PenguinSchema);

app.use(bodyParser.urlencoded({extended: true}));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// root route
app.get('/', function(req, res) {
	Penguin.find({}, function(err, penguins){
		if(err){
			console.log('could not write penguin to MongoDB');
		} else {
			console.log('penguin succesfully written to MongoDB');
		}
	res.render('index', {penguins: penguins});
	})
 // This is where we would get the users from the database and send them to the index view to be displayed.
})

app.get('/new', function(req, res) {
	res.render('create_penguin');
})

app.post('/new_penguin', function(req, res){
	console.log("POST DATA", req.body);

	var currentdate = new Date();
	var penguin = new Penguin({name: req.body.name, date: currentdate});

	penguin.save(function(err) {

	if(err) {
 		console.log('something went wrong');
 	} else {
 		console.log('succesfully added a penguin!');
 		res.redirect('/');
 		}
	})	
})

app.get('/edit/:id', function(req, res) {
	Penguin.find({_id: req.params.id}, function(err, penguins){
		if(err){
			console.log('could not find penguin');
		} else {
			console.log('found penguin');
		}	
	res.render('edit', {penguins: penguins});
	})
})

app.post('/update/:id', function(req, res){
	Penguin.update({_id: req.params.id}, {name: req.body.name}, function(err, penguins){
		if(err){
			console.log('could not update penguin');
		} else{
			console.log('succesfully update penguin');
		}
	res.redirect('/');
	})
})

app.listen(8000, function() {
 console.log("listening on port 8000");
 console.log("USING SOCKETS");
})