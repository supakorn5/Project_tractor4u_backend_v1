const express = require('express');
const router = express.Router();
const { GetuserAll } = require('../../controller/userController');

router.get('/Getusers', GetuserAll);

module.exports = router;
