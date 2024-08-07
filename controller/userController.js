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


//จองคิววว
const Reserve = async (req, res) => {
    const {
        orders_reserve_date,
        orders_start_date,
        orders_lands_id,
        orders_users_id,
        orders_owners_id
    } = req.body;


    //insert into orders
    const query = `
        INSERT INTO final_project.orders
        (orders_status, orders_reserve_date, orders_start_date, orders_lands_id, orders_users_id, orders_owners_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [rows] = await db.query(query, [
        1,
        orders_reserve_date,
        orders_start_date,
        orders_lands_id,
        orders_users_id,
        orders_owners_id
    ]);

    //check dateStatus
    //select date for check
    const query_select =  `select * 
                    from final_project.datestatus 
                    where dateStatus_owners_id = ?
                    and    dateStatus_date = ?`
    const [rows_select] = await db.query(query_select, [orders_owners_id, orders_start_date]);

    //insert or not
    if (rows_select.length == 0) {
        const query_insert =  `
            insert into final_project.datestatus
            (dateStatus_status, dateStatus_owners_id, dateStatus_date) values (?, ?, ?)`
        const [rows_insert] = await db.query(query_insert, [1 ,orders_owners_id, orders_start_date]);

        return res.json({
            status: 'ok ',
            message : 'reserve success and insert new dateStatus',
            data: rows_insert
        });
    }else{
        res.json({status: 'ok',
        message: 'reserve success',
        data: rows_select
        });
    }

    
};



const GetDateStatus = async (req, res) => {

    const {
        owners_id
    } = req.body;

    try {
        const query = `
            SELECT dateStatus_id, dateStatus_status, dateStatus_owners_id, DATE_FORMAT(dateStatus_date, '%Y-%m-%d') AS dateStatus_date
            FROM final_project.datestatus
            where dateStatus_owners_id = ?
        `;
        const [rows] = await db.query(query, [owners_id]);

        // if (!Array.isArray(rows) || rows.length === 0) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "NO DATA"
        //     });
        // }

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


const GetOrderByDate = async (req, res) => {
    const {
        owners_id,
        start_date
    } = req.body;

    try {
        const query = `
            SELECT  orders_id, orders_total_price, orders_status, orders_review,
                    DATE_FORMAT(orders_reserve_date, '%Y-%m-%d') AS orders_reserve_date,
                    DATE_FORMAT(orders_start_date, '%Y-%m-%d') AS orders_start_date,
                    DATE_FORMAT(orders_finish_date, '%Y-%m-%d') AS orders_finish_date,
                    orders_lands_id, orders_users_id, orders_owners_id, orders_size_rai, orders_size_ngan
            FROM    final_project.orders
            where   orders_start_date = ?
            and     orders_owners_id = ?
        `;
        const [rows] = await db.query(query, [start_date, owners_id]);

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


module.exports = { GetuserAll, register_users, LoginUsers, Reserve, GetDateStatus, GetOrderByDate};