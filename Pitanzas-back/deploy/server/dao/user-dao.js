var log4js = require('log4js');
var user_mongoose_1 = require('./../models/mongoose/user-mongoose');
var user_exceptions_1 = require('./../exceptions/user-exceptions');
var app_config_1 = require('./../config/app-config');
var constantes_1 = require('./../common/constantes');
var logger = log4js.getLogger("user-dao");
var UserDAO = (function () {
    /**
      * Devuelve instancia de UserDAO. Singleton
      */
    function UserDAO() {
        if (UserDAO._instance) {
            throw (new Error(app_config_1.AppConfig.msg(constantes_1.Constantes.ERR_USER_INSTANCIA)));
        }
        UserDAO._instance = this;
    }
    /**
     * Devuelve instancia de UserDAO. Singleton
     * @returns {UserDAO}
     */
    UserDAO.getInstance = function () {
        return UserDAO._instance;
    };
    /**
     * Busca todos los usuarios
     * @returns {Promise <IUser[]>}
     */
    UserDAO.prototype.findAll = function () {
        logger.debug("findAll");
        return new Promise(function (resolve, reject) {
            user_mongoose_1.UserMongoose.model.find()
                .sort('-name') //order desc
                .exec()
                .onResolve(function (err, users) {
                err ? reject(new Error(err)) : resolve(users);
            });
        });
    };
    /**
     * Busca un usuario
     * @param {string} _id
     * @returns {Promise <IUser>}
     */
    UserDAO.prototype.findById = function (_id) {
        logger.debug("findById", _id);
        return new Promise(function (resolve, reject) {
            user_mongoose_1.UserMongoose.model.findById(_id)
                .exec()
                .onResolve(function (err, user) {
                err ? reject(err) : resolve(user);
            });
        });
    };
    /**
      * Busca un usuario
      * @param {string} _id
      * @returns {Promise <IUser>}
      */
    UserDAO.prototype.findByName = function (filter) {
        logger.debug("findFilter", filter);
        return new Promise(function (resolve, reject) {
            user_mongoose_1.UserMongoose.model.findOne({ name: filter.name })
                .exec()
                .onResolve(function (err, user) {
                err ? reject(err) : resolve(user);
            });
        });
    };
    /**
      * Crea un usuario
      * @param {string} _id
      * @returns {Promise <IUser>}
      */
    UserDAO.prototype.create = function (user) {
        logger.debug("create", user);
        return new Promise(function (resolve, reject) {
            if (user.id)
                reject(new user_exceptions_1.UserExistError());
            user_mongoose_1.UserMongoose.model.create(user)
                .onResolve(function (err, user) {
                err ? reject(new Error(err)) : resolve(user);
            });
        });
    };
    /**
     * Busca un usuario y si no lo encuentra, lo crea
     * @param {User} user
     * @returns {Promise<IUser>}
     */
    UserDAO.prototype.findOrCreate = function (user) {
        logger.debug("findOrCreate", user);
        return new Promise(function (resolve, reject) {
            user_mongoose_1.UserMongoose.model.findOne({
                _id: user.id
            })
                .exec()
                .then(function (userAux) {
                if (userAux) {
                    return resolve(userAux);
                }
                user_mongoose_1.UserMongoose.model.create(user.payload)
                    .onResolve(function (err, user) {
                    err ? reject(err) : resolve(user);
                });
            });
        });
    };
    /**
     * Busca un usuario y si lo encuentra lo actualiza
     * @param {User} user
     * @returns {Promise<IUser>}
     */
    UserDAO.prototype.findByIdAndUpdate = function (user) {
        logger.debug("findByIdAndUpdate", user);
        return new Promise(function (resolve, reject) {
            //para que la callback devuelva el objeto modificado 
            //es importante añadir el parámetro{new:true} ya que si no,
            //devuelve el objeto original 
            user_mongoose_1.UserMongoose.model.findByIdAndUpdate(user.id, user.payload, { new: true })
                .exec()
                .then(function (userAux) {
                if (userAux) {
                    return resolve(userAux);
                }
                return reject(new user_exceptions_1.UserNotExistError());
            });
        });
    };
    /**
     * Busca un usuario y si lo encuentra lo elimina
     * @param {string} id
     * @returns {Promise<IUser>}
     */
    UserDAO.prototype.findByIdAndRemove = function (id) {
        logger.debug("findByIdAndRemove", id);
        return new Promise(function (resolve, reject) {
            user_mongoose_1.UserMongoose.model.findByIdAndRemove(id)
                .exec()
                .then(function (userAux) {
                if (userAux) {
                    return resolve(userAux);
                }
                return reject(new user_exceptions_1.UserNotExistError());
            });
        });
    };
    UserDAO._instance = new UserDAO();
    return UserDAO;
})();
exports.UserDAO = UserDAO;

//# sourceMappingURL=user-dao.js.map
