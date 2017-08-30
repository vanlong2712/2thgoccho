var express = require('express');
var router = express.Router();
const db=require('../models/db');

// const Passport=require('Passport');
// const LocalStrategy=require('Passport-local').Strategy;
//
// router.use(session({secret:"mysecret"}));
// router.use(Passport.initialize());
// router.use(Passport.session());
//  router.use(flash());

router.get("/login-signup",function(req,res) {
	res.render('login-signup',{message: req.flash('signupMessage')});
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

 router.route('/signup').get((req,res)=>res.render('login-signup')).post(Passport.authenticate('local-signup',
  {failureRedirect:'login-signup',successRedirect:'/', failureFlash : true}));

     router.route('/login').get((req,res)=>res.render('login-signup')).post(function(req,res,next)
     {
      Passport.authenticate('local-login',function(err,user,info)
      {
        if(err)
          {
            return next(err);
          }
          if (!user) { return res.redirect('/login-signup'); }

 req.logIn(user, function(err) {
      if (err) { return next(err); }
      else
      {
        if(user.role==1)
        {
          return res.redirect('/admin');
        }
      return res.redirect('/');
      }
    });
  })(req, res, next);
});
    router.get('/admin',function(req,res,)
  {
      if(req.user.role==1)
{
        res.render('admin', {
            user : req.user // get the user out of session and pass to template
        });
 }
 else
 {
  res.send('what???', 404);
 }
})

    Passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password,done) {
    	console.log('chay vo use');
    	db.findOne({'username':username},function(err,user)
    	{
    		if(err){
    			return done(err);
    		}
    		 if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }
            else
            {
             const newUser   = new db({
             	username:username,
             	firstName:req.body.firstName,
             	lastName:req.body.lastName,
             	email:req.body.email,
             	password:password ,
              role:0,

             });
             newUser.save((err)=>
             {

             	return done(null,newUser);
             })

            }
    	})
    }))


      Passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
       db.findOne({'username':username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (user.password!=password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));
Passport.serializeUser(function(user, done) {
  console.log('asd');
  done(null, user.username);
});

Passport.deserializeUser((username,done)=>
{
	//day la deserialize
	console.log('desrialize');
	db.findOne({username},(err,user)=>
	{
		console.log("da tim thay trong serialize")
		done(null,user);
	})
})
module.exports = router;
