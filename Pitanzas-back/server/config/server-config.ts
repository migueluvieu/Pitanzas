import * as express from 'express';
import * as routes  from './../routes/index';
import * as http from 'http';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as userController from './../routes/user-controller';
import * as log4js from 'log4js';
import {Constantes as _}  from './../common/constantes';

let logger = log4js.getLogger('server-config');


export let app = express();

//configuracion express, middleware y setters
app.set(_.PORT, process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//conecta logger con express para pintar los accesos 
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.get('/', routes.index);
app.use("/api/v1/users", userController.usersRouter);
// captura todos los errores procedentes de los middleware
app.use((err:Error, req: express.Request, res: express.Response, next: express.NextFunction)=> {
  logger.error(err.message);
  res.status(500);
  res.send( {
    error: err.message
  });
});





