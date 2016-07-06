import {User} from './../models/user-model'
import {UserDAO} from "./../dao/user-dao";
import {IUser} from './../models/mongoose/user-mongoose';
import {UserServiceValidation} from './validations/user-service';
import * as log4js from 'log4js';
import {UserExistError, UserNotExistError} from './../exceptions/user-exceptions';
import {AppConfig as config} from './../config/app-config';
import {Constantes as _ }  from './../common/constantes';

let logger = log4js.getLogger("user-services");


/**
 * Clase que gestiona la lógica de negocio sobre entidad usuario  
 * @export
 * @class UserService
 */

export class UserService {

  private static _instance:UserService = new UserService();
  
  private _validateAndPipe:UserServiceValidation = UserServiceValidation.getInstance();

  private _userDAO:UserDAO = UserDAO.getInstance();
     
   /**
     * Devuelve instancia de UserService. Singleton.
     */
   constructor() {
    if(UserService._instance){
             throw(new Error(config.msg(_.ERR_USER_INSTANCIA)));
        }
        UserService._instance = this;
    }
    
    /**
     * Devuelve instancia de UserService. Singleton
     * @static
     * @returns {UserService}
     */
    static getInstance():UserService {
        return UserService._instance;    
    }

     /**
      * Obtiene todos los usuarios
      * @param {(user: IUser, error:Error) => void} callback funciòn callback 
      * cuya funcionalidad estará la invocación desde controller
      */     
     getUsers(): Promise<IUser[]>{
        logger.debug("getUsers"); 
        return new Promise<IUser[]>((resolve,reject)=>{       
            this._userDAO.findAll().then(
                data=>{resolve(data)},
                err =>{reject(err)}   
            ); 
         })      
     }
    
    /** 
     * Obtiene un usuario a partir de su id
     * @param {string} id
     * @param {(user: IUser, error:Error) => void} callback funciòn callback 
     * cuya funcionalidad estará la invocación desde controller
     */
     getUser(id: string): Promise<IUser>{
        logger.debug("getUser");         
        return new Promise<IUser>((resolve, reject)=>{
            //se valida entrada y normaliza. Es promise la validación
             this._validateAndPipe.getUser(id);
             this._userDAO.findById(id)
              .then(user => {
                    if (user===null){throw new UserNotExistError();}
                    else {resolve(user) } 
                 })                 
              .catch(err => { reject(err) });
             }
         );
     } 

     /** 
      * Busca un usuario por nombre y si no lo encuentra lo inserta en BBDD 
      * @param {User} user
      * @returns {Promise<IUser>}
      */   
     saveUser(user: User): Promise<IUser> {
         logger.debug("saveUser");
         return new Promise<IUser>((resolve, reject) => {
             this._validateAndPipe.saveUser(user.payload);
             this._userDAO.findByName((user.payload)) 
              .then((_user) =>{ 
                 // si no hay usuario con ese nombre, se crea. 
                 //ojo, solo puede/debe hacer return de promise, por eso el error se lanza
                 if (_user===null) {return this._userDAO.create(user.payload)}
                 else {throw new UserExistError();} 
                  }) 
              .then( (_user) => resolve(_user))      
              .catch(err => { reject(err) });
          }
         );
     }
  

     /**
     * Busca el usuario por id y lo actualiza con los datos enviados 
     * @param {User} user
     * @returns {Promise<IUser>}
     */
     updateUser(user:User): Promise<IUser>{
        logger.debug("updateUser");
        return new Promise<IUser>((resolve,reject)=>{
          this._validateAndPipe.updateUser(user)         
          this._userDAO.findByIdAndUpdate(user)   
          .then(data => { resolve(data) })                 
          .catch(err => { reject(err) });
         })     
     }
     
   /**
     * Busca el usuario por id y lo elimina
     * @param {string} id
     * @returns {Promise<IUser>}
     */
     deleteUser(id:string): Promise<IUser>{
        logger.debug("deleteUser");
         return new Promise<IUser>((resolve,reject)=>{
         this._validateAndPipe.deleteUser(id)
         this._userDAO.findByIdAndRemove(id) 
         .then(data => { resolve(data) })                
         .catch(err => { reject(err) });
         })        
      }
  
    /**
      * Este sería el saveUser pero con callback en vez de promises, para ver otra posibilidad.
      * recibeuna función que llamaremos callback y que se le pasará desde el controller.
      * Será una función callback cuyo contenido estará en el controller (normalmente será el envío del resultado en JSON)
      * mirar la llamada del controller:
            userService.getUsers( 
                     (userList)=>{
                       res.send(JSON.stringify(userList)); 
                    }
            ); 
      * La callback recibirá el resultado de esta función es decir, en este
      * caso será la lista de usuarios resultantes del findAll().  
      */
 /*
    saveUser(user:User,callback: (user: IUser, error:Error) => void): void{
        logger.debug("saveUser"); 
            // validamos los parámetros que recibe la función
        this._validateAndPipe.saveUser(user)
         .then(
            (_user)=>{
                //si se ha validado, se aplica negocio.
                 UserDAO.findOrCreate(user).then(
                (data)=>{callback(data, null)},
                (err) =>{callback(null,err)});
                })
          .catch((err) =>{callback(null,err)}
          )        
     }   
*/

}
