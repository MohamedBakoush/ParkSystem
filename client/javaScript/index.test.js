'use strict'
const { autoSearch } = require('./index');


describe('index', function () {
  it('check autoSearch', async () => {
    const search = autoSearch();
    expect(search).toBeDefined();
  });
})
