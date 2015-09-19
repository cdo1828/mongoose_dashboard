var Penguins = require('../controllers/penguins.js');


module.exports = function(app){

	app.get('/', function(req, res) {
		Penguins.show(req, res);
	 // This is where we would get the users from the database and send them to the index view to be displayed.
	})

	app.get('/new', function(req, res) {
		res.render('create_penguin');
	})

	app.post('/new_penguin', function(req, res){
		Penguins.create(req, res);
	})

	app.get('/edit/:id', function(req, res) {
		Penguins.find_by_id(req, res);
	})

	app.post('/update/:id', function(req, res){
		Penguins.update(req, res);
	})
}