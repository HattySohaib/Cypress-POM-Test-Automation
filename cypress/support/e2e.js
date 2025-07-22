import "./commands";
import "cypress-iframe";

// Global error handling for timeouts
Cypress.on("fail", (error, runnable) => {
  if (error.message.includes("Timed out")) {
    console.error("Timeout Error:", error.message);
    throw new Error(
      "A timeout occurred during the test execution. Please check the application or increase timeout durations."
    );
  }
  // Let other errors propagate
  throw error;
});
