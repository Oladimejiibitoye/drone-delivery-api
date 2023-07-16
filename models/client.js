const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'clients', {
      clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    });
  return Client;
};