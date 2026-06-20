# use-term 🚀

[![NPM Version](https://img.shields.io/npm/v/use-term.svg?style=flat-rounded&color=blue)](https://www.npmjs.com/package/use-term)
[![License](https://img.shields.io/npm/l/use-term.svg?style=flat-rounded&color=green)](https://github.com/hansm7/use-term/blob/main/LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-rounded)](https://www.npmjs.com/package/use-term)
[![NodeJS Version](https://img.shields.io/badge/node-%3E%3D%2012.0.0-blue.svg?style=flat-rounded)](https://nodejs.org/)

A **zero-dependency**, ultra-lightweight, and beautiful terminal logging library for Node.js. It features smart context detection (classes, functions, or text), automatic subtle timestamps, beautiful emojis, and colored object inspection.

---

## ✨ Features

- 🔋 **Zero Dependencies:** Pure vanilla Node.js using native ANSI color escapes and `util.inspect`. High performance and 100% secure.
- 🧠 **Smart Context Detection:** Automatically extracts scopes/context names from class instances (`this`), function references, or plain strings.
- ⏱️ **Automatic Timestamps:** Every line starts with a subtle, gray-colored time stamp `HH:MM:SS` that keeps your logs tidy and organized.
- 🎨 **Visual Styling:** Beautifully formatted log categories with color-coded tags and emojis:
  - ℹ️ `INFO` (Cyan)
  - ❌ `ERROR` (Red)
  - ✅ `SUCCESS` (Green)
  - ⚠️ `WARN` (Yellow)
- 📦 **Rich Object/Data Inspection:** Automatically colorizes and formats nested metadata, objects, and arrays.
- 📝 **Title Dividers:** Easily print prominent section headers using the `.title()` function.
- 🎯 **TypeScript Ready:** Ships with full `.d.ts` declaration files for autocomplete and TypeScript projects.

---

## 📦 Installation

Install the package via npm:

```bash
npm install use-term
```

---

## ⚙️ Configuration

You can customize the logger behavior by passing options when creating a new instance:

```javascript
import { Logger } from "use-term";

// Disable all logs (useful for testing or production overrides)
const silentLogger = new Logger({ silent: true });
silentLogger.info("This won't be logged");

// Disable logs in specific environments (defaults to ["production"])
const logger = new Logger({
  silentEnvironments: ["production", "staging"],
  environment: process.env.NODE_ENV,
});

// Custom configuration
const customLogger = new Logger({
  silent: false,
  silentEnvironments: ["prod"],
  environment: process.env.APP_ENV || "development",
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `silent` | boolean | `false` | If `true`, all logs are disabled |
| `silentEnvironments` | string[] | `["production"]` | Array of environments where logging is disabled |
| `environment` | string | `process.env.NODE_ENV \|\| "development"` | Current environment name |

**Example: Disable logs only in production**

```javascript
const logger = new Logger(); // By default, logs are disabled when NODE_ENV=production
logger.info("This won't appear in production"); // Silent in production
```

**Example: Disable logs in multiple environments**

```javascript
const logger = new Logger({
  silentEnvironments: ["production", "staging", "testing"],
});
// Logs will be silenced in any of these environments
```

---

## 🚀 Usage

Since `use-term` is built with universal Node.js compatibility in mind, it works seamlessly in both modern **ES Modules (ESM)** and legacy **CommonJS** environments out-of-the-box without requiring separate bundles or transpilation.

### 1. Modern ES Modules (ESM) — _Recommended_

For modern Node.js environments (projects with `"type": "module"` in `package.json`), TypeScript, Next.js, or Vite:

```javascript
import { Logger } from "use-term";

// Create a logger instance with default options
// Logs are disabled in production by default
const logger = new Logger();

// For custom environments:
const customLogger = new Logger({
  environment: process.env.NODE_ENV,
  silentEnvironments: ["production", "staging"],
});

// --- A. Using inside a class (automatically gets class name) ---
class AuthService {
  login() {
    logger.info("Starting login process...", undefined, this);

    const user = { id: 42, name: "Alex", roles: ["admin", "billing"] };
    logger.success("Credentials validated successfully", user, this);
  }
}

// --- B. Using inside a function (automatically gets function name) ---
function processPayment() {
  logger.warn(
    "Payment gateway is responding slowly",
    { delayMs: 1500 },
    processPayment,
  );
  logger.error(
    "Payment gateway connection timeout",
    { code: "ETIMEDOUT" },
    processPayment,
  );
}

// --- C. Using custom string scopes ---
logger.info("Server initialized on port 3000", { env: "production" }, "Server");

// --- D. Visual titles ---
logger.title("Authentication Flow");
const auth = new AuthService();
auth.login();

logger.title("Payment Flow");
processPayment();
```

---

### 2. CommonJS (require)

For traditional Node.js applications:

```javascript
const { Logger } = require("use-term");

// Create a logger instance with default options
// Logs are disabled in production by default
const logger = new Logger();

// For custom environments:
const customLogger = new Logger({
  environment: process.env.NODE_ENV,
  silentEnvironments: ["prod"],
});

// Easily log with CommonJS:
logger.info("Logging using standard require() syntax!", undefined, "CJS");

class AuthService {
  login() {
    logger.info("Starting login process...", undefined, this);
    const user = { id: 42, name: "Alex", roles: ["admin", "billing"] };
    logger.success("Credentials validated successfully", user, this);
  }
}

logger.title("CommonJS Demo");
const auth = new AuthService();
auth.login();
```

---

## 🎨 Log Outputs Preview

When you run your scripts, your terminal will light up with premium, high-visibility, clean styling:

```text
14:23:05 ℹ️  INFO [Server] Server initialized on port 3000
{ env: 'production' }

━━━ AUTHENTICATION FLOW ━━━
14:23:05 ℹ️  INFO [AuthService] Starting login process...
14:23:05 ✅ SUCCESS [AuthService] Credentials validated successfully
{ id: 42, name: 'Alex', roles: [ 'admin', 'billing' ] }

━━━ PAYMENT FLOW ━━━
14:23:05 ⚠️  WARN [processPayment] Payment gateway is responding slowly
{ delayMs: 1500 }
14:23:05 ❌ ERROR [processPayment] Payment gateway connection timeout
{ code: 'ETIMEDOUT' }
```

---

## 🛠️ API Reference

### `logger.info(message, [data], [context])`

Logs an informational message.

- `message` `(string)`: The description text of the log.
- `data` `(any, optional)`: Any object, array, or metadata to inspect and format below.
- `context` `(any, optional)`: `this` inside a class, a function name, or a plain string.

### `logger.error(message, [data], [context])`

Logs an error message. Same signature as `info()`.

### `logger.success(message, [data], [context])`

Logs a success message. Same signature as `info()`.

### `logger.warn(message, [data], [context])`

Logs a warning message. Same signature as `info()`.

### `logger.title(message)`

Prints a highlighted, uppercase section divider to demarcate different stages in your runtime.

- `message` `(string)`: The header text.

---

## 🦾 TypeScript Support

Autocompletion works out of the box in VS Code and modern IDEs. If you are using TypeScript:

```typescript
import { Logger } from "use-term";

const logger = new Logger();

logger.info("Fully typed logger out of the box!", undefined, "TypeScript");
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
