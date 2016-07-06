var app_config_1 = require('./../config/app-config');
var constantes_1 = require('./../common/constantes');
var log4js = require('log4js');
var logger = log4js.getLogger("user-exception");
var UserExistError = (function () {
    function UserExistError() {
        this.message = app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_EXIST);
        this.name = constantes_1.Constantes.ERR_USER_EXIST;
    }
    return UserExistError;
})();
exports.UserExistError = UserExistError;
var UserNotExistError = (function () {
    function UserNotExistError() {
        this.message = app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_NO_EXIST);
        this.name = constantes_1.Constantes.ERR_USER_NO_EXIST;
    }
    return UserNotExistError;
})();
exports.UserNotExistError = UserNotExistError;

//# sourceMappingURL=user-exceptions.js.map
