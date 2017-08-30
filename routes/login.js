var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const dbUser=require('./../models/dbUser');

const Passport=require('Passport');
const LocalStrategy=require('Passport-local').Strategy;

router.route('/signup')
.get((req,res,next) => res.redirect('/login-signup'))
.post(Passport.authenticate('local-signup', {failureRedirect: '/signup'}), (req, res, next) => {
  req.toastr.success('Bạn đã đăng ký thành công');
  res.render('index', {req: req});
})

router.route('/login')
.get((req,res,next) => res.redirect('/login-signup'))
.post(Passport.authenticate('local-login', {failureRedirect: '/login'}), (req, res, next) => {
  res.redirect('/');
});

Passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, username, password, done) {
	console.log('chay vo local-signup');
	dbUser.findOne({'username': req.body.username},function(err,user) {
		if(err){
			return done(err);
		}
		 if (user) {
        return done(null, false, req.toastr.error('That email is already taken.'));
    } else {
       const newUser   = new dbUser({
         	username:req.body.username,
         	firstName:req.body.firstName,
         	lastName:req.body.lastName,
         	email:req.body.email,
         	password:password ,
          role:0,
       });
       newUser.save().then((err) =>  done(null,newUser));
    }
	})
}));

Passport.use('local-login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  dbUser.findOne({'username': username}).then((user) => {
    if (!user) {
      req.toastr.error('Không tìm thấy tên đăng nhập này')
      return done(null,false);
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        req.toastr.success('Bạn đã đăng nhập thành công', `Xin chào ${user.username}`);
        return done(null,user);
      } else {
        req.toastr.error('Sai mật khẩu hoặc tài khoản');
        return done(null, false);
      }
    })
  }).catch((e) => {
    req.toastr.error('Đăng nhập không thành công');
    return done(e);
  });

  Passport.serializeUser((user, done) => {
    done(null, user.username)
  });

  Passport.deserializeUser((username, done) => {
    dbUser.findOne({username},(err,user) => {
  		console.log("da tim thay trong serialize")
  		done(null,user);
  	})
  });

}));

module.exports = router;
