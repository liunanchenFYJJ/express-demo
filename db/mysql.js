const mysql = require('mysql');
const config = require('./databaseConfig');
const pool = mysql.createPool({ ...config.config });

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
