const mysql = require('mysql2/promise');

const connectionDB = mysql.createPool({
    host: "localhost",
    database: "final_project",
    user: "root",
    password: "mysql1234"
});

// (async () => {
//     try {
//         // Run a simple query to check the connection
//         const [rows] = await connectionDB.query('SELECT * FROM final_project.users;');
//         console.log('Successfully connected and query executed:', rows);
//     } catch (err) {
//         console.error('Error executing query or connecting to the MySQL database:', err.message);
//     }
// })();

module.exports = connectionDB;
