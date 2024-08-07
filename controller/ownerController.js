const db = require('../database/connectDatabase');

const GetOwnersOpen = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT owners_id, users_image, users_lat, users_lon 
            FROM final_project.owners, final_project.users 
            WHERE owners_users_id = users_id 
            AND owners_status = 1
        `);


        // Ensure rows is an array and contains data
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "NO DATA"
            });
        }

        res.status(200).send({
            success: true,
            message: "ALL USERS",
            data: rows
        });
    } catch (e) {
        console.error(e); // Use console.error for error logging
        res.status(500).send({
            success: false,
            message: "ERROR GET USER",
            error: e.message // Only send the message to avoid potential circular reference issues
        });
    }
};

const GetOwnersInfo = async (req, res) => {

    const {
        owners_id
    } = req.body;

    try {
        const query = `
            SELECT owners_id, owners_price_rai, owners_price_ngan, owners_info, owners_status, users_username, users_phone, users_image, users_address, users_lat, users_lon
            FROM  final_project.owners, final_project.users
            WHERE owners_users_id = users_id
            and    owners_id = ? `;
        const [rows] = await db.query(query, [owners_id]);



        // Ensure rows is an array and contains data
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "NO DATA"
            });
        }

        res.status(200).send({
            success: true,
            message: "ALL USERS",
            data: rows
        });
    } catch (e) {
        console.error(e); // Use console.error for error logging
        res.status(500).send({
            success: false,
            message: "ERROR GET USER",
            error: e.message // Only send the message to avoid potential circular reference issues
        });
    }
};



const GetOwnersOpenFullInfo = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT owners_id, owners_price_rai, owners_price_ngan, owners_info, owners_status, users_username, users_phone, users_image, users_address, users_lat, users_lon
            FROM  final_project.owners, final_project.users
            WHERE owners_users_id = users_id 
            AND owners_status = 1
        `);


        // Ensure rows is an array and contains data
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "NO DATA"
            });
        }

        res.status(200).send({
            success: true,
            message: "ALL USERS",
            data: rows
        });
    } catch (e) {
        console.error(e); // Use console.error for error logging
        res.status(500).send({
            success: false,
            message: "ERROR GET USER",
            error: e.message // Only send the message to avoid potential circular reference issues
        });
    }
};


const GetOwnersTractor = async (req, res) => {

    const {
        owners_id
    } = req.body;

    try {
        const query = `
            SELECT * From tractors
            WHERE Tractors_owners_id = ?`;
        const [rows] = await db.query(query, [owners_id]);



        // Ensure rows is an array and contains data
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "NO DATA"
            });
        }

        res.status(200).send({
            success: true,
            message: "ALL USERS",
            data: rows
        });
    } catch (e) {
        console.error(e); // Use console.error for error logging
        res.status(500).send({
            success: false,
            message: "ERROR GET USER",
            error: e.message // Only send the message to avoid potential circular reference issues
        });
    }

    
};






module.exports = {GetOwnersOpen, GetOwnersInfo, GetOwnersTractor, GetOwnersOpenFullInfo};