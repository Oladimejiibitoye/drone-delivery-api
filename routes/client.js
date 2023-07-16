const express = require('express')
const clientController = require('../controllers/client');
const { uuidValidationRules, validate, medicationValidationRules } = require('../validators/validator');

const router = express.Router();


router.get('/available-drones', clientController.getAvailableDrones)

router.post('/register/:droneId', uuidValidationRules('droneId'), validate,clientController.registerDrone);

router.post('/loading/:droneId/:clientId', uuidValidationRules('droneId'), uuidValidationRules('clientId'), medicationValidationRules, validate, clientController.loadingDrone)

router.get('/loaded/:droneId', uuidValidationRules('droneId'), validate, clientController.getLoadedMedication);

router.get('/battery-level/:droneId', uuidValidationRules('droneId'), validate, clientController.checkDroneBatteryLevel)

router.get('/audit-logs', clientController.getAllAuditLogs)

module.exports = router