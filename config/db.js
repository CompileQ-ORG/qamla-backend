const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
    host: 'srv1038.hstgr.io',
    user: 'u793304885_admin',
    password: '|I2+Q&3SB>cn',
    database: 'u793304885_qamla_db'
})

module.exports = mySqlPool;