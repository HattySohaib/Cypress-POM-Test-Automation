const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://community2.cloud-2.automationanywhere.digital/#/login",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/tests/*.cy.js",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "reports",
    overwrite: false,
    html: true,
    json: false,
  },
});
