var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
		if(req.isAuthenticated()) {
			// req.toastr.info(`Welcome ${req.user.username} `)
    	res.render('index', {req : req }); // get the user out of session and pass to template
		}
	 else {
		 req.toastr.info(`Welcome guest`);
 			res.render('index', {req: req});
	 }
});

router.get("/login-signup", (req,res,next) => {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login-signup', {req: req});
  }
});

module.exports = router;
