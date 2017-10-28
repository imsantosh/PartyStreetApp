const mongoose= require('mongoose');

const feedbackSchema = mongoose.Schema({
	emailId:{
		type:String,
		required: true
	},
	suggestion:{
		type:String,
		required:true
	},
	vote:{
		type:Number,
		required:true,
		default:0
	},
	status:{
		type:String,
		required:true,
		default:'Under Review'
	}
}) 


const feedback = module.exports = mongoose.model('feedback', feedbackSchema); 