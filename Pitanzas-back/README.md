 
 # Lista de tareas NodeJS 
 Api Rest desarrollada en NodeJS(typescript) contra MongoDB
 
 ## Deploy

Se levanta servidor, transpilación de ts y reload con gulp (ponmeindo la tarea. Si no se pone nada, se tira la default)

`gulp  o `gulp debug (para modo debug)


ó tambien se puede ejecutar con npm (referenciado a los scripts definidos en package.json)
`npm run gulp  o 'npm run gulp_debug 

Hay estos scripts definidos:
 "scripts": {
    "start": "node deploy/server/server.js",
    "gulp": "./node_modules/.bin/gulp",
    "gulp_debug": "./node_modules/.bin/gulp debug",
    "transpilacion": "./node_modules/.bin/gulp build"
  }

    `npm run start => simplemente levanta el servidor, ejecuta el server.js. Sería ya para prod
      * leer apartado de variables de entorno, por el tema de process.env.NODE_ENV y process.env.PORT
    `npm run gulp (o `gulp)=> crea la carpeta deploy, transpila ts, inicia livereload, levanta servidor con nodemon
    `npm run gulp_debug (o ´gulp debug) => crea la carpeta deploy, transpila ts, inicia livereload, levanta servidor con nodemon en modo debug
    `npm run transpilacion(o gulp build )=> transpila los ts 

Para entorno producción tiraríamos el script start aumque con tema de VARIABLES DE ENTORNO 
    `npm run start

El despliegue está en la carpeta deploy. Allí estarán los js resultantes de la transpilación.


## Variables de entorno

Se pueden definir/utilizar vbles de entorno y leerlas en node con process.env
Un ejemplo, definir si estamos en producción: 
En windows primero haríamos 
    `SET NODE_ENV = PROD
    `SET PORT = 3256
    `npm run start (o gulp, gulp debug,...)
En linux directamente
    `NODE_ENV=PROD PORT=3256 npm run start (o gulp, gulp debug,...)   
(si linux-> export NODE_ENV=production)
y luego en node podemos referenciarlo con process.env.NODE_ENV
lo típico para cargar properties en función del entorno


/**** INSTALACION DE LOS *.d.ts   ******//
Los .d.ts son las definiciones en typescript de los módulos js (express, mongodb,..) necesarias.

Primero hacemos las instalaciones de los módulos con el npm como el express, el mongo y luego 
hay que instalar los *.d.ts Las almacenamos en la carpeta typings
nos ponemos en raiz del proyecto y vamos ejecutando:

typings install dt~morgan --global --save

-> nos crea la carpeta typings/global/morgan, y añade el morgan.d.ts, un index.d.tsd y un index.d.ts general 
donde va añadiendo todas las referencias que vayamos instalando. Y con el --save se van guardando las referencias en index.d.ts 

seguimos:
typings install dt~express --global --save
typings install dt~node --global --save
typings install dt~mongodb --global --save
...

## Configuración
La configuración está en un fichero externo en la carpeta raiz/config. 
Hay un fichero por entorno:
raiz
   config
     app-config-dev.json
     app-config-prod.json

y el gulp ya coge uno u otro en función de la vble de entorno process.env.NODE_ENV. 
Leer apartado VARIABLES DE ENTORNO. Valores posibles (PROD o DEV).
El fichero lo lleva a la carpeta server/config con el nombre app-config.json y lo lleva a deploy

/*** LOG4JS ****/
Se utiliza log4js para los logs (https://github.com/nomiddlename/log4js-node). 
  La configuración está en server/config/log4js.json. Se definen 4 appender:
 - consola=> pinta todo los logger.info, logger.debug, logger.error,..  por consola
 - access.log => almacena todos los accesos (GET,POST,..)  
 - errors.log =>almacena todos los logger.error
 - app.log => almacena todo, accesos, logger.info, logger.debug, logger.error
 * se define en todos los appender la rotación, permitiendo solo 3 logs (va borrando), un max de 10 mb y cuando pasa de 10MB, renombra el fichero con la fecha
otro 

## Debug VS Code

Al hacer las transpilación de ts a js, se genera la carpeta deploy donde están los archivos generados y que será lo que se 
suba a prod. Ahora para hacer debug de los ts hay que crear sourcemaps (mirar el gulpfile.js, tarea typescript).
En la tanspilación se genera por cada ts-> un js y un js.map. El js.map contiene un churro que se supone que es el código del ts. 
eso es el sourcemap del ts. 
Para trazarlo , tengo pendiente ver qué pasa porque no funciona bien, al final con una ñapa pude hacer un apaño.
La cosa es que hay que arrancar el debugger. Para ello, lo primero e importante, abrir el visualcode solo con el proyecto.
en raíz de proyecto hay una carpeta .vscode. Aquí contiene el launch.json el cual tiene la config para hacer un launch o un attach
de la aplicación. Cuando se va al view-debugger, el combo que aparece sería los launcher que estén añadidos en este fichero
por eso lo bueno es que solo se abra la carpeta del proyecto para que caza solo los launcher del proyecto.

Ahora mismo contiene esto:
{
    "version": "0.2.0",
    "configurations": [    
         {
             //para poder depurar js es imprescindible generar sourcemaps e indicarle el outdir. PAra
             //ello se utiliza el gulp-sourcemaps en el gulp. Si no, no debugea
             /*
              * Para hacer attach, primero hay que generar las sourcemaps que en realidad es 
              * el código ts que se escribe en el .map generado (churro) Por ello hay que arrancar primeor 
              * la aplicación en debug (el gulpfile está preparado, se ejecutaría gulp debug en prompt)
              * Se genran las sourcemap en el gulpfile (mirar la tarea typescript creada)
              * y finalmente ejecutamos este launcher.
              */
            "name": "ATTACH GettingStartedNodeJs",
            "type": "node",
            "request": "attach",
            "port": 5858,
            "stopOnEntry": true,
            "smartStep": true,
            //significa que hay sourcemaps generadas, en outDir le decimos donde se generan (carpeta deploy)
            "sourceMaps": true,
            "outDir": "${workspaceRoot}/deploy/server"
        },{
            //para poder depurar js es imprescindible tener activadas las sourcemaps e indicarle el outdir. PAra
             //ello se utiliza el gulp-sourcemaps en el gulp. Si no, no debugea
            "name": "Launch GettingStartedNodeJs",
            "type": "node",
            "request": "launch",
            //este será el comando que quiero que se lance, en este caso el programa,
           // "program": "${workspaceRoot}/deploy/server/app.js",
           "program": "${workspaceRoot}/deploy/server/dao/user-dao.js",
            "stopOnEntry": true,
            "args": [],
            "cwd": "${workspaceRoot}",
            //esta tarea se define en el task.json que está en .vscode
            //"preLaunchTask": "Build debug local",
            "runtimeExecutable": null,
            "runtimeArgs": [
                "--nolazy"
            ],
            "env": {
                "NODE_ENV": "development"
            },
            "externalConsole": false,
            "sourceMaps": true,
            "outDir": "${workspaceRoot}/deploy/server"
        }
    ]
}






