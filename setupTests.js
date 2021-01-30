const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

// you should always save/update snapshots via
// yarn test:e2e / yarn test:e2e:update
const customConfig = { threshold: 0.1 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: customConfig
});
expect.extend({ toMatchImageSnapshot });
