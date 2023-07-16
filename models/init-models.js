let DataTypes = require('sequelize').DataTypes;

let _client = require('./client');
let _drone = require('./drone');
let _medication = require('./medication');
let _auditLog = require('./audit-log')

function initModels(sequelize) {
  const client = _client(sequelize, DataTypes);
  const drone = _drone(sequelize, DataTypes);
  const medication = _medication(sequelize, DataTypes);
  const auditLog = _auditLog(sequelize, DataTypes)

  client.belongsToMany(drone, {
    through: "client_drone",
    foreignKey: 'clientId'
  });
  drone.belongsToMany(client, {
    through: "client_drone",
    foreignKey: 'droneId'
  });
  client.hasMany(medication, {
    foreignKey: 'clientId',
  });
  medication.belongsTo(client, {
    foreignKey: 'clientId',
  });
  drone.hasMany(medication, {
    foreignKey: 'droneId'
  });
  medication.belongsTo(drone, {
    foreignKey: 'droneId',
  });
  drone.hasMany(auditLog, {
    foreignKey: 'droneId'
  });
  auditLog.belongsTo(drone, {
    foreignKey: 'droneId'
  })

  return {
    client,
    drone,
    medication,
    auditLog
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
