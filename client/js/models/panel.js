var mongoose = require('mongoose');

var panelSchema = mongoose.Schema({
	caption: String, 
	imageUrl: String,
	filter: String 
})