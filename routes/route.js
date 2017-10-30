const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database');

//add modeals here
const customers = require('../models/customers');
const viewer = require('../models/viewer');
const events = require('../models/events');
const myEvents = require('../models/myEvents');
const themes = require('../models/themes');
const packages = require('../models/packages');
const orders = require('../models/orders');
const address = require('../models/address');
const feedback= require('../models/feedback');
const test = require('../models/test');

//Api for customer model
router.get('/customers', (req, res, next) => {
    res.send('All customers should be display here...');
});

router.get('/customer/:id', (req, res, next) => {
    customers.findOne({
        _id: req.params.id
    }, (err, customer) => {
        if (err) {
            res.json(err);
        }
        if(!customer){
            res.json({Msg:'There is no details about your profile !!'});
        }else {
            res.json(customer);
        }
    });
})



router.get('/event', (req, res)=>{

    events.find({}, (err, event)=>{
    if (err) {
        res.json({msg: 'Fail to add event'});
        } else {
            res.json(event);
        }
    });
})


router.post('/event', (req, res, next) => {
    events.findOne().sort({_id: -1}).exec(function(err, result) {
            if(err){
                    res.json(err);
                }else{
                var count= result.eventId;
                var newEvent = new events({
                    eventName: req.body.eventName,
                    eventTagLine: req.body.eventTagLine,
                    eventImage: req.body.eventImage,
                    eventId:count + 1,
                    activeEvent: req.body.activeEvent
                });
                newEvent.save((err, event) => {
                        if (err) {
                            res.json({
                                msg: 'Fail to add event'
                            });
                        } else {
                            res.json(event);
                        }
                });
                }
    });   
})




router.get('/feedback', (req, res, next)=>{
    feedback.find([{},{$sort: { vote: 1 }},{ $limit : 5 } ], (err , feedbacks)=>{
        if(err){
            res.json({Msg: 'There is no Suggestion from others, Be the first to suggest us !!'})
        }else{
            res.json(feedbacks)
        }
    });
})




router.post('/feedback', (req, res, next)=>{
    var newFeedback = new feedback({
        emailId :req.body.emailId,
        suggestion:req.body.suggestion,
        vote:req.body.vote
    });

    feedback.find({suggestion:req.body.suggestion }, (err, result)=>{
        if (err){
            res.json(err);
        }else{
            if(!result){
                newFeedback.save((err, feedback) => {
                    if (err) {
                        res.json({
                            msg: 'Fail to save your feedback , Try again !!'
                        });
                    } else {
                        res.json({Msg: 'Your feedback has been saved successfully !!'});
                    }
                }); 
            }else{
               feedback.findAndModify({
               query: { suggestion: req.body.suggestion},
                update: { score:  req.body.vote} 
               }, (err, result)=>{
                    if (err) {
                        res.json({
                            msg: 'Fail to save your feedback , Try again !!'
                        });
                    } else {
                        res.json({Msg: 'Your feedback has been saved successfully !!'});
                    }
               });
            }
        }
    });
})


router.post('/address', (req, res, next)=>{
        address.find({userId:req.body.userId}).count().exec(function(err, counts) {
            if(err){
                console.log(err);
                res.json(err);
            }else{
                var updatedAddressNo= counts;
                var newAddress = new address({
                         userId : req.body.userId,
                         address: req.body.address,
                         fullName: req.body.fullName,
                         phoneNumber: req.body.phoneNumber,
                         alternateNumber: req.body.alternateNumber,
                         houseNumber: req.body.houseNumber,
                         landMark: req.body.landMark,
                         pincode: req.body.pincode,
                         city: req.body.city,
                         state: req.body.state,
                         addressNo: updatedAddressNo +1
                })        
                console.log(newAddress);
                newAddress.save((err, result) => {
                    if (err) {
                        res.json({
                            msg: 'Fail into order this package'
                        });
                    } else {
                        res.json({Addressno:result.addressNo});
                    }
                }); 
            }
        })   
})


/*
router.get('/address/:userid', (req, res, next)=>{
    // fetch all the address from db
    address.find({userId:req.params.userid}, (err, result)=>{
        if (err){
            res.json(err);
        }
        if(!result){
            res.json({Msg:'There is no address saved ,Please an address for your order !!'});
        }else{
            res.json(result);
        }
    });
})
*/


