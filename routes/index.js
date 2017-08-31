var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", (req,res,next) =>	{
		if(req.isAuthenticated()) {
      res.render('index', {user : req.user, req: req});
		} else {
			// req.toastr.info('Welcome ');
		 	res.render('index', {req: req});
		}
})
router.get('/login-signup', (req, res, next) => {
  res.render('login-signup', { req: req});
});

module.exports = router;
