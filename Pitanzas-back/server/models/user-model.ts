
import {IUser} from './../models/mongoose/user-mongoose';

/**
 * @export
 * @class User
 */
export class User {

 /**
  * Los datos del usuario quedarán encapsulados en la vble payload 
  * @param {IUser} _payload
  */
  constructor(private _payload: IUser) {
  };

/**
 * 
 * Build para obtener objeto User a partir de los parámetros
 * @static
 * @param {string} name
 * @param {number} age
 * @param {string} email
 * @returns {User}
 */
static build (name:string, age:number, email:string):User {    
    let aux: any= {name:name, age:age,email:email} ;
    return new User(aux);
  };

  /**
   * 
   * Build para obtener objeto User a partir de un data
   * @static
   * @param {*} data
   * @returns {User}
   */
static buildFromBody (data:any):User { 
    return new User(data);
  };


 //getters y setter
  get name(): string {
    return this._payload.name;
  }

  get age(): number {
    return this._payload.age;
  }

  get email(): string {
    return this._payload.email;
  }

  get id(): string {
    return this._payload._id;
  }

  set name(name:string)  {
    this._payload.name = name;
  }

  set age(age:number)  {
    this._payload.age = age;
  }

  set email(email:string)  {
    this._payload.email = email;
  }
  
   set id(id:string)  {
    this._payload.id = id;
  }

  get payload():IUser{
    return this._payload;
  }


}


