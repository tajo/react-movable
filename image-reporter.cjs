const fs = require('fs');
const imgur = require('imgur');
const clientId = 'ef1b6c91b9b66b8';

class ImageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }
  onTestResult(test, testResult, aggregateResults) {
    if (
      testResult.numFailingTests &&
      testResult.failureMessage.match(/different from snapshot/)
    ) {
      const files = fs.readdirSync(
        './e2e/__image_snapshots__/__diff_output__/'
      );
      files.forEach(value => {
        imgur
          .uploadFile(`./e2e/__image_snapshots__/__diff_output__/${value}`)
          .then(function(json) {
            console.log(`diff ${value} uploaded to ${json.data.link}`);
          })
          .catch(function(err) {
            console.error(err.message);
          });
      });
    }
  }
}

module.exports = ImageReporter;
