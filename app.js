var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var port = 9000;
var q = require('q');
//initialisation of app
var app = express();

// Data base connections.
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost:27017/partystreet');

mongoose.connection.on('connnected',()=>{
	console.log('Connected to mongodb database @27017');
});
mongoose.connection.on('error',(err)=>{
	if(err){
		console.log('Error in database connection:'+ err);
	}
});


//adding middleware cors
app.use(cors());

// adding middleware body-parser
app.use(bodyParser.json());

//static file should be in a sigle folder
app.use(express.static(path.join(__dirname,'public')));


//Setting Route
const route = require('./routes/route');

app.use('/api', route);


// home page
app.get('/', (req,res)=>{
  res.send('Home page should be go here...');
})



// app is running at port at 9000 in serverside
app.listen(port,(err)=>{
	if(!err){
	console.log('server is up and running at:'+port);
}
})
