const droneRepository = require("../repository/drone")
const auditLogRepository = require("../repository/auditLog")


class AuditLogService{
  constructor(auditLogRepository, droneRepository){
    this.auditLogRepository = auditLogRepository;
    this.droneRepository = droneRepository
  }

  async createAuditLogs(){
    const allDrones = await this.droneRepository.getAllDrones();
    const auditLogData = allDrones.map(({droneId, batteryCapacity}) => ({droneId, batteryCapacity}))
    const saveAuditLog = await this.auditLogRepository.bulkCreateAuditLog(auditLogData)
    return saveAuditLog
  }

  async getAllAuditLogs(pageNumber, sizeNumber){
    const auditLogs = await this.auditLogRepository.getAllAuditLog(pageNumber, sizeNumber)
    return auditLogs
  }
}

module.exports = new AuditLogService(auditLogRepository, droneRepository)