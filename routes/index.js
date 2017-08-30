var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
			if(req.isAuthenticated())
{
        res.render('trangchu', {
            user : req.user // get the user out of session and pass to template
        });
 }
 else
 {
 	res.render('trangchu');
 }

 		})
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login-signup', (req, res, next) => {
  res.render('login-signup', { title: 'Express' });
});

module.exports = router;
