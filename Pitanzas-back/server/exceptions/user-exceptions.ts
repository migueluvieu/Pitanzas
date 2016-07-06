import {AppConfig as config} from './../config/app-config';
import {Constantes as _ }  from './../common/constantes';
import * as log4js from 'log4js';

let logger = log4js.getLogger("user-exception");

export class UserExistError implements Error{
    public message; 
    public name;
    constructor () {
      this.message=config.msg(_.ERR_USER_EXIST);
      this.name = _.ERR_USER_EXIST;
    }
}

export class UserNotExistError implements Error{
    public message; 
    public name;
    constructor () {
      this.message=config.msg(_.ERR_USER_NO_EXIST);
      this.name = _.ERR_USER_NO_EXIST;
    }
}