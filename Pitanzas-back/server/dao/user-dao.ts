
import * as mongoose from 'mongoose';
import * as log4js from 'log4js';
import {User} from './../models/user-model'; 
import {UserMongoose, IUser} from './../models/mongoose/user-mongoose';
import {UserExistError,UserNotExistError} from './../exceptions/user-exceptions';
import {AppConfig as config} from './../config/app-config';
import {Constantes as _ }  from './../common/constantes';

let logger = log4js.getLogger("user-dao");

export class UserDAO {

  private static _instance:UserDAO = new UserDAO();
  
   /**
     * Devuelve instancia de UserDAO. Singleton
     */
   constructor() {
    if(UserDAO._instance){
             throw(new Error(config.msg(_.ERR_USER_INSTANCIA)));
        }
        UserDAO._instance = this;
    }
    
    /**
     * Devuelve instancia de UserDAO. Singleton
     * @returns {UserDAO}
     */
   static getInstance():UserDAO {
        return UserDAO._instance;    
    }

    /**
     * Busca todos los usuarios
     * @returns {Promise <IUser[]>}
     */ 
   findAll(): Promise <IUser[]> {
    logger.debug("findAll");
    return new Promise <IUser[]> ((resolve, reject) => {            
      UserMongoose.model.find()
        .sort('-name') //order desc
        .exec()
        .onResolve((err, users) => {
          err ? reject(new Error(err)) : resolve(users);
        });
      })
    }
  
    /**
     * Busca un usuario
     * @param {string} _id
     * @returns {Promise <IUser>}
     */  
    findById(_id: string): Promise <IUser> {
      logger.debug("findById",_id);
      return new Promise <IUser > ((resolve, reject) => {         
        UserMongoose.model.findById(_id)
          .exec()
          .onResolve((err, user) => {
            err ? reject(err) : resolve(user);
          });
      })
    }

   /**
     * Busca un usuario
     * @param {string} _id
     * @returns {Promise <IUser>}
     */  
    findByName(filter:IUser): Promise <IUser> {
    logger.debug("findFilter",filter);
    return new Promise <IUser > ((resolve, reject) => {         
       UserMongoose.model.findOne({name:filter.name})
        .exec()
        .onResolve((err, user) => {
          err ? reject(err) : resolve(user);
        });
      })
    }

   /**
     * Crea un usuario
     * @param {string} _id
     * @returns {Promise <IUser>}
     */  
  create(user:IUser): Promise<IUser> {   
   logger.debug("create",user);
   return new Promise <IUser> ((resolve, reject) => { 
     if (user.id) reject(new UserExistError());
      UserMongoose.model.create(user)
        .onResolve((err, user) => {          
              err ?  reject(new Error(err)) : resolve(user);
          }); 
      });
     }
    /**
     * Busca un usuario y si no lo encuentra, lo crea
     * @param {User} user
     * @returns {Promise<IUser>}
     */
  findOrCreate(user:User): Promise<IUser> {   
   logger.debug("findOrCreate",user);
   return new Promise <IUser> ((resolve, reject) => {      
       UserMongoose.model.findOne({         
          _id: user.id
        })
        .exec()
        .then(
          userAux => {
            if (userAux) {
              return resolve(userAux);
            }

            UserMongoose.model.create(user.payload)
            .onResolve((err, user) => {          
              err ?  reject(err) : resolve(user);
            });
          })         
    });
    
  }

/**
 * Busca un usuario y si lo encuentra lo actualiza
 * @param {User} user
 * @returns {Promise<IUser>}
 */
findByIdAndUpdate(user:User): Promise<IUser> { 
   logger.debug("findByIdAndUpdate",user);  
   return new Promise <IUser> ((resolve, reject) => {      
     //para que la callback devuelva el objeto modificado 
     //es importante añadir el parámetro{new:true} ya que si no,
     //devuelve el objeto original 
       UserMongoose.model.findByIdAndUpdate(user.id, user.payload,{new:true})
        .exec()
        .then(
          userAux => {
            if (userAux) {
              return resolve(userAux);
            } 
            return reject(new UserNotExistError());
          })        
    });
    
  }

/**
 * Busca un usuario y si lo encuentra lo elimina
 * @param {string} id
 * @returns {Promise<IUser>}
 */
findByIdAndRemove(id:string): Promise<IUser> { 
   logger.debug("findByIdAndRemove",id);  
   return new Promise <IUser> ((resolve, reject) => {     
       UserMongoose.model.findByIdAndRemove(id)
        .exec()
        .then(userAux => {
          if (userAux) {
            return resolve(userAux);
          } 
          return reject(new UserNotExistError());
        });
    });
    
  }

}


