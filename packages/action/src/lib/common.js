const util = require("util");
const core = require("@actions/core");

class ClientError extends Error {}

class TimeoutError extends Error {}

function log(prefix, obj) {
  const str = obj.map(o => (typeof o === "object" ? inspect(o) : o));
  if (prefix) {
    console.log.apply(console, [prefix, ...str]);
  } else {
    console.log.apply(console, str);
  }
}

const annotationer = {
  notice: (title, content) => core.notice(content, { title: `${title}` }),
  warning: (title, content) => core.warning(content, { title: `${title}` }),
  error: (title, content) => core.error(content, { title: `${title}` })
};

const logger = {
  level: "info",

  trace: (...str) => {
    if (logger.level === "trace") {
      log("[TRACE] ", str);
    }
  },

  debug: (...str) => {
    if (logger.isDebug()) {
      log("[DEBUG] ", str);
    }
  },

  emptyLine: () => log("", []),
  info: (...str) => log("[INFO] ", str),
  warn: (...str) => log("[WARN] ", str),

  error: (...str) => {
    if (str.length === 1) {
      if (str[0] instanceof Error) {
        if (logger.isDebug()) {
          log(null, [str[0].stack || str[0]]);
        } else {
          log("[ERROR] ", [str[0].message || str[0]]);
        }
      }
    } else {
      log("[ERROR] ", str);
    }
  },
  isDebug: () => logger.level === "trace" || logger.level === "debug"
};

function inspect(obj) {
  return util.inspect(obj, false, null, true);
}

module.exports = {
  ClientError,
  TimeoutError,
  annotationer,
  logger
};
