const express = require('express');
const router = express.Router();

const { GetLandAll } = require('../../controller/landCOntroller');
const { GetLandsByUserid } = require('../../controller/landCOntroller');
const { Addnewland } = require('../../controller/landCOntroller')


router.get('/GetLandAll',GetLandAll);
router.get('/GetLandsByUserid/:lands_user_id', GetLandsByUserid);
router.post('/Addnewlands',Addnewland);

module.exports = router;