const { listParkingDetails, findParkingDetail} = require('./parkingInfoBoard');

test('Check if listParkingDetails brigs back Array full of parking data', () => {
  const list = listParkingDetails();
  expect(Array.isArray([list])).toBe(true);
});


test('Check if findParkingDetail can bring data from specified id', () => {
  //id_example the id which is available on parkingDetails
  const find = findParkingDetail("id_example");
  expect(find.id).toBe('id_example');
  expect(find.name).toBe('Parking_Info_Name');
});
 
