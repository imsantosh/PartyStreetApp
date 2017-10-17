const mongoose = require('mongoose');
const config = require('../config/database');

const viewerSchema = mongoose.Schema({
	appUniqueId:{
		type:String,
		required:true
		}
})

const viewer = module.exports = mongoose.model('viewer', viewerSchema); 

