let config = null;

// 服务器mysql配置
const serverConfig = {
  host: '173.82.212.76',
  port: 3306,
  user: 'admin',
  password: 'admin',
  database: 'mysite',
  multipleStatements: true,
  timezone: '08:00' // 配置时区
};

// 本地mysql配置
const localConfig = {
  host: '192.168.1.38',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'mysite',
  multipleStatements: true,
  timezone: '08:00' // 配置时区
};

switch (process.env.NODE_ENV) {
  case 'prod':
    config = serverConfig;
    break;

  default:
    config = localConfig;
    break;
}

module.exports = {
  config
}
