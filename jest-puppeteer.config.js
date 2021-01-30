const IS_DEV = process.env.E2E === 'dev';

module.exports = {
  launch: {
    headless: !IS_DEV,
    slowMo: IS_DEV ? 200 : 50
  }
};
