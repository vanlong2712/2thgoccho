var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/details', (req, res, next) => {
	if(req.isAuthenticated()) {
    res.render('details', {user : req.user, req: req});
	} else {
		res.render('details');
	}
});

module.exports = router;
