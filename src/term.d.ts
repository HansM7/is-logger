/**
 * A beautiful, simple, and dependency-free terminal logger for Node.js.
 */
declare class Term {
    /**
     * Logs an informational message.
     * @param context The context of the log (e.g. `this`, a class instance, a function reference, or a string).
     * @param msg The message to log.
     * @param data Optional metadata or object to inspect.
     */
    info(context: any, msg: string, data?: any): void;

    /**
     * Logs an error message.
     * @param context The context of the log (e.g. `this`, a class instance, a function reference, or a string).
     * @param msg The message to log.
     * @param data Optional metadata or object to inspect.
     */
    error(context: any, msg: string, data?: any): void;

    /**
     * Logs a success message.
     * @param context The context of the log (e.g. `this`, a class instance, a function reference, or a string).
     * @param msg The message to log.
     * @param data Optional metadata or object to inspect.
     */
    success(context: any, msg: string, data?: any): void;

    /**
     * Logs a warning message.
     * @param context The context of the log (e.g. `this`, a class instance, a function reference, or a string).
     * @param msg The message to log.
     * @param data Optional metadata or object to inspect.
     */
    warn(context: any, msg: string, data?: any): void;

    /**
     * Prints a bold, beautifully stylized title separator in the console.
     * @param msg The section title to display.
     */
    title(msg: string): void;
}

declare const term: Term;
export = term;
