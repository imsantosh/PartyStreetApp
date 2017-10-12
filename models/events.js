const mongoose= require('mongoose');

const eventSchema = mongoose.Schema({
	eventName:{
		type:String,
		required:true
	},
	eventTagLine:{
		type:String
	},
	eventImage:{
		 type: String,
		 required:true
	}
})


const events = module.exports = mongoose.model('events', eventSchema); 