var express = require('express');
var router = express.Router(); // 内建中间件 新建路由实例

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

module.exports = router;
