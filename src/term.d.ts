/**
 * Configuration options for the Logger.
 */
export interface LoggerOptions {
  /**
   * If true, no logs will be printed regardless of environment.
   * @default false
   */
  silent?: boolean;
  /**
   * Array of environments where logging should be disabled.
   * @default ["production"]
   */
  silentEnvironments?: string[];
  /**
   * Current environment (defaults to NODE_ENV or "development").
   * @default process.env.NODE_ENV || "development"
   */
  environment?: string;
}

/**
 * A beautiful, simple, and dependency-free terminal logger for Node.js.
 * Instantiate with `new Logger()` to create a logger instance with optional configuration.
 *
 * @example
 * const logger = new Logger();
 * logger.info("Hello world");
 *
 * @example
 * const logger = new Logger({ silent: true });
 * logger.info("This won't be logged");
 *
 * @example
 * const logger = new Logger({ silentEnvironments: ["production", "staging"] });
 * // Logs will be disabled if NODE_ENV is "production" or "staging"
 */
export class Logger {
  constructor(options?: LoggerOptions);

  /**
   * Logs an informational message.
   * @param msg The message to log.
   * @param data Optional metadata or object to inspect.
   * @param context Optional scope or location for the log (e.g. `this`, a function, or a string).
   */
  info(msg: string, data?: any, context?: any): void;
  info(context: any, msg: string, data?: any): void;

  /**
   * Logs an error message.
   * @param msg The message to log.
   * @param data Optional metadata or object to inspect.
   * @param context Optional scope or location for the log (e.g. `this`, a function, or a string).
   */
  error(msg: string, data?: any, context?: any): void;
  error(context: any, msg: string, data?: any): void;

  /**
   * Logs a success message.
   * @param msg The message to log.
   * @param data Optional metadata or object to inspect.
   * @param context Optional scope or location for the log (e.g. `this`, a function, or a string).
   */
  success(msg: string, data?: any, context?: any): void;
  success(context: any, msg: string, data?: any): void;

  /**
   * Logs a warning message.
   * @param msg The message to log.
   * @param data Optional metadata or object to inspect.
   * @param context Optional scope or location for the log (e.g. `this`, a function, or a string).
   */
  warn(msg: string, data?: any, context?: any): void;
  warn(context: any, msg: string, data?: any): void;

  /**
   * Prints a bold, beautifully stylized title separator in the console.
   * @param msg The section title to display.
   */
  title(msg: string): void;
}
