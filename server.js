const express = require('express'); 
const app = express(); 
const con = require("./database/connectDatabase");
const usersRoute = require('./router/users/usersRouter');
const ownersRoute = require('./router/owners/ownersRouter')
const landsRoute = require('./router/lands/landsRouter')
const ordersRouter = require('./router/orders/odersRoute');


app.use(express.json({ limit: '10mb' }));

app.use('/api/users', usersRoute);
app.use('/api/owners', ownersRoute);
app.use('/api/lands', landsRoute);
app.use('/api/orders',ordersRouter)

app.get('/', function(req, res) {
    res.send("HELLO WORLD");
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
