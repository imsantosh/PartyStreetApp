const mongoose= require('mongoose');

const myEventSchema = mongoose.Schema({
	viewerId:{
		type:String,
		required:true
	},
	eventType:{
		type:String,
		required:true
	},
	personName:{
		type:String,
		required:true
	},
	eventDate:{
		type: String, 
		required:true
	},
	repeatYearly:{
		type:Boolean,
		required: true
	},
	eventId:{
		type:String,
		required:true
	},
	phoneNumber:{
		type:String,
	}
})


const myEvents = module.exports = mongoose.model('myEvents', myEventSchema); 


