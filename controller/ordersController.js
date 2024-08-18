const db = require('../database/connectDatabase');
const moment = require('moment');

const GetOwnerID = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Define the query with proper table aliases
        const query = `
            SELECT 
                o.owners_id
            FROM final_project.users AS u
            INNER JOIN final_project.owners AS o
            ON u.users_id = o.owners_users_id
            WHERE u.users_id = ?;
        `;

        // Execute the query
        const [rows] = await db.query(query, [userId]);

        // Log the result for debugging purposes
        console.log(`Query result: ${JSON.stringify(rows)}`);

        // Check if no data was returned
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No owner data found for the given user ID"
            });
        }

        // Return the result
        res.status(200).send({
            success: true,
            message: "Owner ID retrieved successfully",
            data: rows
        });

    } catch (e) {
        // Log the error and send a response
        console.error('Error executing query:', e);
        res.status(500).send({
            success: false,
            message: "Error retrieving owner ID",
            error: e.message
        });
    }
};

const GetJobByUserId = async (req, res) => {
    const userId = req.params.userId; 
    try {
        const query = `
            SELECT users_username,DATE_FORMAT(orders_start_date, '%Y-%m-%d') as date
FROM final_project.orders
Inner Join final_project.users
On users_id = orders_users_id
WHERE orders_owners_id = ?
        `;
        const [rows] = await db.query(query, [userId]);

        console.log(`Query result: ${JSON.stringify(rows)}`);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "NO DATA"
            });
        }

        res.status(200).send({
            success: true,
            message: "All Orders By User_Id",
            data: rows
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({
            success: false,
            message: "ERROR GETTING Orders",
            error: e.message
        });
    }
};
const GetQueueByDate = async (req, res) => {
    const dateParam = req.params.date;
    const date = moment(dateParam, 'YYYY-MM-DD').format('YYYY-MM-DD');

    // Validate the date format
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).send({
            success: false,
            message: "Invalid date format"
        });
    }

    // Validate orders_users_id parameter
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send({
            success: false,
            message: "Missing user ID"
        });
    }

    try {
        const query = `
            SELECT orders_id,users_username,orders_status,lands_size_rai
            FROM final_project.orders
            inner join final_project.lands ON orders_lands_id = lands_id 
            inner join final_project.users ON orders_users_id = users_id
            where orders_start_date = ?
            and orders_owners_id = ?;
            
        `;
        const [rows] = await db.query(query, [date, userId]);

        console.log(`Query result: ${JSON.stringify(rows)}`);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No data found"
            });
        }

        res.status(200).send({
            success: true,
            message: "All Queue By Date",
            data: rows
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({
            success: false,
            message: "Error getting queue",
            error: e.message
        });
    }
};

const GetDateStatus = async(req, res) => {
    const Owner_id = req.params.Owner_id;
    if (!Owner_id) {
        return res.status(400).send({
            success: false,
            message: "Missing OWNER ID"
        });
    }

    try {
        const query = `SELECT dateStatus_id, dateStatus_status, DATE_FORMAT(dateStatus_date, '%Y-%m-%d') as date
                        FROM final_project.datestatus
                        WHERE dateStatus_owners_id = ?;`;
        const [rows] = await db.query(query, [Owner_id]);
        console.log(`Query result: ${JSON.stringify(rows)}`);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No data found"
            });
        }

        res.status(200).send({
            success: true,
            message: "All Queue By Date",
            data: rows
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            success: false,
            message: "Error getting queue",
            error: e.message
        });
    }
}


const Resever = async (req, res) => {
    const {
        orders_id,
        orders_status
    } = req.body; // Corrected to req.body
  
    const query = 'update final_project.orders set orders_status = ? where orders_id = ?';
    
    try {
      const [result] = await db.query(query, [orders_status , orders_id]);
      
      res.status(200).send({
        status: 'OK',
        message: 'Update Success'
      });
    } catch (error) {
      res.status(500).send({
        status: 'Error',
        message: 'An error occurred while updating the Orders',
        error: error.message
      });
    }
  };

  const UpdateDateStatus = async (req, res) => {
    const {
        dateStatus_id,
        datestatus
    } = req.body; // Corrected to req.body
  
    const query = `UPDATE final_project.datestatus
                    set final_project.datestatus.dateStatus_status = ?
                    WHERE final_project.datestatus.dateStatus_id = ?;`;
    
    try {
      const [result] = await db.query(query, [datestatus,dateStatus_id]);
      
      res.status(200).send({
        status: 'OK',
        message: 'Update Success'
      });
    } catch (error) {
      res.status(500).send({
        status: 'Error',
        message: 'An error occurred while updating the Orders',
        error: error.message
      });
    }
  };

  const CloseJob = async (req, res) => {
    const {
        dateStatus_id,
    } = req.body; // Corrected to req.body
  
    const query = `UPDATE final_project.datestatus
                set final_project.datestatus.dateStatus_status = ?
                    WHERE final_project.datestatus.dateStatus_id = ?`;
    
    try {
      const [result] = await db.query(query, [dateStatus_id]);
      
      res.status(200).send({
        status: 'OK',
        message: 'Update Success'
      });
    } catch (error) {
      res.status(500).send({
        status: 'Error',
        message: 'An error occurred while updating the Orders',
        error: error.message
      });
    }
  };

  //
module.exports = { GetOwnerID , GetJobByUserId , GetQueueByDate , Resever , GetDateStatus , CloseJob , UpdateDateStatus };
