var mongoose = require('mongoose');
var Penguin = mongoose.model('penguins');

module.exports = {

	show: function(req, res){
		Penguin.find({}, function(err, penguins){
			if(err){
				console.log('could not write penguin to MongoDB');
			} else {
				console.log('penguin succesfully written to MongoDB');
			}
		res.render('index', {penguins: penguins});
		})
	},

	create: function(req, res) {
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
	},

	find_by_id: function(req, res){
		Penguin.find({_id: req.params.id}, function(err, penguins){
			if(err){
				console.log('could not find penguin');
			} else {
				console.log('found penguin');
			}	
		res.render('edit', {penguins: penguins});
		})		
	},

	update: function(req, res){
		Penguin.update({_id: req.params.id}, {name: req.body.name}, function(err, penguins){
			if(err){
				console.log('could not update penguin');
			} else{
				console.log('succesfully update penguin');
			}
		res.redirect('/');
		})
	}
}