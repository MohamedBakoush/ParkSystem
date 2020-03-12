'use strict'
const {splitHref, calculateTime, costData,
      calculateCost, createBuyTicket, ticketData,
      checkTime,getParkingDetail_Id, loadParkingDetail,
      getTicketInfo} = require('./ticket');
global.window = Object.create(window);
const url = "http://localhost:8080/ticket?id=ChIJ0XjfNHRddEgRQtXe1fjPW8w&date=2020-03-09&time=08%3A00&time=18%3A30";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});
// TODO: loadParkingDetail, getTicketInfo
const {findParkingDetail} = require('../../parkingInfoBoard');

describe('ticket', function () {
  const herfData = splitHref();
  it('check splitHref', () => {
    expect(herfData).toBeDefined();
    expect(herfData.parkingID).toBe("ChIJ0XjfNHRddEgRQtXe1fjPW8w");
    expect(herfData.checkInDate).toBe("2020-03-09");
    expect(herfData.checkInHour).toBe("08");
    expect(herfData.checkInMin).toBe("00");
    expect(herfData.checkOutHour).toBe("18");
    expect(herfData.checkOutMin).toBe("30");
  });
  const time = calculateTime(herfData.checkInHour, herfData.checkInMin, herfData.checkOutHour, herfData.checkOutMin);
  it('check calculateTime', () => {
    expect(time).toBeDefined();
    expect(time.timeCheckIn).toBe("08:00");
    expect(time.timeCheckOut).toBe("18:30");
    expect(time.totalTimeDiffrence).toBe("10:30");
    expect(time.timeDiffrenceHour).toBe(10);
    expect(time.timeDiffrenceMin).toBe(30);
  });

  const parkingDetail = findParkingDetail("ChIJ0XjfNHRddEgRQtXe1fjPW8w");   // to get data from the database id - ChIJ0XjfNHRddEgRQtXe1fjPW8w
  const cost = calculateCost(parkingDetail, time.timeDiffrenceHour, time.timeDiffrenceMin);
  it('check calculateCost', () => {
    expect(cost).toBeDefined();
    expect(cost).toBe(13);
  });

  const createElement = document.createElement("section");
  it('check costData', () => {
    const dataCost = costData(createElement, "£", cost,  "p", "finalCost", "finalCost")
    expect(dataCost).toBe("costContent is not Null");
    expect(dataCost).toBeDefined();
    const noDataCost = costData(createElement, "£", "cost",  "p", "finalCost", "finalCost")
    expect(noDataCost).toBe("costContent is Null");
    expect(noDataCost).toBeDefined();
  });
  it('check createBuyTicket', () => {
    const buyTicket = createBuyTicket(createElement, "submit", "Buy Ticket", true, "buyTicket", "buyTicket");
    expect(buyTicket).toBeDefined();
    expect(buyTicket.type).toBe("submit");
    expect(buyTicket.value).toBe("Buy Ticket");
    expect(buyTicket.classList[0]).toBe("buyTicket");
    expect(buyTicket.id).toBe("buyTicket");
    expect(buyTicket.disabled).toBe(true);
  });

  it('check ticketData', () => {
    const dataTicket = ticketData(createElement, `textContent`, "p", "time_Class", "time_ID");
    expect(dataTicket).toBeDefined();
    expect(dataTicket.textContent).toBe("textContent");
    expect(dataTicket.classList[0]).toBe("time_Class");
    expect(dataTicket.id).toBe("time_ID");
  });

  it('check checkTime', () => {
    const timeLess10 = checkTime(1);
    expect(timeLess10).toBeDefined();
    expect(timeLess10).toBe("01");
    expect(typeof timeLess10).toBe("string");
    const time10OrMore = checkTime(27);
    expect(time10OrMore).toBeDefined();
    expect(time10OrMore).toBe(27);
    expect(typeof time10OrMore).toBe("number");
  });
  it('check getParkingDetail_Id', () => {
    const id = getParkingDetail_Id();
    expect(id).toBeDefined();
    expect(id).toBe("ChIJ0XjfNHRddEgRQtXe1fjPW8w");
    expect(typeof id).toBe("string");
  });
})
