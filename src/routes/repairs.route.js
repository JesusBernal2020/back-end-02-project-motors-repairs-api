const express = require('express');

//controllers
const repairsController = require('./../controllers/repairs.controller');

//middlewres
const repairMiddleware = require('./../middlewares/repair.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const loginMiddleware = require('./../middlewares/login.middleware');

const router = express.Router();

router.use(loginMiddleware.proctect)

router
  .route('/')
  .get(loginMiddleware.restricTo('employee'),repairsController.findAllRepairs)
  .post(validationMiddleware.createRepairsValidation, repairsController.createRepair);

router.use(loginMiddleware.restricTo('employee'))

router
  .route('/:id')
  .get(repairMiddleware.validRepairRelacions, repairsController.findOneRepair)
  .patch(repairMiddleware.validRepair, repairsController.updateRepair)
  .delete(repairMiddleware.validRepair, repairsController.deleteRepair);

module.exports = router;
