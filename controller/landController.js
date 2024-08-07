const db = require('../database/connectDatabase');

const GetLandAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM final_project.lands');

        // Ensure rows is an array and contains data
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "NO DATA"
            });
        }

        res.status(200).send({
            success: true,
            message: "ALL Lands",
            data: rows
        });
    } catch (e) {
        console.error(e); // Use console.error for error logging
        res.status(500).send({
            success: false,
            message: "ERROR GET Lands",
            error: e.message // Only send the message to avoid potential circular reference issues
        });
    }
};

const GetLandsByUserid = async (req, res) => {
    const lands_user_id = req.params.lands_user_id;

    try {
        const query = 'SELECT * FROM final_project.lands WHERE lands_users_id = ?';
        const [rows] = await db.query(query, [lands_user_id]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "NO DATA"
            });
        }

        res.status(200).send({
            success: true,
            message: "ALL Lands By User_Id",
            data: rows
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({
            success: false,
            message: "ERROR GET Lands",
            error: e.message
        });
    }
};

const Addnewland = async (req,res) =>{
    const {
        lands_info,
        lands_rai,
        lands_ngan,
        lands_lat,
        lands_lon,
        lands_user_id,
    } = req.body;

    const query = `INSERT INTO final_project.lands (lands_info,lands_lat,lands_lon,lands_size_rai,lands_size_ngan,lands_users_id)
     VALUES (?, ?, ?, ?, ?, ?)
     `;
     const [result] = await db.query(query,[
        lands_info,
        lands_lat,
        lands_lon,
        lands_rai,
        lands_ngan,
        lands_user_id
     ]);

     res.status(200).send({
        status:'OK',
        message:"ADD LANDS COMPLEATE",
        data : {
            lands_id : result.insertId,
            lands_lat,
            lands_lon,
            lands_rai,
            lands_ngan
        }
     })
}


const GetLandStatus = async (req, res) =>{
    const {
        lands_id
    } = req.body;

    try {
        const query = `
            SELECT orders_id, orders_lands_id, orders_status
            FROM  final_project.orders
            WHERE orders_lands_id = ?
            AND orders_status in (1,2,3,4)
        `;
        const [rows] = await db.query(query,[
            lands_id
        ]);

        if(!Array.isArray(rows) || rows.length === 0){
            return res.status(404).send({
                success: false,
                message: "!!!NO DATA => GetLandInOrder"
            });
        }

        res.status(200).send({
            success: true,
            message: "DATA => GetLandInOrder",
            data: rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message:"ERROR GetLandInOrder",
            error:error.message
        })
    }
}

module.exports = {GetLandAll,Addnewland,GetLandsByUserid,GetLandStatus};
