const mysql = require('mysql');
const databaseConfig = require('./databaseConfig');
const pool = mysql.createPool({ ...databaseConfig.config });

exports.query = function(sql, callback) {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log('mysql failed connect...');
    } else {
      console.log('mysql connect successfully!');
      connection.query(sql, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(data);
          callback(data);
        }
        connection.release();
      });
    }
  });
}
