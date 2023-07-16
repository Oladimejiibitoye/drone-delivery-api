const { batteryLevelEnum, droneStateEnum } = require("../helpers/enum");
const db = require("../models");
const initModels = require("../models/init-models");
const model = initModels(db.sequelize);
const { Op } = require("sequelize");

class DroneRepository {
  constructor(model){
    this.droneModel = model.drone
  }

  async createDrone(data){
    const res = await this.droneModel.create(data)
    return res
  }

  async getDroneById(id){
    const res = await this.droneModel.findByPk(id)
    return res
  }

  async getAllDrones(){
    const res = await this.droneModel.findAll()
    return res
  }

  async getAvailableDrones(){
    const res = await this.droneModel.findAll({
      where: {
        state: droneStateEnum.IDLE,
        batteryCapacity: {[Op.gte]: batteryLevelEnum.BATTERYlevel}
      }
    })

    return res
  }

  async updateDrone(data, id){
    const res = await this.droneModel.update(data, {
      where: {
        droneId: id,
      },
      returning: true,
    });
    return res[1];
  }
}

module.exports = new DroneRepository(model)