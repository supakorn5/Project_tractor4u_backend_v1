const express = require('express');
const router = express.Router();

const { GetLandAll } = require('../../controller/landController');
const { GetLandsByUserid } = require('../../controller/landController');
const { Addnewland } = require('../../controller/landController');
const { GetLandStatus } = require('../../controller/landController');
const {GetLandNotReserve} = require('../../controller/landController');



router.get('/GetLandAll',GetLandAll);
router.get('/GetLandsByUserid/:lands_user_id', GetLandsByUserid);
router.get('/GetLandNotReserve/:lands_user_id',GetLandNotReserve);

router.post('/Addnewlands',Addnewland);
router.post('/GetLandStatus', GetLandStatus);

module.exports = router;