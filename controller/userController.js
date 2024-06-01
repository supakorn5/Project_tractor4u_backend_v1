const db = require('../database/connectDatabase');
const bcrypt = require('bcrypt');  //for hash password

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

//Register Users
const register_users = async (req, res) => {
    const {
        users_username,
        users_password,
        users_phone,
        users_image,
        users_address,
    } = req.body;

    // Validate the required fields
    if (!users_username || !users_password || !users_image || !users_address || !users_phone) {
        return res.json({status: 'error' , message: 'Data not full' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(users_password, 10);

    const query = `
        INSERT INTO final_project.users
        (users_username, users_password, users_phone, users_type, users_image, users_address)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        users_username,
        hashedPassword,
        users_phone,
        0,
        users_image,
        users_address,
    ]);


    res.json({status: 'ok',
        message: 'Register success',
        data: {
            users_id: result.insertId,
            users_username,
            users_phone, 
            users_image,
            users_address
    }});

    // res.status(201).send({
    //     success: true,
    //     message: "User registered successfully",
    //     data: {
    //         users_id: result.insertId,
    //         users_username,
    //         users_phone, 
    //         users_image,
    //         users_address
    //     }
    // });
};


//LoginUsers
const LoginUsers = async (req, res) => {
    const {
        users_username,
        users_password
    } = req.body;

    //for check is it undifind
    if(!users_username || !users_password){
        return res.json({
            status: 'ok',
            message: "Missing required fields"
        });
    }

    //select by username
    const query = 'select * from final_project.users where users_username = ?' 
    const [rows] = await db.query(query, [users_username]);

    if (rows.length == 0) {
        return res.json({
            status: 'ok ',
            message : 'User not found',
        });
    }
    

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(users_password, user.users_password);

    if (!isPasswordValid) {
        return res.json({
            status: 'ok',
            message: 'password is incorrect'
        });
    }

    res.json({
        status: 'ok',
        message: "Login successful",
        data: {
            users_id: user.users_id,
            users_username: user.users_username,
            users_phone: user.users_phone,
            users_image: user.users_image,
            users_address: user.users_address
        }
    });
};

module.exports = { GetuserAll, register_users, LoginUsers };