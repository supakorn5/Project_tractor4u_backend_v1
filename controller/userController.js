const db = require('../database/connectDatabase');

const GetuserAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM final_project.users');

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

module.exports = { GetuserAll };
