const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://community2.cloud-2.automationanywhere.digital/#/login",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/tests/*.cy.js",
    defaultCommandTimeout: 10000, // 10 seconds
    pageLoadTimeout: 30000, // 30 seconds
    requestTimeout: 15000, // 15 seconds
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "reports",
    overwrite: false,
    html: true,
    json: false,
  },
});
