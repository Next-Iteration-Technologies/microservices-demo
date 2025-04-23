const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 6000,
    chromeWebSecurity: false,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
}); 