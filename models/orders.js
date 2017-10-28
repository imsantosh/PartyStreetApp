const mongoose= require('mongoose');

const orderSchema = mongoose.Schema({
	userId:{
		type:String,
		required:true
	},
	packageId:{
		type:String,
		required:true
	},
	orderAmount:{
		type:String,
		required:true
	},
	eventDate:{
		type:String,
		required:true
	},
	eventTime:{
		type:String,
		required:true
	},
	remark:{
		type:String
	},
	
})

const orders = module.exports = mongoose.model('orders', orderSchema); 