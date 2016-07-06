import {User} from './../../models/user-model'
import {IUser} from './../../models/mongoose/user-mongoose';
import * as log4js from 'log4js';
import * as validator from 'validator';
import {AppConfig as config} from './../../config/app-config';
import {Constantes as _ }  from './../../common/constantes';


let logger = log4js.getLogger("validations/user-service");

/**
 * Clase que valida los campos y realiza las transformaciones y normalizaciones necesarias 
 * de cada método del servicio UserService 
 * @export
 * @class UserServiceValidation
 */
export class UserServiceValidation {
     private static _instance:UserServiceValidation = new UserServiceValidation();
     
    /**
     * Devuelve instancia de UserServiceValidation. Singleton
     */
   constructor() {
    if(UserServiceValidation._instance){
             throw(new Error(config.msg(_.ERR_USER_INSTANCIA)));
        }
        UserServiceValidation._instance = this;
    }
    
    /**
     * Devuelve instancia de UserServiceValidation. Singleton
     * @static
     * @returns {UserService}
     */
    static getInstance():UserServiceValidation {
        return UserServiceValidation._instance;    
    }
     
     /**
      * 
      * Valida los parámetros del método getUser
      * @param {string} id
      * @returns {string} id
      */
     getUser(id:string){
        logger.debug("getUser"); 
         if (!validator.isMongoId(id)){
             throw(new Error(config.msg(_.ERR_USER_FORMAT_ID)));
         }       
     }
      
     /**
      * Valida parámetros método saveUser del service
      * @param {IUser} user
      * @returns {IUser}
      */ 
     saveUser(user:IUser){
        logger.debug("saveUser");        
        //validaciones
        if (validator.isNull(user.name)){
            throw(new Error(config.msg(_.ERR_USER_REQ_NOMBRE)));
        } 
        if (validator.isNull(user.email)){
            throw(new Error(config.msg(_.ERR_USER_REQ_EMAIL)));
        }
        //Este validator solo aplica sobre string...
        if (user.age==null){
            throw(new Error(config.msg(_.ERR_USER_REQ_AGE)));
        }

        if (!validator.isNumeric(user.age.toString())){
            throw(new Error(config.msg(_.ERR_USER_FORMAT_AGE)));
        }
        
        if (!validator.isEmail(user.email)){
            throw(new Error(config.msg(_.ERR_USER_FORMAT_EMAIL)));
        }                         
        //pipes, transformamos/normalizamos datos
        user.name = validator.trim(user.name).toLowerCase();
        user.email = validator.trim(user.email).toLowerCase();
     }   
      
      /**
       * Valida parámetros método updateUser del service 
       * @param {User} user
       * @returns {User}
       */
      updateUser(user:User){
        logger.debug("updateUser");        
            //validaciones           
        if (validator.isNull(user.id)){
            throw(new Error(config.msg(_.ERR_USER_REQ_ID)));
          } 
        if (!validator.isMongoId(user.id)){
            throw(new Error(config.msg(_.ERR_USER_FORMAT_ID)));
          }
        if (validator.isNull(user.name)){
            throw(new Error(config.msg(_.ERR_USER_REQ_NOMBRE)));
          } 
        //Este validator solo aplica sobre string...
        if (user.age==null){
            throw(new Error(config.msg(_.ERR_USER_REQ_AGE)));
        }

        if (!validator.isNumeric(user.age.toString())){
            throw(new Error(config.msg(_.ERR_USER_FORMAT_AGE)));
        }
        if (validator.isNull(user.email)){
             throw(new Error(config.msg(_.ERR_USER_REQ_EMAIL)));
          }
        if (!validator.isEmail(user.email)){
            throw(new Error(config.msg(_.ERR_USER_FORMAT_EMAIL)));
          }                         
        //pipes, transformamos/normalizamos datos
        user.name = validator.trim(user.name).toLowerCase();
        user.email = validator.trim(user.email).toLowerCase();
     }  

     deleteUser(id:string){
        logger.debug("deleteUser");
         if (!validator.isMongoId(id)){
             throw(new Error(config.msg(_.ERR_USER_FORMAT_ID)));
         }      
     }


}
