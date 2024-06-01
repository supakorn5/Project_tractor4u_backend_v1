const express = require('express');
const router = express.Router();

const { GetuserAll } = require('../../controller/userController');
const { register_users } = require('../../controller/userController');
const { LoginUsers } = require('../../controller/userController');


router.get('/Getusers', GetuserAll);
router.post('/register_users', register_users);
router.post('/LoginUsers', LoginUsers );

module.exports = router;
