var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const customers = require('../models/customers');
const config = require('../config/database');

module.exports= function(passport){
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done){
	//console.log(jwt_payload);
	customers.getCustomerById(jwt_payload._doc._id, (err, customer)=>{
		if(err){
			return done(err, false);
		}
		if (customer) {
            return done(null, customer);
        } else {
            return done(null, false);
            // or you could create a new account 
        }
	});
}));
}