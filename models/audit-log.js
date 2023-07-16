const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    'auditLog', {
      auditLogId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      batteryCapacity: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
    });
  return AuditLog;
};