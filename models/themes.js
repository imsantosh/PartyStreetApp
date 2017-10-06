const mongoose= require('mongoose');

const themeSchema = mongoose.Schema({
	themeName:{
		type:String,
		required:true
	},
	themeImage:{
		type: String,
		required:true
	},
	themeDetails:{
		type:String,
		required:true
	},
	themeTerms:{
		type:String,
		required:true
	},
	themePrice:{
		type:String,
		required:true
	}
})


const themes = module.exports = mongoose.model('themes', themeSchema); 


