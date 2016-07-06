var express = require("express");
var user_service_1 = require("../services/user-service");
var user_model_1 = require("../models/user-model");
var log4js = require('log4js');
exports.usersRouter = express.Router();
var logger = log4js.getLogger("user-controller");
// obtenemos instancia nuestro servicio
var userService = user_service_1.UserService.getInstance();
/**
 * Entraría por get con /users
 */
exports.usersRouter.route('/')
    .get(function (req, res, next) {
    userService.getUsers()
        .then(function (_listUsers) { res.send(JSON.stringify(_listUsers)); })
        .catch(function (error) { return next(error); });
})
    .post(function (req, res, next) {
    var user = user_model_1.User.buildFromBody(req.body);
    userService.saveUser(user)
        .then(function (_user) { res.send(JSON.stringify(_user)); })
        .catch(function (error) { return next(error); });
    /* Si el service se implementa con callback y no con Promise , se haría así la invocación
     userService.saveUser(user,(userAux:IUser, error:Error)=>{
         if (error){next(error);return;}
          res.send(JSON.stringify(userAux));
     });*/
})
    .put(function (req, res, next) {
    var user = user_model_1.User.buildFromBody(req.body);
    userService.updateUser(user)
        .then(function (_user) { res.send(JSON.stringify(_user)); })
        .catch(function (error) { return next(error); });
});
exports.usersRouter.route('/:id')
    .get(function (req, res, next) {
    userService.getUser(req.params.id)
        .then(function (_user) { res.send(JSON.stringify(_user)); })
        .catch(function (error) { return next(error); });
})
    .delete(function (req, res, next) {
    userService.deleteUser(req.params.id)
        .then(function (_user) { res.send(JSON.stringify(_user)); })
        .catch(function (error) { return next(error); });
});

//# sourceMappingURL=user-controller.js.map
