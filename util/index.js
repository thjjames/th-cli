module.exports = {
    cleanArgs(cmd) {
        const args = {};
        cmd.options.forEach(o => {
            const key = this.camelize(o.long.replace(/^--/, ''));
            // if an option is not present and Command has a method with the same name it should not be copied
            if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
                args[key] = cmd[key];
            }
        });
        return args;
    },
    camelize (str) {
        return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
    }
}