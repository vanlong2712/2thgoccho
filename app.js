var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');



var app = express();
const db=require('./models/db.js');

const bodyParser=require('body-parser');
const session=require('express-session');
const flash= require('connect-flash');

const Passport=require('Passport');
const LocalStrategy=require('Passport-local').Strategy;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({secret:"mysecret"
}));
app.use(Passport.initialize());
app.use(Passport.session());
 app.use(flash());
// view engine setup
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static("public"));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/contact'));
app.use(require('./routes/listing'));
app.use(require('./routes/details'));

app.use(function(req, res, next) {

  next();
});

// catch 404 and forward to error handler


app.listen(3000,function()
	{
		console.log("chay")
	});
module.exports = app;
