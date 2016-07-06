/**
 * @export
 * @class User
 */
var User = (function () {
    /**
     * Los datos del usuario quedarán encapsulados en la vble payload
     * @param {IUser} _payload
     */
    function User(_payload) {
        this._payload = _payload;
    }
    ;
    /**
     *
     * Build para obtener objeto User a partir de los parámetros
     * @static
     * @param {string} name
     * @param {number} age
     * @param {string} email
     * @returns {User}
     */
    User.build = function (name, age, email) {
        var aux = { name: name, age: age, email: email };
        return new User(aux);
    };
    ;
    /**
     *
     * Build para obtener objeto User a partir de un data
     * @static
     * @param {*} data
     * @returns {User}
     */
    User.buildFromBody = function (data) {
        return new User(data);
    };
    ;
    Object.defineProperty(User.prototype, "name", {
        //getters y setter
        get: function () {
            return this._payload.name;
        },
        set: function (name) {
            this._payload.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "age", {
        get: function () {
            return this._payload.age;
        },
        set: function (age) {
            this._payload.age = age;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._payload.email;
        },
        set: function (email) {
            this._payload.email = email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._payload._id;
        },
        set: function (id) {
            this._payload.id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "payload", {
        get: function () {
            return this._payload;
        },
        enumerable: true,
        configurable: true
    });
    return User;
})();
exports.User = User;

//# sourceMappingURL=user-model.js.map
