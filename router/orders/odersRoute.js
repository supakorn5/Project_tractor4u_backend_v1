const express = require('express');
const router = express.Router();

const {GetJobByUserId} = require('../../controller/ordersController');
const {GetQueueByDate} = require('../../controller/ordersController');
const {GetOwnerID} = require('../../controller/ordersController');
const {Resever} = require('../../controller/ordersController');
const {GetDateStatus} = require('../../controller/ordersController');
const {CloseJob} = require('../../controller/ordersController');

router.get('/GetJobByUserId/:userId', GetJobByUserId);
router.get('/GetQueueByDate/:date/:userId', GetQueueByDate);
router.get('/GetOwnerID/:userId', GetOwnerID);
router.get('/GetDateStatus/:Owner_id',GetDateStatus);


router.post('/Resever',Resever);
router.post('/CloseJob',CloseJob);

module.exports = router;