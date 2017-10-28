const mongoose= require('mongoose');

const packageSchema = mongoose.Schema({
	packageId:{
		type:String,
		required:true
	},
	packageName:{
		type:String,
		required:true
	},
	packageImageName:{
		type:String,
		required:true
	},
	packageOriginalPrice:{
		type:String,
		required:true
	},
	packageDiscountedPrice:{
		type:String,
		required:true
	},
	eventId:{
		type:String,
		required:true
	},
	packageDescription:{
		type:String
	}
})


const packages = module.exports = mongoose.model('packages', packageSchema); 


