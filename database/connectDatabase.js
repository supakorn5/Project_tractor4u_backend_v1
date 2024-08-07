const mysql = require('mysql2/promise');

const connectionDB = mysql.createPool({
    host: "localhost",
    database: "final_project",
    user: "root",
    password: "mysql1234"
});

module.exports = connectionDB;
