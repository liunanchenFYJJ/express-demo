var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fortune = require('./lib/fortune');

var mysql = require('./db/mysql');
// url编码
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/chatroom', function(req, res) {
  res.render('chatroom', { layout: null });
});

app.get('/about', function(req, res) {
  res.render('about', { fortunes: fortune.getFortune() });
});

app.get('/newsletter', function(req, res) {
  res.render('newsletter', { csrf: 'csrf token goes here' });
});

// app.post('/process', function(req, res){
//   console.log('Form (from querystring): ' + req.query.form);
//   console.log('CSRF token (from hidden form field): ' + req.body._csrf);
//   console.log('Name (from visible form field): ' + req.body.name);
//   console.log('Email (from visible form field): ' + req.body.email);
//   res.redirect(303, '/thank-you');
// });

// get|post接口

// app.get req.query
// app.get('/getbooklist', function(req, res, next) {
//   console.log(req.query);
//   res.status(200).send('success');
// });

// app.post req.body
var title = '"无中生有"';
var sql_sentence = `SELECT * FROM tb_book where bookName = ${title}`;
console.log(sql_sentence);

app.post('/getbooklist', upload.array(), function(req, res, next) {
  // console.log(req.body);
  mysql.getlistquery(sql_sentence, output);
  function output(data) {
    // console.log(data[0]);
    res.json({
      data: data,
      msg: 'success'
    });
  }
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

// io
let usernum = 0; // 当前用户数
// let user = [];
io.on('connection', function(socket) {

  usernum += 1;
  console.log(`${usernum} 个用户已连接`);
  
  socket.on('login', function(data) {
    // user.push({
    //   username: data.username,
    //   msg: [],
    // });
    
    console.log(`${data.username} connected!`);
    socket.emit('loginsuccess', data);
  });

  socket.on('chatroom', function(data) {
    console.log(`from: ${data.username}-recevied msg: ${data.msg}`);
    io.emit('chatroom', data);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
    usernum -= 1;
    // console.log(`${usernum} 个用户已连接`);
  });

});


http.listen(app.get('port'), function() {
  console.log(`express started on http://localhost${app.get('port')}>>>`)
});