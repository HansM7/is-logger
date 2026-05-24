/**
 * A beautiful, simple, and dependency-free terminal logger for Node.js.
 */
declare class Term {
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

declare const term: Term;
export = term;
