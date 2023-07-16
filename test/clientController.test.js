const HttpStatus = require('../helpers/enum/httpStatus.enum');
const { successResMsg } = require('../helpers/response');
const { getPagingData } = require('../helpers/utilities');
const ClientController = require('../controllers/client');
const clientService = require('../services/client');

// Mock the dependencies used in the ClientController
jest.mock('../helpers/response');
jest.mock('../helpers/utilities');
jest.mock('../services/client');


describe('ClientController', () => {
  let res, next;
  
  beforeEach(() => {
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAvailableDrones', () => {
    test('should call successResMsg with available drones data', async () => {
      // Mock the result from the clientService.getAvailableDrones()
      const availableDrones = [{
        "droneId": "198f5b6d-e31a-44f8-94d6-da92285f41d7",
        "serialNumber": "F8oL4aJjZHRX5dK8ByKAqiOFYsH6QdXbo6tag2om0fNEFkNObog987B2kiiAeds4P9DXmwgoRTmAiYY5SCv1aBQon9IPnfDqNX2L",
        "model": "Lightweight",
        "weightLimit": 150,
        "batteryCapacity": 79,
        "state": "IDLE",
        "createdAt": "2023-07-16T08:33:13.747Z",
        "updatedAt": "2023-07-16T08:33:13.747Z"
    },
    {
        "droneId": "835aa622-bc56-4612-9ce4-dfd962bda4b9",
        "serialNumber": "BodmDcqRGRSAA12mY439R1KxxowF8OmPl3iNvqVBE91smmLaKa08BV2y33ZhzdXSVjqsvkfnwSy53CDHR549JD8RkHS5uwkJUQoH",
        "model": "Lightweight",
        "weightLimit": 100,
        "batteryCapacity": 78,
        "state": "IDLE",
        "createdAt": "2023-07-16T08:33:13.747Z",
        "updatedAt": "2023-07-16T08:33:13.747Z"
    }];
      clientService.getAvailableDrones.mockResolvedValue(availableDrones);

      // Mock request object, it's not required for this test
      const req = {};

      // Call the method
      await ClientController.getAvailableDrones(req, res, next);

      // Check if successResMsg was called with the correct arguments
      expect(successResMsg).toHaveBeenCalledWith(res, HttpStatus.OK, { data: availableDrones });
    });

    test('should call next with error if clientService.getAvailableDrones throws an error', async () => {
      // Mock the error from the clientService.getAvailableDrones()
      const error = new Error('Some error');
      clientService.getAvailableDrones.mockRejectedValue(error);

      // Mock request object, it's not required for this test
      const req = {};

      // Call the method
      await ClientController.getAvailableDrones(req, res, next);

      // Check if next was called with the correct error
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('registerDrone', () => {
    test('should call successResMsg with registered drone data', async () => {
      const registeredDrone = { 
        "client": {
            "clientId": "615b7870-e9aa-499c-b783-17d8209f3a3c",
            "name": "Oladimeji",
            "updatedAt": "2023-07-16T08:45:34.157Z",
            "createdAt": "2023-07-16T08:45:34.157Z"
        },
        "registeredDrone": {
            "droneId": "c712f494-a955-4315-86d3-381bc6988479",
            "serialNumber": "9Gh2wtO5GgXtMXxFbiY6B0WwXqVXF5ilxbhjLfHOGgaIscWEF4JEXLVb6vjcAKpp5Ji5GPYlycoI4sDeFlVLgjLVVSYwXu1iLD8c",
            "model": "Middleweight",
            "weightLimit": 250,
            "batteryCapacity": 65,
            "state": "LOADING",
            "createdAt": "2023-07-16T08:33:13.747Z",
            "updatedAt": "2023-07-16T08:45:34.335Z"
      }};
      clientService.registerDrone.mockResolvedValue(registeredDrone);
      const req = {
        body: { "name": "Oladimeji" },
        params: {
          droneId: 'c712f494-a955-4315-86d3-381bc6988479',
        },
      };

      await ClientController.registerDrone(req, res, next);

      expect(successResMsg).toHaveBeenCalledWith(res, HttpStatus.CREATED, { data: registeredDrone });
    });

    test('should call next with error if clientService.registerDrone throws an error', async () => {
      const error = new Error('Some error');
      clientService.registerDrone.mockRejectedValue(error);
      const req = {
        body: { "name": "Oladimeji" },
        params: {
          droneId: 'c712f494-a955-4315-86d3-381bc6988479',
        },
      };

      await ClientController.registerDrone(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('loadingDrone', () => {
    test('should call successResMsg with loaded drone data', async () => {
      const loadedDrone = [
        {
            "medicationId": "e0dd0e70-2dc2-44ef-aa7c-d9ede8d632a3",
            "name": "drug-to-bad",
            "weight": 20,
            "code": "WDE_12",
            "image": "image.jpg",
            "droneId": "198f5b6d-e31a-44f8-94d6-da92285f41d7",
            "clientId": "787d98c5-a1b5-4f37-b12b-fc1ffcf9e6c7",
            "deliveryStatus": "LOADED",
            "createdAt": "2023-07-16T08:44:22.136Z",
            "updatedAt": "2023-07-16T08:44:22.136Z"
        },
        {
            "medicationId": "a3da790d-e88f-4fae-8e37-4f8af6e199cf",
            "name": "drug-to-bad",
            "weight": 20,
            "code": "WDE_12",
            "image": "image.jpg",
            "droneId": "198f5b6d-e31a-44f8-94d6-da92285f41d7",
            "clientId": "787d98c5-a1b5-4f37-b12b-fc1ffcf9e6c7",
            "deliveryStatus": "LOADED",
            "createdAt": "2023-07-16T08:44:22.136Z",
            "updatedAt": "2023-07-16T08:44:22.136Z"
        }
    ];
      clientService.loadingDrone.mockResolvedValue(loadedDrone);
      const req = {
        body: { 
          "medications": [
            {
              "name": "drug-to-bad",
              "weight": 20,
              "code": "WDE_12",
              "image": "image.jpg"  
            },
            {
              "name": "drug-to-bad",
              "weight": 20,
              "code": "WDE_12",
              "image": "image.jpg"  
            }
        ] },
        params: {
          droneId: '198f5b6d-e31a-44f8-94d6-da92285f41d7',
          clientId: '787d98c5-a1b5-4f37-b12b-fc1ffcf9e6c7',
        },
      };

      await ClientController.loadingDrone(req, res, next);

      expect(successResMsg).toHaveBeenCalledWith(res, HttpStatus.CREATED, { data: loadedDrone });
    });

    test('should call next with error if clientService.loadingDrone throws an error', async () => {
      const error = new Error('Some error');
      clientService.loadingDrone.mockRejectedValue(error);
      const req = {
        body: { 
          "medications": [
            {
              "name": "drug-to-bad",
              "weight": 20,
              "code": "WDE_12",
              "image": "image.jpg"  
            },
            {
              "name": "drug-to-bad",
              "weight": 20,
              "code": "WDE_12",
              "image": "image.jpg"  
            }
        ] },
        params: {
          droneId: '198f5b6d-e31a-44f8-94d6-da92285f41d7',
          clientId: '787d98c5-a1b5-4f37-b12b-fc1ffcf9e6c7',
        },
      };

      await ClientController.loadingDrone(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getLoadedMedication', () => {
    test('should call successResMsg with loaded medications data', async () => {
      const loadedMedications = [{
        "medicationId": "e0dd0e70-2dc2-44ef-aa7c-d9ede8d632a3",
        "name": "drug-to-bad",
        "weight": 20,
        "code": "WDE_12",
        "image": "image.jpg",
        "deliveryStatus": "LOADED",
        "createdAt": "2023-07-16T08:44:22.136Z",
        "updatedAt": "2023-07-16T08:44:22.136Z",
        "clientId": "787d98c5-a1b5-4f37-b12b-fc1ffcf9e6c7",
        "droneId": "198f5b6d-e31a-44f8-94d6-da92285f41d7"
    },
    {
        "medicationId": "a3da790d-e88f-4fae-8e37-4f8af6e199cf",
        "name": "drug-to-bad",
        "weight": 20,
        "code": "WDE_12",
        "image": "image.jpg",
        "deliveryStatus": "LOADED",
        "createdAt": "2023-07-16T08:44:22.136Z",
        "updatedAt": "2023-07-16T08:44:22.136Z",
        "clientId": "787d98c5-a1b5-4f37-b12b-fc1ffcf9e6c7",
        "droneId": "198f5b6d-e31a-44f8-94d6-da92285f41d7"
    }];
      clientService.getLoadedMedication.mockResolvedValue(loadedMedications);
      const req = {
        params: {
          droneId: '198f5b6d-e31a-44f8-94d6-da92285f41d7',
        },
        query: {
          page: '1',
          size: '10',
        },
      };

      await ClientController.getLoadedMedication(req, res, next);

      expect(successResMsg).toHaveBeenCalledWith(res, HttpStatus.OK, { data: getPagingData(loadedMedications) });
    });

    test('should call next with error if clientService.getLoadedMedication throws an error', async () => {
      const error = new Error('Some error');
      clientService.getLoadedMedication.mockRejectedValue(error);
      const req = {
        params: {
          droneId: '198f5b6d-e31a-44f8-94d6-da92285f41d7',
        },
        query: {
          page: '1',
          size: '10',
        },
      };

      await ClientController.getLoadedMedication(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('checkDroneBatteryLevel', () => {
    test('should call successResMsg with battery capacity data', async () => {
      const batteryCapacity = 66 ;
      clientService.checkDroneBatteryLevel.mockResolvedValue(batteryCapacity);
      const req = {
        params: {
          droneId: '198f5b6d-e31a-44f8-94d6-da92285f41d7',
        },
      };

      await ClientController.checkDroneBatteryLevel(req, res, next);

      expect(successResMsg).toHaveBeenCalledWith(res, HttpStatus.OK, { data: batteryCapacity });
    });

    test('should call next with error if clientService.checkDroneBatteryLevel throws an error', async () => {
      const error = new Error('Some error');
      clientService.checkDroneBatteryLevel.mockRejectedValue(error);
      const req = {
        params: {
          droneId: '198f5b6d-e31a-44f8-94d6-da92285f41d7',
        },
      };

      await ClientController.checkDroneBatteryLevel(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});