'use strict'
const { autoSearch } = require('./index');


describe('index', function () {
  it('check autoSearch', () => {
    const search = autoSearch();
    expect(search).toBeDefined();
  });
})
