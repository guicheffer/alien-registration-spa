module.exports = {
  before: (browser) => {
    const url = browser.globals.devServerURL;
    const timeOut = browser.globals.timeOut;
    browser.url(url);
    browser.pause(timeOut);
  },
  'Check if input fields is on homepage': (browser) => {
    browser.expect.element('#app-alien-registration').to.be.present.and.to.be.visible;
  },
  after: (browser) => {
    browser.end();
  },
};
