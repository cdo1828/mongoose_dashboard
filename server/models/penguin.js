var mongoose = require('mongoose');

var PenguinSchema = new mongoose.Schema({
	name: String,
	date: Date
})

var Penguin = mongoose.model('penguins', PenguinSchema);

