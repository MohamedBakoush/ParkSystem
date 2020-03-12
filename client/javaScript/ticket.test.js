'use strict'
const {splitHref, calculateTime, getByI, costData,
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

const {findParkingDetail} = require('../../parkingInfoBoard');

describe('ticket', function () {
  const herf = splitHref();
  const parkingID = herf[0];
  const checkInDate = herf[1];
  const checkInHour = herf[2];
  const checkInMin = herf[3];
  const checkOutHour = herf[4];
  const checkOutMin = herf[5];
  it('check splitHref', () => {
    expect(herf).toBeDefined();
    expect(parkingID).toBe("ChIJ0XjfNHRddEgRQtXe1fjPW8w");
    expect(checkInDate).toBe("2020-03-09");
    expect(checkInHour).toBe("08");
    expect(checkInMin).toBe("00");
    expect(checkOutHour).toBe("18");
    expect(checkOutMin).toBe("30");
  });
  const time = calculateTime(checkInHour, checkInMin, checkOutHour, checkOutMin);
  const timeCheckIn = time[0];
  const timeCheckOut = time[1];
  const totalTimeDiffrence = time[2];
  const timeDiffrenceHour = time[3];
  const timeDiffrenceMin = time[4];
  it('check calculateTime', () => {
    expect(time).toBeDefined();
    expect(timeCheckIn).toBe("08:00");
    expect(timeCheckOut).toBe("18:30");
    expect(totalTimeDiffrence).toBe("10:30");
    expect(timeDiffrenceHour).toBe(10);
    expect(timeDiffrenceMin).toBe(30);
  });

  // TODO: getById
  // it('check getById', () => {
  // });

  const parkingDetail = findParkingDetail("ChIJ0XjfNHRddEgRQtXe1fjPW8w");   // to get data from the database id - ChIJ0XjfNHRddEgRQtXe1fjPW8w
  const cost = calculateCost(parkingDetail, timeDiffrenceHour, timeDiffrenceMin);
  it('check calculateCost', () => {
    expect(cost).toBeDefined();
    expect(cost).toBe(13);;
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

  // TODO: loadParkingDetail
  // it('check loadParkingDetail', () => {
  // });

  // TODO: getTicketInfo
  // it('check getTicketInfo', () => {
  // });
})