router.get('/address', (req, res, next)=>{
    // fetch all the address from db
    var userId= req.body.userId;
    var addressNo= req.body.addressNo;

    if(userId && addressNo){
        address.find({ $and: [{userId: req.body.userId},{addressNo: req.body.addressNo}]}, (err, result)=>{
            if (err || ! result){
                res.json({Msg:'There is no address saved ,Please an address for your order !!'});
            }else{
                res.json(result);
            }
        });
    }else{
        if(userId){
            address.find({userId:req.body.userId}, (err, result)=>{
            if (err){
                res.json(err);
            }
            if(!result){
                res.json({Msg:'There is no address saved ,Please an address for your order !!'});
            }else{
                res.json(result);
            }
            });
        }else{
             res.json({Msg:'There is no address saved ,by this user id !!'});
        }
    }
})


/* address for particular userid and address number
router.get('/address/:userid', (req, res, next)=>{
    // fetch all the address from db
    address.find({userId:req.params.userid}, (err, result)=>{
        if (err){
            res.json(err);
        }
        if(!result){
            res.json({Msg:'There is no address saved ,Please an address for your order !!'});
        }else{
            res.json(result);
        }
    });
})

*/

router.post('/package', (req, res) => {
    var newPackage = new packages({
        packageId: req.body.packageId,
        packageName: req.body.packageName,
        packageImageName: req.body.packageImageName,
        packageOriginalPrice: req.body.packageOriginalPrice,
        packageDiscountedPrice: req.body.packageDiscountedPrice,
        eventId: req.body.eventId,
        packageDescription: req.body.packageDescription
    });

    newPackage.save((err, package) => {
        if (err) {
            res.json({
                msg: 'Fail to add package into db'
            });
        } else {
            res.json({
                Msg: 'packges added inot db'
            });
        }
    });
})

router.get('/package/:id', (req, res) => {
    var query = {
        'eventId': req.params.id
    };
    //var eventId: req.body.eventId;	
    packages.find(query, (err, results) => {
        if (err) {
            res.json(err);
        }
        if (!results) {
            res.json({
                Msg: 'There is no package with this Event id.'
            });
        } else {
            res.json(results);
        }
    });
})



router.post('/order', (req, res) => {
    var newOrder = new orders({
        userId: req.body.userId,
        packageId: req.body.packageId,
        orderAmount: req.body.orderAmount,
        eventDate:req.body.eventDate,
        eventTime:req.body.eventTime,
        addressNo:req.body.addressNo,
        remark:req.body.remark
    });
    newOrder.save((err, order) => {
        if (err) {
            res.json({
                msg: 'Fail into order this package'
            });
        } else {
            res.json({OrderNumber:order._id});
        }
    });
})

router.get('/order/:userid', (req, res) => {
    var userId = req.params.userid;
            var packageId = [];
            var orderAmount = [];   
    orders.find({userId}, (err, order)=>{
            if(err){
                res.json(err);
            }
            if(!order){
                res.json('There is nothing to show you. Order now !!');
            }else{
                var orderList = [];
                for (var i = order.length - 1; i >= 0; i--){
                        var packgesString = order[i].packageId;
                        var orderString =   order[i].orderAmount;
                        packageId = packgesString.split("-");
                        orderAmount= orderString.split("-");
                        if(packageId.length == orderAmount.length){
                            for(var index = 0; index < packageId.length; index++) {
                                    var packageid= packageId[index];
                                    var amount = orderAmount[index];
                                    getPackageQuery(packageid, amount,function(res, updatedAmount){
                                           res["packageDiscountedPrice"] = updatedAmount               
                                           orderList.push(res);
                                        });     
                            }
                        }
                    }
                    function getPackageQuery(packageid,amount, callback) {
                                       packages.findOne({packageId:packageid}, function(err, res) {
                                        if (typeof callback === 'function') callback(res, amount)
                                       });
                                    }
                //var orderData= JSON.stringify(orderList);
                setTimeout(function(){
                    if(orderList.length !=0){
                    res.json(orderList);    
                    }else{
                        res.json('There is nothing to show you. Order now ');
                    }
                }, 100)
                }   
    });
});





