const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
	customerName:{
		type:String,
		required:true
	},
	customerPhone:{
		type:String,
		required:true
	},
	customerEmail:{
		type:String,
		required:true
	},
	customerDob:{
		type: Date, 
		default: Date.now
	},
	customerCity:{
		type:String,
		required:true
	},
	customerGender:{
		type:String,
		required:true
	},
})

const customers = module.exports = mongoose.model('customers', customerSchema); 


