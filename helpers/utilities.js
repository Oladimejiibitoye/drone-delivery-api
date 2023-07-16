const getPagination = (page, size) => {
  const currentPage = page;
  const limit = size ? +size : 10;
  const offset = currentPage ? currentPage * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, size) => {
  const { count: totalItems, rows: records } = data;
  const currentPage = page ? +page : 0;
  const limit = size ? +size : 10
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    records,
    totalPages,
    currentPage,
  };
};

const generateSerialNumber = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let serialNumber = '';

  for (let i = 0; i < 100; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    serialNumber += characters.charAt(randomIndex);
  }

  return serialNumber;
}

const getRandomNumber = () => {
  return Math.floor(Math.random() * 101);
}




module.exports = {
  getPagination,
  getPagingData,
  generateSerialNumber,
  getRandomNumber
};