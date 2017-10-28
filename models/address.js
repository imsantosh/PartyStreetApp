const mongoose= require('mongoose');

const addressSchema = mongoose.Schema({
	userId:{
		type:String,
		required: true
	},
	address:{
		type:String,
		required:true
	},
	addressNo:{
		type:String,
		required:true
	}
}) 


const address = module.exports = mongoose.model('address', addressSchema); 