router.get('/viewer/:id', (req, res) => {
    var query = {
        'appUniqueId': req.params.id
    };

    viewer.findOne(query, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            if (!result) {
                var newViewer = new viewer({
                    appUniqueId: req.params.id
                });
                newViewer.save((err, result) => {
                    if (err) {
                        res.json('Error in add to app unique id');
                    } else {
                        var output = {
                            viewerId: result._id,
                            appVersion: 1,
                            firstTimeUser: 1
                        };
                        res.json(output);
                    }
                });
            } else {
                var output = {
                    viewerId: result._id,
                    appVersion: 1,
                    firstTimeUser: 0
                };
                res.json(output);
            }
        }
    });
})

router.get('/myprofile/:userid', (req, res, next) => {
    var userId = req.params.userid;
    customers.findOne({
        "_id": ObjectId(userId)
    }, (err, profile) => {
        if (err) {
            console.log(profile)
            res.json(err);
        }
        if (!profile) {
            res.json('There is no data to show you, Please Signup/Login !!');
        } else {
            res.json(profile);
        }
    });
})


//register the new user and authenticate
router.post('/register', (req, res, next) => {
    var newCustomer = new customers({
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        customerPassword: req.body.customerPassword,
        customerPhone: req.body.customerPhone,
        customerDob: req.body.customerDob,
        viewerId: req.body.viewerId,
        customerGender: req.body.customerGender
    });
    customers.findOne({
        customerEmail: req.body.customerEmail
    }, (err, result) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Fail to add customer'
            });
        }
        if (!result) {
            customers.addCustomer(newCustomer, (err, customer) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Fail to add customer'
                    });
                } else {
                    res.json({
                        success: true,
                        msg: 'Customer added suucessfully'
                    });
                }
            })
        } else {
            res.json({
                success: false,
                msg: 'Email ID already exist.'
            })
        }

    })
})

router.post('/authenticate', (req, res, next) => {
    var customerEmail = req.body.customerEmail;
    var customerPassword = req.body.customerPassword;
    customers.getCustomerByEmail(customerEmail, (err, customer) => {
        //console.log('customer ', customer)
        if (err) throw err;
        if (!customer) {
            return res.json({
                success: false,
                msg: 'No customer found'
            });
        }
        customers.comparePassword(customerPassword, customer.customerPassword, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                var token = jwt.sign(customer, config.secret); //,{
                //	expiresIn:604800//1 week
                //});
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    userId: customer._id
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'wrong password'
                });
            }
        });
    });
})



//api for themes
router.get('/theme/:id', (req, res, next) => {
    themes.findOne({
        _id: req.params.id
    }, (err, theme) => {
        if (err) {
            res.json(err);
        } else {
            res.json(theme);
        }
    });
})

router.post('/theme', (req, res, next) => {
    var newTheme = new themes({
        themeName: req.body.themeName,
        themeImage: req.body.themeImage,
        themeDetails: req.body.themeDetails,
        themeTerms: req.body.themeTerms,
        themePrice: req.body.themePrice
    });
    newTheme.save((err, theme) => {
        if (err) {
            res.json({
                msg: 'Fail to add new theme'
            });
        } else {
            res.json(theme);
        }
    });
})



//api for my event
router.post('/myevent', (req, res, next) => {
    var newMyEvent = new myEvents({
        viewerId: req.body.viewerId,
        eventType: req.body.eventType,
        personName: req.body.personName,
        eventDate: req.body.eventDate,
        repeatYearly: req.body.repeatYearly,
        eventId: req.body.eventId,
        phoneNumber: req.body.phoneNumber
    });
    newMyEvent.save((err, myevent) => {
        if (err) {
            res.json({
                msg: 'Fail to add your event'
            });
        } else {
            res.json({
                msg: 'Your Event added succesfully'
            });
        }
    });
})

router.get('/myevent/:id', (req, res, next) => {
    var query = {
        viewerId: req.params.id
    };
    myEvents.find(query, (err, events) => {
        if (err) {
            res.json(err);
        }
        if (!events) {
            res.json({
                msg: 'There is no events  for you. Please add a event for your loved one !!'
            });
        } else {
            res.json(events);
        }
    });
})



module.exports = router;