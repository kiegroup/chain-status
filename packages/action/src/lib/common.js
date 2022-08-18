const core = require("@actions/core");

class ClientError extends Error {}

class TimeoutError extends Error {}

const annotationer = {
  notice: (title, content) => core.notice(content, { title: `${title}` }),
  warning: (title, content) => core.warning(content, { title: `${title}` }),
  error: (title, content) => core.error(content, { title: `${title}` })
};

module.exports = {
  ClientError,
  TimeoutError,
  annotationer
};
