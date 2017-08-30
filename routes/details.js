var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/details', function(req, res, next) {
			if(req.isAuthenticated())
{  

        res.render('details', {
            user : req.user // get the user out of session and pass to template
        });
  
}
 
 else
 {
 	res.render('details');
 }
})

module.exports = router;
