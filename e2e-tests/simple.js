'use strict';

describe('Page title', function() {

  browser.get('index.html');

  it('should have a title', function() {
    expect(browser.getTitle()).toMatch('Marvin');
  });
});