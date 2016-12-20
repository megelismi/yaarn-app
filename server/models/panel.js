var mongoose = require('mongoose');

var panelSchema = mongoose.Schema({
<<<<<<< HEAD
  filter: String,
	text: String,
	imgUrl: String,
	edits: Boolean
=======
  title: String,
	caption: String,
	imageUrl: String,
	filter: String
>>>>>>> 3c46165f317beab4bccacc2612fc5c138d1c7c5c
})

var Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;
