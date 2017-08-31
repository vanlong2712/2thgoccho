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
    console.log(req.toastr);;

  res.render('index', {req: req});
})

router.route('/login')
.get((req,res,next) => res.redirect('/login-signup'))
.post(Passport.authenticate('local-login', {failureRedirect: '/login', successRedirect: '/'}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

Passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, email, password, done) {
	console.log('chay vo local-signup');
	dbUser.findOne({'email': req.body.email},function(err,user) {
		if(err){
			return done(err);
		}
		 if (user) {
       req.toastr.error('That email is already taken.')
        return done(null, false);
    } else {
       const newUser   = new dbUser({
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
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  dbUser.findOne({'email': email}).then((user) => {
    if (!user) {
      req.toastr.error('Không tìm thấy tên đăng nhập này')
      return done(null,false);
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        req.toastr.success('Bạn đã đăng nhập thành công', `Xin chào ${user.lastName}`);
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

}));

  Passport.serializeUser((user, done) => {
    done(null, user.email)
  });

  Passport.deserializeUser((email, done) => {
    dbUser.findOne({email},(err,user) => {
  		done(null,user);
  	})
  });

module.exports = router;
