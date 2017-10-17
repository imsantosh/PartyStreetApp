const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport= require('passport');
const config = require('../config/database');

//add modeals here
const customers = require('../models/customers');
const viewer = require('../models/viewer');
const events = require('../models/events');
const myEvents = require('../models/myEvents');
const themes = require('../models/themes');


//Api for customer model
router.get('/customers', (req,res,next )=>{
	res.send('All customers should be display here...');
});

router.get('/customer/:id', (req,res,next)=>{
	customers.findOne({_id: req.params.id},(err, customer)=>{
		if(err){
			res.json(err);
		}
		else{
			res.json(customer);
		}
	});
})

router.get('/viewer/:id', (req, res)=>{
	var query = { 'appUniqueId' : req.params.id };
	viewer.findOne(query, (err, result)=>{
		if(err){
			res.json(err);
		}else{
			if(!result){
				var newViewer = new viewer({
				appUniqueId: req.params.id	
				});
			newViewer.save((err, result)=>{
				if(err){
					res.json('Error in add to app unique id');
				}else{
					res.json(result._id);
				}
			});
			}else{
			res.json(result._id);
			}
		}
	});
})

router.post('/register', (req,res,next)=>{
var newCustomer = new customers({
	customerName: req.body.customerName,
	customerEmail: req.body.customerEmail,
	customerPassword: req.body.customerPassword,
	customerPhone: req.body.customerPhone,
	customerDob: req.body.customerDob,
	customerCity: req.body.customerCity,
	customerGender: req.body.customerGender
});

// addusers
customers.addCustomer(newCustomer, (err, customer)=>{
	if(err){
		res.json({success:false, msg:'Fail to add customer'});
	}else{
		res.json({success:true, msg:'Customer added suucessfully'});
	}
});
})


router.post('/authenticate', (req, res, next)=>{
	var customerEmail= req.body.customerEmail;
	console.log('email ',req.body)
	var customerPassword= req.body.customerPassword;
customers.getCustomerByEmail(customerEmail, (err, customer)=>{
	//console.log('customer ', customer)
		if(err) throw err;
		if(!customer){
			return res.json({success:false, msg:'No customer found'});
		}
customers.comparePassword(customerPassword, customer.customerPassword, (err, isMatch)=>{
if (err) throw err;
if(isMatch){
	console.log('customer baad wala', customer)
	var token= jwt.sign(customer, config.secret);//,{
	//	expiresIn:604800//1 week
	//});
	res.json({
		success:true,
		token:'JWT '+token,
		customer: {
			customerEmail:customer.customerEmail,
			customerName:customer.customerName
				}
			});
		}else{
			return res.json({success:false, msg:'wrong password'});
		}
});			
});	
})



//Api for events model
//get all event list
router.get('/event', (req,res,next)=>{
	events.find({},(err, events)=>{
		if(err){
			res.json(err);
		}
		else{
			res.json(events);
		}
	});
})

router.post('/event', (req,res,next)=>{
	var newEvent = new events({
		eventName: req.body.eventName,
		eventTagLine: req.body.eventTagLine,
		eventImage: req.body.eventImage
	});
	newEvent.save((err, event)=>{
		if(err){
		res.json({msg:'Fail to add event'});
	}
	else{
		res.json(event);
	}
	});
})






//api for themes
router.get('/theme/:id', (req,res,next)=>{
	themes.findOne({_id: req.params.id},(err, theme)=>{
		if(err){
			res.json(err);
		}
		else{
			res.json(theme);
		}
	});
})

router.post('/theme', (req,res,next)=>{
	var newTheme = new themes({
		themeName: req.body.themeName,
		themeImage: req.body.themeImage,
		themeDetails: req.body.themeDetails,
		themeTerms: req.body.themeTerms,
		themePrice: req.body.themePrice
	});
newTheme.save((err, theme)=>{
	if(err){
		res.json({msg:'Fail to add new theme'});
	}
	else{
		res.json(theme);
	}
});
})

//api for my event

router.post('/myevent', (req,res,next)=>{
	var newMyEvent = new myEvents({
	viewerId: req.body.viewerId,
	eventType:req.body.eventType,	
	personName:req.body.personName,
	eventDate:req.body.eventDate,
	repeatAlarm:req.body.repeatAlarm,
	eventId:req.body.eventId,
	phoneNumber: req.body.phoneNumber
	});

newMyEvent.save((err, myevent)=>{
	if(err){
		res.json({msg:'Fail to add your  your event'});
	}
	else{
		res.json({msg:'Your Event added succesfully'});
	}
});
})

router.get('/myevent/:id', (req,res,next)=>{
	var query = {viewerId:req.params.id};
myEvents.find({query},(err, events)=>{
		if(err){
			res.json(err);
		}
		else{
			res.json(events);
		}
	});
})



module.exports = router;
