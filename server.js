//Modules =====================================================================
var express 		= require('express');
var morgan			= require('morgan');
var bodyParser		= require('body-parser');
var mongoose		= require('mongoose');
var methodOverride	= require('method-override');

var app 		= express();

//Configuration ================================================================

var db 			= require('./config/db');

var port		= process.env.PORT || 3000;

//Connecting to the database
mongoose.connect(db.url);	

//parse application/json
app.use(bodyParser.json());

//parse application/vnd.api+json (content-Type) as JSON 
app.use(bodyParser.json({type: 'application/vnd.api_json'}));

//parse application/x-www-form-urlencoded
//Applicable to POST method
app.use(bodyParser.urlencoded({extended:true}));

//Simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set the static file location
app.use(express.static(__dirname+'/public'));

//Routes ==============================================================
require('./app/routes')(app);

//Start App============================================================
app.listen(port);

//Inform User==========================================================
console.log('Listening on port 3000');


//Expose App
exports = module.exports = app;