var mongoose = require('mongoose');

var panelSchema = mongoose.Schema({
  title: String,
	caption: String,
	imageUrl: String,
	filter: String
})

var Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;
