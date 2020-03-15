const { listParkingDetails, findParkingDetail} = require('./parkingInfoBoard');

test('Check if listParkingDetails brigs back Array full of parking data', () => {
  const list = listParkingDetails();
  expect(Array.isArray([list])).toBe(true);
});


test('Check if findParkingDetail can bring data from specified id', () => {
  //id_example the id which is available on parkingDetails
  const find = findParkingDetail("id_example");
  expect(find.id).toBe('id_example');
  expect(find.cost15Min).toBe('Parking_Cost_15_Min');
  expect(find.cost30Min).toBe('Parking_Cost_30_Min');
  expect(find.cost1Hour).toBe('Parking_Cost_1_Hour');
  expect(find.costAdditionalHour).toBe('Parking_Cost_Additional_Hour');
});
