const express = require('express'); // Correct the spelling
const app = express(); // Correct the spelling
const con = require("./database/connectDatabase");
const usersRoute = require('./router/users/usersRouter');
const ownersRoute = require('./router/owners/ownersRouter')
const landsRoute = require('./router/lands/landsRouter')

// Middleware to parse JSON request bodies
app.use(express.json());


app.use('/api/users', usersRoute);
app.use('/api/owners', ownersRoute);
app.use('/api/lands', landsRoute);

app.get('/', function(req, res) {
    res.send("HELLO WORLD"); // Correct spelling from "HELLO WORD" to "HELLO WORLD"
});

app.listen(5000, () => {
    console.log("Listening on Port 5000");

    // Test the database connection on server start
    con.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log("Database Connect Complete");
        connection.release(); // Release the connection back to the pool
    });
});
