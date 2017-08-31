var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/",function(req,res)
	{
			if(req.isAuthenticated())
{  
	console.log(req.user+`trang index`);
	// req.toastr.info('Welcome ${req.user}');
        res.render('index', {
            user : req.user // get the user out of session and pass to template
        });
 }
 else
 {
 	res.render('index');
 }
})
router.get('/login-signup', (req, res, next) => {
  res.render('login-signup', { title: 'Express' });
});

module.exports = router;

