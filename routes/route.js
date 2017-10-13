const express = require('express');
const router = express.Router();
const customers = require('../models/customers');
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


router.post('/customer', (req,res,next)=>{
var newCustomer = new customers({
	customerName: req.body.customerName,
	customerEmail: req.body.customerEmail,
	customerPhone: req.body.customerPhone,
	customerDob: req.body.customerDob,
	customerCity: req.body.customerCity,
	customerGender: req.body.customerGender
});
newCustomer.save((err, customer)=>{
	if(err){
		res.json({msg:'Fail to add customer'});
	}
	else{
		res.json(customer);
	}
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
	eventName:req.body.eventName,
	eventDate:req.body.eventDate,
	themeImage:req.body.themeImage,
	name:req.body.name,
	repeatAlarm:req.body.repeatAlarm,
	notification:req.body.notification,
	sendSMS:req.body.sendSMS
	});

newMyEvent.save((err, myevent)=>{
	if(err){
		res.json({msg:'Fail to add your events'});
	}
	else{
		res.json({msg:'Your Event added succesfully'});
	}
});
})







module.exports = router;
