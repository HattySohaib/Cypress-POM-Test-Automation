const open = require("open");
const path = require("path");

(async () => {
  const reportPath = path.resolve(__dirname, "../reports/mochawesome.html");
  console.log(`Opening report: ${reportPath}`);
  await open(reportPath);
})();
