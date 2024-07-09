const { status } = require('express/lib/response');
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

const GetUserById = async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const query = 'SELECT * FROM final_project.users where users_id = ?';
        const [rows] = await db.query(query, [user_id]);

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
//Register Users
const register_users = async (req, res) => {
    const {
        users_username,
        users_password,
        users_phone,
        users_type,
        users_image,
    } = req.body;

    // Validate the required fields
    if (!users_username || !users_password || !users_image || !users_phone || !users_type) {
        return res.json({status: 'error' , message: 'Data not full' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(users_password, 10);

    const query = `
        INSERT INTO final_project.users
        (users_username, users_password, users_phone, users_type, users_image)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        users_username,
        hashedPassword,
        users_phone,
        users_type,
        users_image,
    ]);


    res.status(200).send({
        status: 'ok',
        message: 'Register success',
        data: {
            users_id: result.insertId,
            users_username,
            users_phone, 
            users_image,
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
        return res.status(404).send({
            status: 'FAIL',
            message : 'User not found',
        });
    }

    //select by username
    const query = 'select * from final_project.users where users_username = ?' 
    const [rows] = await db.query(query, [users_username]);

    if (rows.length == 0) {
        return res.status(404).send({
            status: 'FAIL',
            message : 'User not found',
        });
    }
    

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(users_password, user.users_password);

    if (!isPasswordValid) {
        return res.status(401).send({
            status: 'FAIL',
            message: 'password is incorrect'
        });
    }

    res.status(200).send({
        status: 'OK',
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

const updateProfile = async (req, res) => {
    const user_id = req.params.user_id;
    const {
      users_password,
      users_phone,
      users_image
    } = req.body; // Corrected to req.body
  
    const query = 'UPDATE final_project.users SET users_password = ?, users_phone = ? , users_image = ? WHERE users_id = ?';
    
    try {
      const hashedPassword = await bcrypt.hash(users_password, 10);
      const [result] = await db.query(query, [hashedPassword, users_phone , users_image, user_id]);
      
      res.status(200).send({
        status: 'OK',
        message: 'Update Success'
      });
    } catch (error) {
      res.status(500).send({
        status: 'Error',
        message: 'An error occurred while updating the profile',
        error: error.message
      });
    }
  };

module.exports = { GetuserAll, register_users, LoginUsers,GetUserById , updateProfile};