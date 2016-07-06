var express = require('express');
var routes = require('./../routes/index');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userController = require('./../routes/user-controller');
var log4js = require('log4js');
var constantes_1 = require('./../common/constantes');
var logger = log4js.getLogger('server-config');
exports.app = express();
//configuracion express, middleware y setters
exports.app.set(constantes_1.Constantes.PORT, process.env.PORT || 3000);
exports.app.set('views', path.join(__dirname, 'views'));
exports.app.set('view engine', 'jade');
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: true }));
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, 'public')));
//conecta logger con express para pintar los accesos 
exports.app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
exports.app.get('/', routes.index);
exports.app.use("/api/v1/users", userController.usersRouter);
// captura todos los errores procedentes de los middleware
exports.app.use(function (err, req, res, next) {
    logger.error(err.message);
    res.status(500);
    res.send({
        error: err.message
    });
});

//# sourceMappingURL=server-config.js.map
