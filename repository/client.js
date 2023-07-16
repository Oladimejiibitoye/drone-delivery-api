const { droneStateEnum } = require("../helpers/enum");
const db = require("../models");
const initModels = require("../models/init-models");
const model = initModels(db.sequelize);

class ClientRepository {
  constructor(model){
    this.clientModel = model.client
    this.droneModel = model.drone
  }

  async createClient(data){
    const res = await this.clientModel.create(data)
    return res
  }

  async getClientById(id){
    const res = await this.clientModel.findByPk(id)
    return res
  }

  async updateClient(data, id){
    const res = await this.clientModel.update(data, {
      where: {
        clientId: id,
      },
      returning: true,
    });
    return res[1];
  }

  async createAssosciation(droneId, clientId){
    const client = await this.clientModel.findByPk(clientId)
    const drone = await this.droneModel.findByPk(droneId)

    return client.addDrone(drone)

  }

  async getRegisteredDroneByClientId(clientId, droneId){
    const clientWithDrone = await this.clientModel.findByPk(clientId,{
      include:[
        {
          model: this.droneModel,
          as: "drones",
          where: {
            droneId: droneId,
            state: droneStateEnum.LOADING
          }
        }
      ]
    })

    return clientWithDrone
  }
}

module.exports = new ClientRepository(model)