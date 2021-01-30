const IS_DEV = process.env.E2E === 'dev';

module.exports = {
  launch: {
    headless: !IS_DEV,
    slowMo: 200
  }
};
