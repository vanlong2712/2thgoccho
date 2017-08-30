var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login-signup', (req, res, next) => {
  res.render('login-signup', { title: 'Express' });
});

module.exports = router;
