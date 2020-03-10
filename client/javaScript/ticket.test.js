const { checkTime, getParkingDetail_Id} = require('./ticket');
global.window = Object.create(window);
const url = "http://localhost:8080/ticket?id=ChIJ0XjfNHRddEgRQtXe1fjPW8w&date=2020-03-09&time=08%3A00&time=18%3A30";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});

test('check Time if < 10, if yes add 0 infront of value', () => {
  const time1 = checkTime(1);
  expect(time1).toBe("01");
  const time2 = checkTime(27);
  expect(time2).toBe(27);
});

test('check if ID gets corrent value from url', () => {
  const id = getParkingDetail_Id();
  expect(id).toBe("ChIJ0XjfNHRddEgRQtXe1fjPW8w");
});
 
