var express = require('express');
var router = express.Router();

/* GET chatroom page. */
router.get('/chatroom', function(req, res, next) {
  res.render('chatroom');
});

module.exports = router;
