const assert = require('assert');
const Logger = require('../src/term');
const { Logger: NamedLogger } = require('../src/term');

assert.strictEqual(typeof Logger, 'function', 'Default export should be a constructor');
assert.strictEqual(typeof NamedLogger, 'function', 'Named export Logger should be a constructor');
assert.strictEqual(Logger, NamedLogger, 'Default export and named export should be the same constructor');

const instance = new Logger({ silent: true });
assert.ok(instance, 'Should create a Logger instance');
assert.strictEqual(instance.constructor.name, 'Logger', 'Instance constructor name should be Logger');

console.log('✅ use-term export and constructor test passed');
