var preload = [
    //queries que se llamarán al entrar en la aplicación, como por ejemplo al inicio el create table, inserts,..
    //habría que poner un true en el app.js cuando se invoca a sqliteService.preloadDataBase(true); 
    //"DROP TABLE IF EXISTS Alimentos;", 
    
    "CREATE TABLE IF NOT EXISTS Alimentos (id integer primary key autoincrement, nombre text not null, tipo integer not null, marcado integer not null);"

 // "INSERT INTO Alimentos

];