
import * as mongoose from 'mongoose';

/**
 * Lo más importante, se mantiene una vble  _model de tipo modelo de moongose tipado a IUser  
 *  var _model = mongoose.model <IUser> ('Customer', _schema);
 * de tal forma que cuando se haga el _model.find() y demás, el onResolve ya devolverá un IUser. Todo esto es gracias a que 
 * la interface extiende de mongoose.Document
 * Atacamos a mongo a través de la vble _model
 */

/**
 * 
 * Interface para conectar nuestro modelo con el modelo mongoose.
 * Es necesario que extienda de mongoose.Document para luego poder
 * tipificar con ella el modelo (mongoose.Model<IUser> en módulo user-mongoose)
 * @export
 * @interface IUser
 * @extends {mongoose.Document}
 */
export interface IUser extends mongoose.Document {
   _id:string;
   name: string;
   age: number;
  email: string;
}

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
var _schema: mongoose.Schema = new mongoose.Schema({
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
  })
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
 var _model:mongoose.Model<IUser> = mongoose.model <IUser> ('Customer', _schema);


/**
 * 
 * Se encapsula la vble model que utilizaremos en el DAO
 * @export
 * @class UserMongoose
 */
export class UserMongoose{
  static get model ():mongoose.Model<IUser>{
    return _model;
  }
}



