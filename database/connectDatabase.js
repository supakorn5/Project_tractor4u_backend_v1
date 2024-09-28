const mysql = require('mysql2/promise');

const connectionDB = mysql.createPool({
    host: "localhost",
    //port: 3306,  // Add this line to explicitly define the port
    database: "final_project",
    user: "root",
    password: "mysql1234"
});

module.exports = connectionDB;
