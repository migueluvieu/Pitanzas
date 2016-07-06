import * as express from "express";
import {UserService} from "../services/user-service";
import {User} from "../models/user-model";
import {IUser} from './../models/mongoose/user-mongoose';
import * as log4js from 'log4js';

export let usersRouter = express.Router();

let logger = log4js.getLogger("user-controller");

// obtenemos instancia nuestro servicio
const userService: UserService = UserService.getInstance();

/**
 * Entraría por get con /users 
 */
usersRouter.route('/')

.get( (req: express.Request, res: express.Response, next: express.NextFunction)=> {
   userService.getUsers()
    .then(_listUsers=>{res.send(JSON.stringify(_listUsers));})
    .catch(error =>{return next(error)});
})

.post ( (req: express.Request, res: express.Response, next: express.NextFunction)=> {
  let user:User = User.buildFromBody(req.body);
  userService.saveUser(user)
    .then(_user=>{res.send(JSON.stringify(_user));})
    .catch(error =>{return next(error)});

  /* Si el service se implementa con callback y no con Promise , se haría así la invocación 
   userService.saveUser(user,(userAux:IUser, error:Error)=>{
       if (error){next(error);return;}
        res.send(JSON.stringify(userAux)); 
   });*/ 
}) 

.put ( (req: express.Request, res: express.Response, next: express.NextFunction)=> {
   let user:User = User.buildFromBody(req.body);
   userService.updateUser(user)
    .then(_user=>{res.send(JSON.stringify(_user));})
    .catch(error =>{return next(error)});
}) 


usersRouter.route('/:id')

.get( (req: express.Request, res: express.Response, next: express.NextFunction)=> { 
    userService.getUser(req.params.id) 
     .then(_user=>{res.send(JSON.stringify(_user));})
     .catch(error =>{return next(error)});
}) 

.delete( (req: express.Request, res: express.Response, next: express.NextFunction)=> { 
   userService.deleteUser(req.params.id )
    .then(_user=>{res.send(JSON.stringify(_user));})
    .catch(error =>{return next(error)});
}) 

;


