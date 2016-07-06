
angular.module('AlimentoModule', [])



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  //No es necesario hacerla abstract
  .state('app.dashboard_casa', {
      url: '/dashboard_casa',
      views: {
        'menuContent': {
          templateUrl: 'templates/casa/dashboard_casa.html'
        }/*,
        'home-tab@app.dashboard_casa': {
          templateUrl: "templates/browse.html"
         },
         'about-tab@app.dashboard_casa': {
          templateUrl: "templates/search.html"
         }*/
      }
    })
    
    .state('app.dashboard_casa.lista_compra', {
     url: '/lista_compra',
      views: {
          'compra-tab': {
            templateUrl: 'templates/casa/lista_compra.html',
            controller:'AlimentoManager',
            resolve: {
                tipoFromResolve: ()=>{return 0}
                }
          }      
      }
    })  

    
     .state('app.dashboard_casa.lista_comidas', {
     url: '/lista_comidas',
      views: {
          'comida-tab': {
            templateUrl: 'templates/casa/lista_compra.html',
            controller:'AlimentoManager',
            resolve: {
                tipoFromResolve: ()=>{return 1}
                }
          }
      }
    }) 
    
    .state('app.dashboard_casa.lista_cenas', {
     url: '/lista_cenas',
      views: {
        'cena-tab': {
          templateUrl: 'templates/casa/lista_compra.html',
            controller:'AlimentoManager',
            resolve: {
                tipoFromResolve: ()=>{return 2}
                }
        }
      }
    }) 
  ;
  

});





