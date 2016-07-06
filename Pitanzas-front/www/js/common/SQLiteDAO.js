
	angular.module('DAOFactory',[])
		.service('SQLiteDAO', function ($q, $cordovaSQLite) {
    var self = this;
    var _db;

    self.db = function () {
        if (!_db) {
            if (window.sqlitePlugin !== undefined) {
             _db = window.sqlitePlugin.openDatabase({ name: "demo.db", location: 2, createFromLocation: 1 }); //device
            }else{
                _db = window.openDatabase("demo.db", '1.0', 'demo', 200000); // browser
                }
        }
        return _db;
    };
    
    self.getFirstItem = function (query, parameters) {
        var deferred = $q.defer();
        self.executeSql(query, parameters).then(function (res) {
            if(res.rows.length > 0)
                return deferred.resolve(res.rows.item(0));
            else
                return deferred.reject("There aren't items matching");
        }, function (err) {
            return deferred.reject(err);
        });

        return deferred.promise;
    };

    self.getFirstOrDefaultItem = function (query, parameters) {
        var deferred = $q.defer();
        self.executeSql(query, parameters).then(function (res) {
            if(res.rows.length > 0)
                return deferred.resolve(res.rows.item(0));
            else
                return deferred.resolve(null);
        }, function (err) {
            return deferred.reject(err);
        });

        return deferred.promise;
    };

    self.getItems = function (query, parameters) {
        var deferred = $q.defer();
        self.executeSql(query, parameters).then(function (res) {
            var items = [];
            for (var i = 0; i < res.rows.length; i++) {
                items.push(res.rows.item(i));
            }
            return deferred.resolve(items);
        }, function (err) {
            return deferred.reject(err);
        });

        return deferred.promise;
    };

  /**
   * Este método lanzaScript que se encuentran en queries.js. Por ejmplo estaría bien 
   * para parches y demás lo que pasa uqe habría que tener por ejemplo un flag en alguna tabla que indicase 
   * si hay que ejecutarlo en plan parche. Es una posibilidad
   */
    self.preloadDataBase = function (lanzarScriptInicial) {
        var deferred = $q.defer();
        if (lanzarScriptInicial) {
             console.log('%c ***************** Starting the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
            self.db().transaction(function (tx) {
                //preload es un js que contiene las queries que se lanzarán al principio
                for (var i = 0; i < window.preload.length; i++) {
                     console.log(window.preload[i]);
                    tx.executeSql(preload[i]);
                }
            }, function (error) {
                console.log("preload: "+error)
                deferred.reject(error);
            }, function () {
                 console.log('%c ***************** Completing the creation of the database in the browser ***************** ', 'background: #222; color: #bada55');
                deferred.resolve("OK");
            });
        }
        else {
            deferred.resolve("OK");
        }

        return deferred.promise;
    };

    self.executeSql = function (query, parameters) {
        return $cordovaSQLite.execute(self.db(), query, parameters);
    };
});