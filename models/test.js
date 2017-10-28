const mongoose= require('mongoose');

const testSchema = mongoose.Schema({
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
	},
	eventId:{
		type:Number,
		required:true
	}
})


const test = module.exports = mongoose.model('test', testSchema); 