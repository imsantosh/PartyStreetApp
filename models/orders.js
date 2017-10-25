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
	}
})

const orders = module.exports = mongoose.model('orders', orderSchema); 