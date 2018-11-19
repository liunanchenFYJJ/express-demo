var express = require('express');
var app = express();
var fortune = require('./lib/fortune');

// static中间件 public文件夹中静态资源
app.use(express.static(`${__dirname}/public`));
// 视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// 中间件处理 静态文件 & 视图
// 路由 || 中间件 加载顺序 important!
// app.VERB 普通页面添加路由 express默认忽略大小写/斜杠
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about', { fortunes: fortune.getFortune() });
});

// 区别于普通页面，中间件
// 404
app.use(function(req, res, next) {
  res.status(404);
  res.render('404');
});

// 500
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log(`express started on http://localhost${app.get('port')}>>>`)
});