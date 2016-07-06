/// <reference path="./../typings/index.d.ts" />
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var log4js = require('log4js');
var cluster = require('cluster');
var os = require('os');
var constantes_1 = require('./common/constantes');
var app_config_1 = require('./config/app-config');
var server_config_1 = require('./config/server-config');
/**CONEXIONES EXTERNAS */
//logger configuracion
log4js.configure(path.join(__dirname, constantes_1.Constantes.CONFIG_LOG_FILE));
var logger = log4js.getLogger("server");
logger.info("Configurando server para entorno", process.env.NODE_ENV || constantes_1.Constantes.ENTORNO_DEV);
//conexion BBDD
mongoose.connect(app_config_1.AppConfig.key(constantes_1.Constantes.MONGO_URL));
var db = mongoose.connection;
//Se captura en evento si hay error cuando se intenta conectar 
db.on('error', function (error) { logger.error("Error al conectar BBDD", error); });
//se captura el evento open pero con el "once" (en vez de on) significa que solo ejecuta manejador la primera vez 
db.once('open', function () { logger.info("Conectado a la BBDD", app_config_1.AppConfig.key(constantes_1.Constantes.MONGO_URL)); });
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
var numCPUs = os.cpus().length;
if (cluster.isMaster) {
    // crea workers, uno por CPU que haya en el sistema
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
}
else {
    //En los workers (es decir, cluster.isMaster es falso) creamos un servidor HTTP:
    http.createServer(server_config_1.app).listen(server_config_1.app.get(constantes_1.Constantes.PORT), function () {
        logger.info('Levantado server :: listening port ' + server_config_1.app.get(constantes_1.Constantes.PORT), " => pid ", process.pid);
    });
}

//# sourceMappingURL=server.js.map
