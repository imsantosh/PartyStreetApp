const mongoose= require('mongoose');

const myEventSchema = mongoose.Schema({
	eventName:{
		type:String,
		required:true
	},
	eventDate:{
		type: Date, 
		default: Date.now,
		required:true
	},
	themeImage:{
		type:String,
		required:true
	},
	name:{
		type:String,
	},
	repeatAlarm:{
		type:Boolean,
		required: true
	},
	notification:{
		type:Boolean,
		required: true
	},
	sendSMS:{
		type:Boolean,
		required: true
	}
})


const myEvents = module.exports = mongoose.model('myEvents', myEventSchema); 


