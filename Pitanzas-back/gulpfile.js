var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  ts = require('gulp-typescript'),
  rename = require("gulp-rename")
  del = require('del'),
  runSequence = require('run-sequence');

let _debug=false;

// SERVER
gulp.task('clean', ()=>{
    return del('deploy');
});

// SERVER

/**
 * simplemente marca la vble debug para arrancar el modo debug
 */
gulp.task('setDebug', ()=>{
    this._debug=true;

});

/**
 * Se comprueban los cambios en todos lo .ts de /server. Si hay cambios, se transpila a js
 * tarea typescript
 */
gulp.task('watch', ()=> {
  gulp.watch('./server/**/*.ts', ['typescript']);
});

/**
 * Transpilación de ts a js=> los js se llevan a carpeta deploy
 */

gulp.task('typescript', ()=> {
  //se cogen las propiedades de tsconfig.json por ello
  //se crea un proyecto y se ejecutará el ts con esta configuración
  var tsProject = ts.createProject('./tsconfig.json');
  return gulp.src(['server/**/*.ts'])
    //con esto creamos las sourcemaps, que es el churro que se añade al final de cada js transpilado
    //y que gracias a esto luego podemos debugear los ts
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject)).js
    //.pipe(concat('app.js'))//con este pipe lo que se hace es concatenar todos los js resultantes en el archivo app.js
    .pipe(sourcemaps.write('.')) 
    .pipe(gulp.dest('./deploy/server'))
});

//se llevan las vistas a deploy
gulp.task('views', ()=> {
  gulp.src('views/**/*').pipe(gulp.dest('deploy/server/config/views'))
});


gulp.task('copy_config_server', ()=> {
  let fichero="";
  switch(process.env.NODE_ENV){
        case 'DEV':
            fichero="app-config-dev.json";
            break;
        case 'PROD':
            fichero="app-config-prod.json";
            break;
        default:
            fichero="app-config-dev.json";
            break;
    }
      
      del('server/config/app-config.json');
       return  gulp.src("config/"+fichero)
          .pipe(rename("app-config.json"))
          .pipe(gulp.dest('server/config'));
    });

 gulp.task('copy_config',['copy_config_server'], ()=> {        
        // gulp.src(["server/config/app-config.json","server/config/log4js.json","server/config/app-messages.json"])
          gulp.src('server/config/*.json')
          .pipe(gulp.dest('deploy/server/config'));

    });   

gulp.task('build', ['typescript','views','copy_config']);

//se lleva el package.json y el Procfile para heroku
gulp.task('deploy', ['build'], ()=> {
  return gulp.src(['package.json', 'Procfile'])
    .pipe(gulp.dest('./deploy'));
});

/**
 * Ejecuta el livereload para hacer reload del servidor si hay cambios 
 * rutas definidas en nodemosn.watch  
 */
gulp.task('serve', ()=> {
  livereload.listen();
  //nodemon es un plugin que hace reload servidor (lanza app.js que indicamos script)
  nodemon({
    //arrancamos en modo debug
     exec: this._debug ? 'node --debug':'node',
    script: './deploy/server/server.js',
    //extensiones que moverá al servidor
    ext: 'js ejs'
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed();
    }, 500);
  });
});

//tarea final, si ejecutamos gulp sin args, tira esta

gulp.task('default', (callback)=>{
  //con el run secuence se ejecutan por orden y esperando cada una que se complete la siguiente
    runSequence('clean','build','watch','serve', callback);
});

gulp.task('debug', (callback)=>{
  //con el run secuence se ejecutan por orden y esperando cada una que se complete la siguiente
    runSequence('clean','build','watch','setDebug','serve', callback);
});