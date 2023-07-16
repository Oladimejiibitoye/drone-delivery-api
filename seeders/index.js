const { generateSerialNumber, getRandomNumber } = require("../helpers/utilities");
const db = require("../models");
const initModels = require("../models/init-models");
const model = initModels(db.sequelize);


const drones = [
  {
    serialNumber: generateSerialNumber(),
    model: 'Lightweight',
    weightLimit: 150,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Middleweight',
    weightLimit: 250,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Cruiserweight',
    weightLimit: 350,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Heavyweight',
    weightLimit: 450,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Lightweight',
    weightLimit: 100,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Middleweight',
    weightLimit: 200,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Cruiserweight',
    weightLimit: 300,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Heavyweight',
    weightLimit: 400,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Lightweight',
    weightLimit: 50,
    batteryCapacity: getRandomNumber()
  },
  {
    serialNumber: generateSerialNumber(),
    model: 'Heavyweight',
    weightLimit: 500,
    batteryCapacity: getRandomNumber()
  }

]


async function seedDrones() {
  const transaction = await db.sequelize.transaction();
  try {
    const count = await model.drone.count();
    if (count === 0) {
      await model.drone.bulkCreate(drones, { transaction });
      await transaction.commit();
      console.log('Drones seeding completed successfully.');
    } else {
      console.log('Drones data already exists. Skipping seeding.');
    }
  } catch (error) {
    await transaction.rollback();
    console.error('Error occurred during Drone seeding:', error);
  }
}



const seed = async() => {
  try {
    await seedDrones();
  } catch (error) {
    console.error('Error occurred during seeding:', error);
  }
}

module.exports = { seed }
