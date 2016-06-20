describe('angularjs homepage todo list', function() {

  beforeEach(function() {
    //    browser.get('');
  });


  it('url redirect index.html to index.html/shop', function() {

    //  browser.get('http://localhost:3000/shop');

      expect(browser.getCurrentUrl()).toBe('/shop');

  });
});
