var mongoose = require('mongoose');
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
var _schema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: String
    },
    email: {
        type: String
    }
}, {
    //al poner esto, automáticamente se crean dos nuevos campos al esquema, fechas de auditoría createdAt and updatedAt. 
    //Al hacer save, las fechas se añaden automáticamente (depende si insertar-actualizar)
    //se puede consultar http://mongoosejs.com/docs/guide.html#timestamps
    timestamps: true
});
/* esto son "triggers" que se pueden añadir
  .pre('save', function(next) {
  this.updated = new Date();
  next();
});*/
/**
 * Mongoose.Mode. Se define la vble _model como modelo de moongose
 * pero tipado con IUser (interface que a su vez extiende de mongoose.Document)
 * Así el _model.find() y demás, el onResolve ya devolverá un IUser
 * @type {Model<IUser>}
 * @private
 */
var _model = mongoose.model('Customer', _schema);
/**
 *
 * Se encapsula la vble model que utilizaremos en el DAO
 * @export
 * @class UserMongoose
 */
var UserMongoose = (function () {
    function UserMongoose() {
    }
    Object.defineProperty(UserMongoose, "model", {
        get: function () {
            return _model;
        },
        enumerable: true,
        configurable: true
    });
    return UserMongoose;
})();
exports.UserMongoose = UserMongoose;

//# sourceMappingURL=user-mongoose.js.map
