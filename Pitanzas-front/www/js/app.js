// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//var _db;

angular.module('starter', ['ionic','AlimentoModule','ion-floating-menu','ngCordova','DAOFactory'])

//SQLiteDAO servicio de mi DAOFactory
.run(function($ionicPlatform,$cordovaSQLite,SQLiteDAO) {
  
  $ionicPlatform.ready(function() {
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

 });


 //true->ejecuta el queries.js-> cuando hay que modificar las tablas...
 //false no
    SQLiteDAO.preloadDataBase(true);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  
  //hay varias directivas que en nativo de android y de ios funcionan diferente.
  //por ejemplo las tabs en android se sitúan siempre arriba, así que se les 
  //puede configurar para ambas plataf con el configurador de ionic
    $ionicConfigProvider.tabs.position('top'); 
    
  //vista principal de la aplicación
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

   

 ;

   $locationProvider.html5Mode(true); 

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard_casa');

   
});
