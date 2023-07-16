const db = require("../models");
const initModels = require("../models/init-models");
const model = initModels(db.sequelize);
const {getPagination} = require("../helpers/utilities");
const { medicationDeliveryStatusEnum } = require("../helpers/enum");

class MedicationRepository {
  constructor(model){
    this.medicationModel = model.medication
  }

  async createMedication(data){
    const res = await this.medicationModel.create(data)
    return res
  }

  async bulkCreateMedication(data){
    const res = await this.medicationModel.bulkCreate(data)
    return res
  }

  async getMedicationById(id){
    const res = await this.medicationModel.findByPk(id)
    return res
  }

  async getMedicationLoadedOnDroneByDroneId(droneId, pageNumber, sizeNumber){
    const res = await this.medicationModel.findAndCountAll({
      where: {
        droneId: droneId,
        deliveryStatus: medicationDeliveryStatusEnum.LOADED
      },
      ...getPagination(pageNumber, sizeNumber),
      order: [["updatedAt", "DESC"]],
      distinct: true
    })

    return res
  }

  async updateMedication(data, id){
    const res = await this.medicationModel.update(data, {
      where: {
        medicationId: id,
      },
      returning: true,
    });
    return res[1];
  }
}

module.exports = new MedicationRepository(model)