const mongoose= require('mongoose');

const addressSchema = mongoose.Schema({
	userId:{
		type:String,
		required: true
	},
	fullName:{
		type:String,
		required: true
	},
	phoneNumber:{
		type:String,
		required: true
	},
	alternateNumber:{
		type:String
	},
	houseNumber:{
		type:String
	},
	address:{
		type:String,
		required:true
	},
	landMark:{
		type:String,
		required: true
	},
	pincode:{
		type:String,
		required: true
	},
	city:{
		type:String,
		required: true
	},
	state:{
		type:String,
		required: true
	},
	addressNo:{
		type:String,
		required:true
	}
}) 


const address = module.exports = mongoose.model('address', addressSchema); 