'use strict'

const { autoSearch } = require('./index'); // import functions from index

describe('index', function () {

  it('check autoSearch', async () => {  // test for autoSearch function
    const search = autoSearch();
    expect(search).toBeDefined();
  });

})
