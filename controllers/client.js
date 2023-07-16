const HttpStatus = require('../helpers/enum/httpStatus.enum')
const { successResMsg } = require('../helpers/response');
const { getPagingData } = require('../helpers/utilities');
const clientService = require('../services/client');
const auditLogService = require("../services/auditLog")



class ClientController{

  async getAvailableDrones(req, res, next){
    try {
      const availabeDrones = await clientService.getAvailableDrones()
      return successResMsg(res, HttpStatus.OK, {data: availabeDrones})
    } catch (error) {
      next(error)
    }
  }

  async registerDrone(req, res, next){
    try {
      const registeredDrone = await clientService.registerDrone(req.body, req.params.droneId);
      return successResMsg(res, HttpStatus.CREATED, {data: registeredDrone})
    } catch (error) {
      next(error)
    }
  }
  async loadingDrone(req, res, next){
    try {
      const loadedDrone = await clientService.loadingDrone(req.body, req.params.droneId, req.params.clientId)
      return successResMsg(res, HttpStatus.CREATED, {data: loadedDrone})
    } catch (error) {
      next(error)
    }
  }

  async getLoadedMedication(req, res, next){
    try {
      const {page, size } = req.query;

      let pageNumber = parseInt(page);
      let sizeNumber = parseInt(size);

      const loadedMedications = await clientService.getLoadedMedication(req.params.droneId, pageNumber, sizeNumber);
      return successResMsg(res, HttpStatus.OK, {data: getPagingData(loadedMedications)})
    } catch (error) {
      next(error)
    }
  }

  async checkDroneBatteryLevel(req, res, next){
    try {
      const batteryCapacity = await clientService.checkDroneBatteryLevel(req.params.droneId)
      return successResMsg(res, HttpStatus.OK, {data: batteryCapacity})
    } catch (error) {   
      next(error)
    }
  }

  async getAllAuditLogs(req, res, next){
    try {
      const {page, size } = req.query;

      let pageNumber = parseInt(page);
      let sizeNumber = parseInt(size);

      const allAuditLogs = await auditLogService.getAllAuditLogs(pageNumber, sizeNumber)
      return successResMsg(res, HttpStatus.OK, {data: getPagingData(allAuditLogs)})
    } catch (error) {
      next(error)
    }
  }

}



module.exports = new ClientController()