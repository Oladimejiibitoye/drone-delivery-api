const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Drone = sequelize.define(
    'drones', {
      droneId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      serialNumber: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      weightLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batteryCapacity: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'IDLE'
      },
      
    });
  return Drone;
};