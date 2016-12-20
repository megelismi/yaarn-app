var mongoose = require('mongoose');

var panelSchema = mongoose.Schema({
  filter: String,
	text: String,
	imgUrl: String,
	edits: Boolean
})

var Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;
