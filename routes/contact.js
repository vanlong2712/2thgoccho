var express = require('express');
var router = express.Router();
router.get("/contact",function(req,res)
	{
			if(req.isAuthenticated())
{  
        res.render('contact', {
            user : req.user // get the user out of session and pass to template
        });
 }
 else
 {
 	res.render('contact');
 }
});

module.exports = router;
