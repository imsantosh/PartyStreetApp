const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


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
	customerPassword:{
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


module.exports.getCustomerById =function(id, callback){
	customers.findById(id, callback);
}

module.exports.getCustomerByEmail =function(customerEmail, callback){
	var query = {customerEmail:customerEmail};
	customers.findOne(query, callback);
}

module.exports.addCustomer= function(newCustomer, callback){
	bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(newCustomer.customerPassword, salt, (err, hash)=>{
    	if(err) throw err;
    	newCustomer.customerPassword = hash;
    	newCustomer.save(callback);
       });
    });
}

module.exports.comparePassword= function(candidatePassword, hashPassword, callback){
	bcrypt.compare(candidatePassword, hashPassword, (err, isMatch)=>{
		if(err) throw err;
		callback(null, isMatch);
	});
}






