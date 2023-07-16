const cron = require("node-cron");
const auditLogService = require("../services/auditLog")


class CronModuleService {
  constructor(auditLogService) {
    this.auditLogService = auditLogService
    this.schedule = "*/5 * * * *"; // Runs every 5 minutes
  }

  start() {
    this.performDroneBatteryLevelAudit();
  }

  performDroneBatteryLevelAudit() {
    cron.schedule(this.schedule, async () => {
      console.log("Drone battery level audit started...");
      await this.auditLogService.createAuditLogs();
    });
  }
}

module.exports = new CronModuleService(auditLogService);
