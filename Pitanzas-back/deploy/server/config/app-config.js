var config = require('./app-config.json');
var messages = require('./app-messages.json');
var AppConfig = (function () {
    function AppConfig() {
    }
    AppConfig.key = function (name) {
        return this._config[name];
    };
    AppConfig.msg = function (name) {
        return this._messages[name];
    };
    AppConfig._config = config;
    AppConfig._messages = messages;
    return AppConfig;
})();
exports.AppConfig = AppConfig;

//# sourceMappingURL=app-config.js.map
