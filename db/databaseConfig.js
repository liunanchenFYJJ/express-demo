let config = null;
if (process.env.NODE_ENV == 'dev') {
  config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'python_demo',
    multipleStatements: true,
    timezone: '08:00' // 配置时区
  };
} else if (process.env.NODE_ENV == 'prod') {
  config = {
    host: '173.82.212.76',
    port: 3306,
    user: 'admin',
    password: 'admin',
    database: 'mysite',
    multipleStatements: true,
    timezone: '08:00' // 配置时区
  };
}

exports.config = config;
