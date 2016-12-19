var mongoose = require('mongoose');

var indiviualStorySchema = mongoose.Schema({
	panelId: { 
		type: mongoose.Schema.types.ObjectId, 
		panel: String
	}
})