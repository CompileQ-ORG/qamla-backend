const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'u793304885_admin',
    password: '|I2+Q&3SB>cn',
    database: 'u793304885_qamla_db'
})

module.exports = mySqlPool;