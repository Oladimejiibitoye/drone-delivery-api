const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Medication = sequelize.define(
    'medications', {
      medicationId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveryStatus: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
    });
  return Medication;
};