const { listParkingDetails, findParkingDetail} = require('./parkingInfoBoard'); // import functions from parkingInfoBoard

describe('parkingInfoBoard', function () {

    it('Check if listParkingDetails brigs back Array full of parking data', () => {// test for listParkingDetails function
      const list = listParkingDetails();
      expect(list).toBeDefined();
      expect(Array.isArray([list])).toBe(true);
    });

    it('Check if findParkingDetail can bring data from specified id', () => { // test for findParkingDetail function
       const find = findParkingDetail("id_example");  //id_example the id which is available on parkingDetails
      expect(find).toBeDefined();
      expect(find.id).toBe('id_example');
      expect(find.cost15Min).toBe('Parking_Cost_15_Min');
      expect(find.cost30Min).toBe('Parking_Cost_30_Min');
      expect(find.cost1Hour).toBe('Parking_Cost_1_Hour');
      expect(find.costAdditionalHour).toBe('Parking_Cost_Additional_Hour');

      const findNA = findParkingDetail(undefined);
      expect(findNA).toBeDefined();
      expect(findNA).toBe(null);
    });

  })
