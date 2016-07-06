var log4js = require('log4js');
var validator = require('validator');
var app_config_1 = require('./../../config/app-config');
var constantes_1 = require('./../../common/constantes');
var logger = log4js.getLogger("validations/user-service");
/**
 * Clase que valida los campos y realiza las transformaciones y normalizaciones necesarias
 * de cada método del servicio UserService
 * @export
 * @class UserServiceValidation
 */
var UserServiceValidation = (function () {
    /**
     * Devuelve instancia de UserServiceValidation. Singleton
     */
    function UserServiceValidation() {
        if (UserServiceValidation._instance) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_INSTANCIA)));
        }
        UserServiceValidation._instance = this;
    }
    /**
     * Devuelve instancia de UserServiceValidation. Singleton
     * @static
     * @returns {UserService}
     */
    UserServiceValidation.getInstance = function () {
        return UserServiceValidation._instance;
    };
    /**
     *
     * Valida los parámetros del método getUser
     * @param {string} id
     * @returns {string} id
     */
    UserServiceValidation.prototype.getUser = function (id) {
        logger.debug("getUser");
        if (!validator.isMongoId(id)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_FORMAT_ID)));
        }
    };
    /**
     * Valida parámetros método saveUser del service
     * @param {IUser} user
     * @returns {IUser}
     */
    UserServiceValidation.prototype.saveUser = function (user) {
        logger.debug("saveUser");
        //validaciones
        if (validator.isNull(user.name)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_REQ_NOMBRE)));
        }
        if (validator.isNull(user.email)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_REQ_EMAIL)));
        }
        //Este validator solo aplica sobre string...
        if (user.age == null) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_REQ_AGE)));
        }
        if (!validator.isNumeric(user.age.toString())) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_FORMAT_AGE)));
        }
        if (!validator.isEmail(user.email)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_FORMAT_EMAIL)));
        }
        //pipes, transformamos/normalizamos datos
        user.name = validator.trim(user.name).toLowerCase();
        user.email = validator.trim(user.email).toLowerCase();
    };
    /**
     * Valida parámetros método updateUser del service
     * @param {User} user
     * @returns {User}
     */
    UserServiceValidation.prototype.updateUser = function (user) {
        logger.debug("updateUser");
        //validaciones           
        if (validator.isNull(user.id)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_REQ_ID)));
        }
        if (!validator.isMongoId(user.id)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_FORMAT_ID)));
        }
        if (validator.isNull(user.name)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_REQ_NOMBRE)));
        }
        //Este validator solo aplica sobre string...
        if (user.age == null) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_REQ_AGE)));
        }
        if (!validator.isNumeric(user.age.toString())) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_FORMAT_AGE)));
        }
        if (validator.isNull(user.email)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_REQ_EMAIL)));
        }
        if (!validator.isEmail(user.email)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_FORMAT_EMAIL)));
        }
        //pipes, transformamos/normalizamos datos
        user.name = validator.trim(user.name).toLowerCase();
        user.email = validator.trim(user.email).toLowerCase();
    };
    UserServiceValidation.prototype.deleteUser = function (id) {
        logger.debug("deleteUser");
        if (!validator.isMongoId(id)) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_FORMAT_ID)));
        }
    };
    UserServiceValidation._instance = new UserServiceValidation();
    return UserServiceValidation;
})();
exports.UserServiceValidation = UserServiceValidation;

//# sourceMappingURL=user-service.js.map
