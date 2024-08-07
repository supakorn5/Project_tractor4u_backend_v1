const express = require('express');
const router = express.Router();

const { GetuserAll } = require('../../controller/userController');
const { register_users } = require('../../controller/userController');
const { LoginUsers } = require('../../controller/userController');
const { Reserve } = require('../../controller/userController');
const { GetDateStatus } = require('../../controller/userController');
const { GetOrderByDate } = require('../../controller/userController');
const { GetUserById } = require('../../controller/userController');
const { updateProfile } = require('../../controller/userController');


router.get('/Getusers', GetuserAll);
router.get('/GetUserById/:user_id',GetUserById);
router.post('/register_users', register_users);
router.post('/LoginUsers', LoginUsers);
router.post('/Reserve', Reserve);
router.post('/GetDateStatus', GetDateStatus);
router.post('/GetOrderByDate', GetOrderByDate);

router.put('/updataProfile/:user_id',updateProfile);

module.exports = router;
