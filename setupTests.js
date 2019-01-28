const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const customConfig = { threshold: 0.02 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: customConfig
});
expect.extend({ toMatchImageSnapshot });
