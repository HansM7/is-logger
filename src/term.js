const util = require("util");

const DEFAULT_OPTIONS = {
  silent: false,
  silentEnvironments: ["production"],
  environment: process.env.NODE_ENV || "development",
};

const COLORS = {
  info: "\x1b[36m",
  error: "\x1b[31m",
  success: "\x1b[32m",
  warn: "\x1b[33m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
  magenta: "\x1b[35m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

class Logger {
  constructor(options = {}) {
    this.config = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  _shouldLog() {
    if (this.config.silent) return false;
    if (this.config.silentEnvironments.includes(this.config.environment)) {
      return false;
    }
    return true;
  }

  _timestamp() {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    return `${COLORS.gray}${time}${COLORS.reset}`;
  }

  _getContextName(ctx) {
    if (!ctx) return "App";
    if (typeof ctx === "string") return ctx;
    if (typeof ctx === "function") return ctx.name || "AnonymousFn";
    if (typeof ctx === "object" && ctx.constructor) return ctx.constructor.name;
    return "Unknown";
  }

  _resolveLogArgs(first, second, third) {
    if (typeof first === "string" && typeof second !== "string") {
      const msg = first;
      if (third !== undefined) {
        return { context: third, msg, data: second };
      }
      if (second === undefined) {
        return { context: undefined, msg, data: undefined };
      }
      if (typeof second === "function" || typeof second === "string") {
        return { context: second, msg, data: undefined };
      }
      return { context: undefined, msg, data: second };
    }

    return { context: first, msg: second, data: third };
  }

  _log(type, color, icon, context, msg, data) {
    if (!this._shouldLog()) return;

    const ctxName = this._getContextName(context);
    const timestamp = this._timestamp();
    const tag = `${color}${icon} ${type}${COLORS.reset}`;
    const scope = `${COLORS.blue}[${ctxName}]${COLORS.reset}`;

    console.log(`${timestamp} ${tag} ${scope} ${msg}`);

    if (data !== undefined && data !== null) {
      const formatted = util.inspect(data, { colors: true, depth: null });
      const indented = formatted
        .split("\n")
        .map((l) => l)
        .join("\n");
      console.log(indented);
    }
  }

  info(msgOrContext, dataOrMsg, context) {
    const {
      context: ctx,
      msg,
      data,
    } = this._resolveLogArgs(msgOrContext, dataOrMsg, context);
    this._log("INFO", COLORS.info, "ℹ️ ", ctx, msg, data);
  }

  error(msgOrContext, dataOrMsg, context) {
    const {
      context: ctx,
      msg,
      data,
    } = this._resolveLogArgs(msgOrContext, dataOrMsg, context);
    this._log("ERROR", COLORS.error, "❌", ctx, msg, data);
  }

  success(msgOrContext, dataOrMsg, context) {
    const {
      context: ctx,
      msg,
      data,
    } = this._resolveLogArgs(msgOrContext, dataOrMsg, context);
    this._log("SUCCESS", COLORS.success, "✅", ctx, msg, data);
  }

  warn(msgOrContext, dataOrMsg, context) {
    const {
      context: ctx,
      msg,
      data,
    } = this._resolveLogArgs(msgOrContext, dataOrMsg, context);
    this._log("WARN", COLORS.warn, "⚠️ ", ctx, msg, data);
  }

  title(msg) {
    if (!this._shouldLog()) return;

    console.log(
      `\n${COLORS.magenta}${COLORS.bold}━━━ ${msg.toUpperCase()} ━━━${COLORS.reset}`,
    );
  }
}

module.exports = Logger;
module.exports.Logger = Logger;
module.exports.default = Logger;
