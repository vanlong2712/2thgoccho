var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash= require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var toastr = require('express-toastr');

const Passport=require('Passport');
const LocalStrategy=require('Passport-local').Strategy;


var app = express();
const {mongoose} = require('./db/mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('mysecret'));
app.use(session({
    secret: 'mysecret',
    saveUninitialized: true,
    resave: true
}));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(flash());
// Load express-toastr
// You can pass an object of default options to toastr(), see example/index.coffee
app.use(toastr());

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/contact'));
app.use(require('./routes/listing'));
app.use(require('./routes/details'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
