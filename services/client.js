
const { medicationDeliveryStatusEnum, droneStateEnum, batteryLevelEnum } = require("../helpers/enum");
const { NotFoundError, BadRequestError } = require("../helpers/errors");
const clientRepository = require("../repository/client");
const droneRepository = require("../repository/drone")
const medicationRepository = require("../repository/medication")


class ClientService{
  constructor(clientRepository, droneRepository, medicationRepository){ 
    this.clientRepository = clientRepository
    this.droneRepository = droneRepository
    this.medicationRepository = medicationRepository
   }

  async getAvailableDrones(){
    const availabeDrones = await this.droneRepository.getAvailableDrones()
    return availabeDrones
  }

  async registerDrone(requestBody, droneId){
    const{name} = requestBody;

    const drone = await this.droneRepository.getDroneById(droneId)
    if(!drone){
      throw new NotFoundError('drone not found')
    }

    if(drone.state !== droneStateEnum.IDLE){
      throw new BadRequestError('drone is busy')
    }

    if(drone.batteryCapacity < batteryLevelEnum.BATTERYlevel){
      throw new BadRequestError('drone battery is low')
    }

    const client = await this.clientRepository.createClient({name});
    await this.droneRepository.updateDrone({state: droneStateEnum.LOADING}, droneId)
    const registeredDrone = await this.droneRepository.getDroneById(droneId)
   
    await this.clientRepository.createAssosciation(registeredDrone.droneId, client.clientId)

    return {client, registeredDrone}

  }

  async loadingDrone(requestBody, droneId, clientId){
    const {medications} = requestBody;

    const client = await this.clientRepository.getClientById(clientId)
    if(!client){
      throw new NotFoundError('client not found')
    }
    const drone = await this.droneRepository.getDroneById(droneId)
    if(!drone){
      throw new NotFoundError('drone not found')
    }

    const registeredDronebyClient = await this.clientRepository.getRegisteredDroneByClientId(clientId, droneId)
    if(!registeredDronebyClient){
      throw new BadRequestError('please register a drone')
    }

    if(drone.batteryCapacity < batteryLevelEnum.BATTERYlevel){
      throw new BadRequestError('drone battery is low')
    }
    const medicationWeight = medications.reduce((sum, medicationDetails) => sum + medicationDetails.weight, 0)
    if(medicationWeight > drone.weightLimit){
      throw new BadRequestError(`please reduce your medication load by ${drone.weightLimit - medicationWeight}kg`)
    }
    const medicationData = medications.map(medicationDetails => {
      medicationDetails.droneId = droneId;
      medicationDetails.clientId = clientId;
      medicationDetails.deliveryStatus = medicationDeliveryStatusEnum.LOADED
      return medicationDetails
    })
    const loadedMedications = await this.medicationRepository.bulkCreateMedication(medicationData)
    await this.droneRepository.updateDrone({state: droneStateEnum.LOADED}, droneId)
    return loadedMedications
  }

  async getLoadedMedication(droneId, pageNumber, sizeNumber){
    const drone = await this.droneRepository.getDroneById(droneId)
    if(!drone){
      throw new NotFoundError('drone not found')
    }
    if(drone.state !== droneStateEnum.LOADED){
      throw new BadRequestError('drone is not in loaded state')
    }
    const loadedMedication = await this.medicationRepository.getMedicationLoadedOnDroneByDroneId(droneId, pageNumber, sizeNumber)
    return loadedMedication
  }

  async checkDroneBatteryLevel(droneId){
    const drone = await this.droneRepository.getDroneById(droneId)
    if(!drone){
      throw new NotFoundError('drone not found')
    }
    return drone.batteryCapacity
  }
}

module.exports = new ClientService(clientRepository, droneRepository, medicationRepository)