const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  defaultCommandTimeout: 4 * 1000,
  // retries: 2,


  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});