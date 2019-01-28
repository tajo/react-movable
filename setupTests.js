const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const IS_DEV = process.env.E2E === 'dev';

// in the headless (dev) mode font rendering is slightly different
// so we need higher threshold
// in CI, it's a perfect match, thus 0.01
// you should always save/update snapshots via
// yarn test:e2e / yarn test:e2e:update
const customConfig = { threshold: IS_DEV ? 0.1 : 0.01 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: customConfig
});
expect.extend({ toMatchImageSnapshot });
