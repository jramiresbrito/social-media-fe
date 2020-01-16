// This file should contain configuration for log services
// E.g Sentry. But i'll just console the errors for simplicity.

function init() {
  // Sentry initiation should come here..
}

function log(error) {
  // Sentry capture exceptions should come here..
  console.error(error);
}

export default {
  init,
  log,
};
