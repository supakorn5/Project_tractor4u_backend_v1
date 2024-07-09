const express = require('express');
const router = express.Router();

const { GetLandAll } = require('../../controller/landController');
const { GetLandsByUserid } = require('../../controller/landController');
const { Addnewland } = require('../../controller/landController')


router.get('/GetLandAll',GetLandAll);
router.get('/GetLandsByUserid/:lands_user_id', GetLandsByUserid);
router.post('/Addnewlands',Addnewland);

module.exports = router;