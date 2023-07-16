const { getPagination } = require("../helpers/utilities");
const db = require("../models");
const initModels = require("../models/init-models");
const model = initModels(db.sequelize);

class AuditLogRepository {
  constructor(model){
    this.auditLogModel = model.auditLog
  }

  async createAuditLog(data){
    const res = await this.auditLogModel.create(data)
    return res
  }

  async getAuditLogById(id){
    const res = await this.auditLogModel.findByPk(id)
    return res
  }

  async updateAuditLog(data, id){
    const res = await this.auditLogModel.update(data, {
      where: {
        auditLogId: id,
      },
      returning: true,
    });
    return res[1];
  }

  async bulkCreateAuditLog(data){
    const res = await this.auditLogModel.bulkCreate(data)
    return res
  }

  async getAllAuditLog(pageNumber, sizeNumber){
    const res = await this.auditLogModel.findAndCountAll({
      ...getPagination(pageNumber, sizeNumber),
      order: [["updatedAt", "DESC"]],
      distinct: true
    })

    return res
  }
}

module.exports = new AuditLogRepository(model)