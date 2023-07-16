
const droneStateEnum = {
  IDLE: "IDLE", 
  LOADING: "LOADING", 
  LOADED: "LOADED", 
  DELIVERING: "DELIVERING",
  DELIVERED: "DELIVERED",
  RETURNING: "RETURNING"
};

const medicationDeliveryStatusEnum = {
  LOADING: "LOADING", 
  LOADED: "LOADED", 
  DELIVERING: "DELIVERING",
  DELIVERED: "DELIVERED",
  RETURNING: "RETURNING"
}

const batteryLevelEnum = {
  BATTERYlevel : 25
}

module.exports = {
  droneStateEnum,
  medicationDeliveryStatusEnum,
  batteryLevelEnum
};