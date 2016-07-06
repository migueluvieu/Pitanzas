var Constantes = (function () {
    function Constantes() {
    }
    Object.defineProperty(Constantes, "CONFIG_LOG_FILE", {
        get: function () { return "./config/log4js.json"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "MONGO_URL", {
        get: function () { return "MONGO_URL"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ENTORNO_DEV", {
        get: function () { return "DEV"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ENTORNO_PROD", {
        get: function () { return "PROD"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "PORT", {
        get: function () { return "port"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_EXIST", {
        /***** Errores usuario ****/
        get: function () { return "user.err.existe"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_NO_EXIST", {
        get: function () { return "user.err.noExiste"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_FORMAT_ID", {
        get: function () { return "user.err.format.id"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_REQ_NOMBRE", {
        get: function () { return "user.err.req.name"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_REQ_EMAIL", {
        get: function () { return "user.err.req.email"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_REQ_ID", {
        get: function () { return "user.err.req.id"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_FORMAT_EMAIL", {
        get: function () { return "user.err.format.email"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_REQ_AGE", {
        get: function () { return "user.err.req.age"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_FORMAT_AGE", {
        get: function () { return "user.err.format.age"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constantes, "ERR_USER_INSTANCIA", {
        get: function () { return "user.err.instancia"; },
        enumerable: true,
        configurable: true
    });
    return Constantes;
})();
exports.Constantes = Constantes;

//# sourceMappingURL=constantes.js.map
