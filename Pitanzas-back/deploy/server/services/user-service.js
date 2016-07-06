var user_dao_1 = require("./../dao/user-dao");
var user_service_1 = require('./validations/user-service');
var log4js = require('log4js');
var user_exceptions_1 = require('./../exceptions/user-exceptions');
var app_config_1 = require('./../config/app-config');
var constantes_1 = require('./../common/constantes');
var logger = log4js.getLogger("user-services");
/**
 * Clase que gestiona la lógica de negocio sobre entidad usuario
 * @export
 * @class UserService
 */
var UserService = (function () {
    /**
      * Devuelve instancia de UserService. Singleton.
      */
    function UserService() {
        this._validateAndPipe = user_service_1.UserServiceValidation.getInstance();
        this._userDAO = user_dao_1.UserDAO.getInstance();
        if (UserService._instance) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_INSTANCIA)));
        }
        UserService._instance = this;
    }
    /**
     * Devuelve instancia de UserService. Singleton
     * @static
     * @returns {UserService}
     */
    UserService.getInstance = function () {
        return UserService._instance;
    };
    /**
     * Obtiene todos los usuarios
     * @param {(user: IUser, error:Error) => void} callback funciòn callback
     * cuya funcionalidad estará la invocación desde controller
     */
    UserService.prototype.getUsers = function () {
        var _this = this;
        logger.debug("getUsers");
        return new Promise(function (resolve, reject) {
            _this._userDAO.findAll().then(function (data) { resolve(data); }, function (err) { reject(err); });
        });
    };
    /**
     * Obtiene un usuario a partir de su id
     * @param {string} id
     * @param {(user: IUser, error:Error) => void} callback funciòn callback
     * cuya funcionalidad estará la invocación desde controller
     */
    UserService.prototype.getUser = function (id) {
        var _this = this;
        logger.debug("getUser");
        return new Promise(function (resolve, reject) {
            //se valida entrada y normaliza. Es promise la validación
            _this._validateAndPipe.getUser(id);
            _this._userDAO.findById(id)
                .then(function (user) {
                if (user === null) {
                    throw new user_exceptions_1.UserNotExistError();
                }
                else {
                    resolve(user);
                }
            })
                .catch(function (err) { reject(err); });
        });
    };
    /**
     * Busca un usuario por nombre y si no lo encuentra lo inserta en BBDD
     * @param {User} user
     * @returns {Promise<IUser>}
     */
    UserService.prototype.saveUser = function (user) {
        var _this = this;
        logger.debug("saveUser");
        return new Promise(function (resolve, reject) {
            _this._validateAndPipe.saveUser(user.payload);
            _this._userDAO.findByName((user.payload))
                .then(function (_user) {
                // si no hay usuario con ese nombre, se crea. 
                //ojo, solo puede/debe hacer return de promise, por eso el error se lanza
                if (_user === null) {
                    return _this._userDAO.create(user.payload);
                }
                else {
                    throw new user_exceptions_1.UserExistError();
                }
            })
                .then(function (_user) { return resolve(_user); })
                .catch(function (err) { reject(err); });
        });
    };
    /**
    * Busca el usuario por id y lo actualiza con los datos enviados
    * @param {User} user
    * @returns {Promise<IUser>}
    */
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        logger.debug("updateUser");
        return new Promise(function (resolve, reject) {
            _this._validateAndPipe.updateUser(user);
            _this._userDAO.findByIdAndUpdate(user)
                .then(function (data) { resolve(data); })
                .catch(function (err) { reject(err); });
        });
    };
    /**
      * Busca el usuario por id y lo elimina
      * @param {string} id
      * @returns {Promise<IUser>}
      */
    UserService.prototype.deleteUser = function (id) {
        var _this = this;
        logger.debug("deleteUser");
        return new Promise(function (resolve, reject) {
            _this._validateAndPipe.deleteUser(id);
            _this._userDAO.findByIdAndRemove(id)
                .then(function (data) { resolve(data); })
                .catch(function (err) { reject(err); });
        });
    };
    UserService._instance = new UserService();
    return UserService;
})();
exports.UserService = UserService;

//# sourceMappingURL=user-service.js.map
