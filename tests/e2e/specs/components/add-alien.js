module.exports = {
  before: (browser) => {
    const url = browser.globals.devServerURL;
    const timeOut = browser.globals.timeOut;
    browser.url(url + 'exercise/js');
    browser.pause(timeOut);
  },
  'Check if validate button is on the page': (browser) => {
    browser.expect.element('[type=submit]').to.be.present.and.to.be.visible;
  },
  after: (browser) => {
    browser.end();
  },
};
