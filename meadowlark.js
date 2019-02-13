const express = require('express');
// i18n
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const app = express();
// websocket socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
// mysql
const uuidv1 = require('uuid/v1');
const mysql = require('./db/mysql');
// process.env.NODE_ENV = 'dev';
// console.log(mysql.query);

// i18n
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'cn',
    preload: ['en', 'cn'],
    saveMissing: true
  });


// url编码
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static中间件 public文件夹中静态资源
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/dist`));
// 视图引擎handlebars
const handlebars = require('express3-handlebars').create({
  defaultLayout: 'layout',
  extname: '.hbs'
});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.use(i18nextMiddleware.handle(i18next));

app.set('port', process.env.PORT || 3000);

// 中间件处理 静态文件 & 视图
// 路由 || 中间件 加载顺序 important!
// app.VERB 普通页面添加路由 express默认忽略大小写/斜杠
const indexRouter = require('./routes/index');
const chatroomRouter = require('./routes/chatroom');
const msgboardRouter = require('./routes/msgboard');
const addarticleRouter = require('./routes/addarticle');
const svgplaygroundRouter = require('./routes/svgplayground');

app.use('/', indexRouter);
app.use('/chatroom', chatroomRouter);
app.use('/msgboard', msgboardRouter);
app.use('/addarticle', addarticleRouter);
app.use('/svgplayground', svgplaygroundRouter);

// 文章详情
app.use('/article/:articleId', function(req, res) {
  let {articleId: id} = req.params;
  let getArticleById = `SELECT * from express_demo_article where articleId = '${id}';`
  mysql.query(getArticleById, output);
  function output(data) {
    res.json({
      data: data
    });
  }
  // res.render('article', {id});
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
app.get('/getmessage', function(req, res, next) {
  // let getmessage_sql = `SELECT * FROM express_demo_message LIMIT ${(req.query.page-1)*8},8;`
  let getmessage_sql = `SELECT * FROM express_demo_message ORDER BY createDate DESC;`
  mysql.query(getmessage_sql, output);
  function output(data) {
    res.json({
      data: data,
      msg: 'success'
    });
  }
});

// app.post req.body
let title = '"无中生有"';
let sql_sentence = `SELECT * FROM tb_book where bookName = ${title}`;
// console.log(sql_sentence);

app.post('/getbooklist', upload.array(), function(req, res, next) {
  // console.log(req.body);
  mysql.query(sql_sentence, output);
  function output(data) {
    // console.log(data[0]);
    res.json({
      data: data,
      msg: 'success'
    });
  }
});

app.post('/addmessage', upload.array(), function(req, res, next) {
  let addmessage_sql = `INSERT INTO express_demo_message(
    express_demo_message.id,
    express_demo_message.name,
    express_demo_message.content,
    express_demo_message.createDate) 
  VALUES(
    "${uuidv1()}",
    "${req.body.name}",
    "${req.body.content}",
    "2018-11-28 06:02:32")`;
  // console.log(addmessage_sql);
  // console.log(req.body);
  mysql.query(addmessage_sql, output);
  function output(data) {
    // console.log(data[0]);
    res.json({
      data: data,
      msg: 'success'
    });
  }
});

// 增加新文章
app.post('/addArticle', upload.array(), function(req, res, next) {
  let addNewArticle_sql = `INSERT INTO express_demo_article(
    express_demo_article.articleId,
    express_demo_article.title,
    express_demo_article.content,
    express_demo_article.createBy) 
  VALUES(
    CURRENT_TIME,
    "${req.body.title}",
    "${req.body.content}",
    "${req.body.createBy}")`;
  mysql.query(addNewArticle_sql, output);
  function output(data) {
    res.json({
      data: data,
      msg: 'success'
    })
  }
});

// 获取文章 getArticleList
app.get('/getArticleList', function(req, res, next) {
  let getArticleList_sql = 'SELECT * FROM express_demo_article ORDER BY articleId DESC'; 
  mysql.query(getArticleList_sql, output);
  function output(data) {
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
  res.render('404', { layout: null });
});

// 500
app.use(function(err, req, res, next) {
  // console.error(err.stack);
  res.status(500);
  res.render('500', { layout: null });
});

// socket.io
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
  console.log(`express started on port:${app.get('port')}>>>`)
});