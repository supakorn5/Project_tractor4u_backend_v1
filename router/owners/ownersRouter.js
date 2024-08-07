const express = require('express');
const router = express.Router();

const { GetOwnersOpen } = require('../../controller/ownerController');
const { GetOwnersOpenFullInfo } = require('../../controller/ownerController');
const { GetOwnersInfo } = require('../../controller/ownerController');
const { GetOwnersTractor } = require('../../controller/ownerController');


router.post('/GetOwnersOpen', GetOwnersOpen);
router.post('/GetOwnersOpenFullInfo', GetOwnersOpenFullInfo);
router.post('/GetOwnersInfo', GetOwnersInfo);
router.post('/GetOwnersTractor', GetOwnersTractor);


module.exports = router;