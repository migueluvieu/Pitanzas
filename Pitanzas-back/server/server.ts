
/// <reference path="./../typings/index.d.ts" />

import * as express from 'express';
import * as routes  from './routes/index';
import * as http from 'http';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as log4js from 'log4js';
import * as cluster  from 'cluster';
import * as os from 'os';
import {Constantes as _ }  from './common/constantes';
import {AppConfig as config} from './config/app-config';
import {app as serverConfig} from './config/server-config'; 



/**CONEXIONES EXTERNAS */

//logger configuracion
log4js.configure(path.join(__dirname,_.CONFIG_LOG_FILE));
let logger = log4js.getLogger("server");
logger.info("Configurando server para entorno", process.env.NODE_ENV || _.ENTORNO_DEV);

//conexion BBDD
mongoose.connect(config.key(_.MONGO_URL));
let db = mongoose.connection;
//Se captura en evento si hay error cuando se intenta conectar 
db.on('error',error=> {logger.error("Error al conectar BBDD", error);});
//se captura el evento open pero con el "once" (en vez de on) significa que solo ejecuta manejador la primera vez 
db.once('open', ()=> {logger.info("Conectado a la BBDD", config.key(_.MONGO_URL));});



/**
 * Ventajas de crear un cluster, 
 * leer http://alexfernandez.github.io/2013/modo-cluster.html
 * leer https://nodejs.org/api/cluster.html
 * Básicamente node es mono-procesador. El proceso del servidor se crea en un solo procesador desaprovechando 
 * el potencial de la máquina ya que hoy en día suelen tener ya varios núcleos. 
 * Al crear un cluster, podemos crear tantos procesos de creación de servidor (en realidad copias del proceso) como 
 * procesadores tenga la máquina, aumentando el rendimiento exponencialmente
 * un sencillo fork() crea una copia del proceso actual (en este caso nuetro proceso es la creación del servidor).
 * A partir de ese momento el primer proceso se convierte en maestro o master, 
 * y la copia en un trabajador o worker. (mi ordenador tiene 4 núcleos, creará 4 workers, cada uno con 
 * la copia del proceso de creación). Los 4 se quedan en espera por el puerto que se haya abierto (en mi caso el 3000) 
 * El propio node repartirá las peticiones entrantes entre los procesos que escuchan por el mismo puerto. Tiende a cargar 
 * más unos procesadores que otros, no es equitativo.  
 */
let numCPUs=os.cpus().length;

if (cluster.isMaster){
  // crea workers, uno por CPU que haya en el sistema
  for (var i = 0; i < numCPUs; i++){
    cluster.fork();
  }
 
} else {
    //En los workers (es decir, cluster.isMaster es falso) creamos un servidor HTTP:
    http.createServer(serverConfig).listen(serverConfig.get(_.PORT), () => {
        logger.info('Levantado server :: listening port ' + serverConfig.get(_.PORT), " => pid ", process.pid );
    });
}




