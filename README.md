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

## 🚀 Usage

Since `use-term` is built with universal Node.js compatibility in mind, it works seamlessly in both modern **ES Modules (ESM)** and legacy **CommonJS** environments out-of-the-box without requiring separate bundles or transpilation.

### 1. Modern ES Modules (ESM) — _Recommended_

For modern Node.js environments (projects with `"type": "module"` in `package.json`), TypeScript, Next.js, or Vite:

```javascript
import term from "use-term";

// --- A. Using inside a class (automatically gets class name) ---
class AuthService {
  login() {
    term.info(this, "Starting login process...");

    const user = { id: 42, name: "Alex", roles: ["admin", "billing"] };
    term.success(this, "Credentials validated successfully", user);
  }
}

// --- B. Using inside a function (automatically gets function name) ---
function processPayment() {
  term.warn(processPayment, "Payment gateway is responding slowly", {
    delayMs: 1500,
  });
  term.error(processPayment, "Payment gateway connection timeout", {
    code: "ETIMEDOUT",
  });
}

// --- C. Using custom string scopes ---
term.info("Server", "Server initialized on port 3000", { env: "production" });

// --- D. Visual titles ---
term.title("Authentication Flow");
const auth = new AuthService();
auth.login();

term.title("Payment Flow");
processPayment();
```

---

### 2. CommonJS (require)

For traditional Node.js applications:

```javascript
const term = require("use-term");

// Easily log with CommonJS:
term.info("CJS", "Logging using standard require() syntax!");

class AuthService {
  login() {
    term.info(this, "Starting login process...");
    const user = { id: 42, name: "Alex", roles: ["admin", "billing"] };
    term.success(this, "Credentials validated successfully", user);
  }
}

term.title("CommonJS Demo");
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

### `term.info(context, message, [data])`

Logs an informational message.

- `context` `(any)`: `this` inside a class, a function name, or a plain string.
- `message` `(string)`: The description text of the log.
- `data` `(any, optional)`: Any object, array, or metadata to inspect and format below.

### `term.error(context, message, [data])`

Logs an error message. Same signature as `info()`.

### `term.success(context, message, [data])`

Logs a success message. Same signature as `info()`.

### `term.warn(context, message, [data])`

Logs a warning message. Same signature as `info()`.

### `term.title(message)`

Prints a highlighted, uppercase section divider to demarcate different stages in your runtime.

- `message` `(string)`: The header text.

---

## 🦾 TypeScript Support

Autocompletion works out of the box in VS Code and modern IDEs. If you are using TypeScript:

```typescript
import term from "use-term";

term.info("TypeScript", "Fully typed logger out of the box!");
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
