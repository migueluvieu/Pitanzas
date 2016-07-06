angular.module('AlimentoModule')

.factory('AlimentoDAO',  function ($q, SQLiteDAO) {
    var self=this;
 
        self.getAlimentos = function (tipo ) {
            var query = 'SELECT * FROM Alimentos where tipo= ?;';
            return $q.when(SQLiteDAO.getItems(query,[tipo]));
        },
        self.addAlimento = function (alimento) {
            var query = "INSERT INTO Alimentos (nombre,marcado, tipo) VALUES (?, ?,?);";
            return $q.when(SQLiteDAO.executeSql(query, [ alimento.nombre, alimento.marcado,parseInt(alimento.tipo)]));
        },
        self.deleteAlimentos =  function (listaId) {
            var query = "DELETE FROM Alimentos WHERE ID IN ("+listaId.toString()+");";
            return $q.when(SQLiteDAO.executeSql(query));
        },
        self.updateAlimento =  function (alimento) {
            var query = "UPDATE Alimentos SET nombre =?, marcado=?, tipo=? WHERE ID =? ;";
            return $q.when(SQLiteDAO.executeSql(query, [ alimento.nombre, alimento.marcado, alimento.tipo, alimento.id]));
        },
        self.dropTable = function () {
            var query = 'DROP TABLE IF EXISTS Alimentos;';
            return $q.when(SQLiteDAO.executeSql(query));
        },
        self.createTable = function () {
            var query = 'CREATE TABLE IF NOT EXISTS Alimentos (id integer primary key autoincrement, nombre text not null, tipo integer not null,marcado integer  not null);';
            return $q.when(SQLiteDAO.executeSql(query));

        }
  

    return self;
});