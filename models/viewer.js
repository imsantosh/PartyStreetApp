const mongoose = require('mongoose');
const config = require('../config/database');

const viewerSchema = mongoose.Schema({
	appUniqueId:{
		type:String,
		required:true
		},
	appVersion:{
		type:String
	}	
})

const viewer = module.exports = mongoose.model('viewer', viewerSchema); 

