const util = require('util');

const COLORS = {
    info: '\x1b[36m',
    error: '\x1b[31m',
    success: '\x1b[32m',
    warn: '\x1b[33m',
    blue: '\x1b[34m',
    gray: '\x1b[90m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

class Term {
    _timestamp() {
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        return `${COLORS.gray}${time}${COLORS.reset}`;
    }

    _getContextName(ctx) {
        if (!ctx) return 'App';
        if (typeof ctx === 'string') return ctx;
        if (typeof ctx === 'function') return ctx.name || 'AnonymousFn';
        if (typeof ctx === 'object' && ctx.constructor) return ctx.constructor.name;
        return 'Unknown';
    }

    _log(type, color, icon, context, msg, data) {
        const ctxName = this._getContextName(context);
        const timestamp = this._timestamp();
        const tag = `${color}${icon} ${type}${COLORS.reset}`;
        const scope = `${COLORS.blue}[${ctxName}]${COLORS.reset}`;
        
        console.log(`${timestamp} ${tag} ${scope} ${msg}`);
        
        if (data !== undefined && data !== null) {
            const formatted = util.inspect(data, { colors: true, depth: null });
            const indented = formatted.split('\n').map(l => l).join('\n');
            console.log(indented);
        }
    }

    info(context, msg, data) {
        this._log('INFO', COLORS.info, 'ℹ️ ', context, msg, data);
    }

    error(context, msg, data) {
        this._log('ERROR', COLORS.error, '❌', context, msg, data);
    }
 
    success(context, msg, data) {
        this._log('SUCCESS', COLORS.success, '✅', context, msg, data);
    }

    warn(context, msg, data) {
        this._log('WARN', COLORS.warn, '⚠️ ', context, msg, data);
    }

    title(msg) {
        console.log(`\n${COLORS.magenta}${COLORS.bold}━━━ ${msg.toUpperCase()} ━━━${COLORS.reset}`);
    }
}

module.exports = new Term();
