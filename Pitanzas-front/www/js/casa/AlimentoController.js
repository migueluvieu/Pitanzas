
angular.module('AlimentoModule')

.controller('AlimentoManager',function($scope,$ionicModal,$cordovaSQLite, AlimentoDAO, tipoFromResolve, AlimentoBean){
  
  /**
   * Método privado que invocaremos al cargar la vista en el manejador de $ionicView.loaded 
   */
  var _initView = ()=> {        
        $scope.listaCompra=[];
        $scope.alimento = {};
        $scope.alimentosPorComprar=0;
        $scope.tipoAlimento=AlimentoBean.tipo(tipoFromResolve);
        //se cargan los alimentos
        AlimentoDAO.getAlimentos(tipoFromResolve)
          .then(function (alimentos) {
                    $scope.listaCompra = angular.copy(AlimentoBean.build(alimentos));
                    console.log(AlimentoBean.tipo(tipoFromResolve) +" "+$scope.listaCompra);
                    $scope.alimentosPorComprar=_getNumAlimentosPorComprar();                     
                })
          .catch(function (err) {
                    console.log(err);
                });
       };

  /**
   * Método privado que devuelve el objeto y el índice en el array encapulsado en un objeto
   */
  var _getAlimentoById =(lista, id)=>{
     if (angular.isArray(lista)){
       for (var i = 0; i<lista.length;i++){  
          if (lista[i].id === parseInt(id)){
            return {
                     data: lista[i], 
                     index:i
                    };
          }
       } 
       return null;
     }
  }
 
 /**
  * método privado para contar los alimentos activos-> no marcados
  */
  var _getNumAlimentosPorComprar = ()=>{
    var num = 0;
    for (var i = 0; i<$scope.listaCompra.length;i++){
            if ($scope.listaCompra[i].marcado==="false"){ num++;}
      }
      return num;
 };

/**
 * Método público que marca o desmarca un alimento, actualizando check en BBDD
 */
$scope.marcar = function(id){
  var result = _getAlimentoById($scope.listaCompra,id);
  var alimento = result.data;
  //moodificamos el check de alimento
  alimento.toogle();
  if (alimento){
    AlimentoDAO.updateAlimento(alimento)
      .then(function (response) {    
         if (response.rowsAffected>0){               
        //Tengo que asignarle otra instancia porque si no, no funciona el double way
        //y no se actualiza la vista automáticamente, por eso el build
        $scope.listaCompra[result.index]=AlimentoBean.build(alimento);
         if (!alimento.marcado){
            $scope.alimentosPorComprar++;
           }else{
            $scope.alimentosPorComprar--;
            }
         }
        })
       .catch(function (err) {
          console.log(err);
         });            
    }
  return;
  };

/**
 * Método público que añade un alimento a la lista y confirma en BBDD
 */
   $scope.addAlimento = function() {     
     var alimento = new AlimentoBean(null, $scope.alimento.nombre, tipoFromResolve,false);
     AlimentoDAO.addAlimento(alimento) 
        .then(function (response) {
          if (response.insertId){
              alimento.id=response.insertId;
              $scope.listaCompra.push(alimento);
              $scope.alimento = {};
              $scope.closeModal();
              $scope.alimentosPorComprar++;
          }      
        }).catch(function (err) {
            console.log(err);
        });    
    
  };

  /**
   * Método público que borra los alimentos marcados
   */
  $scope.deleteChecks = function(nombre){
    var aux = [];
    var borrados=[];
     for (var i = 0; i<$scope.listaCompra.length;i++){
          if ($scope.listaCompra[i].marcado===false){           
            aux.push($scope.listaCompra[i])
         } else {
           borrados.push($scope.listaCompra[i].id.toString())
         } 
     }
     AlimentoDAO.deleteAlimentos(borrados)
     .then(
       function(response){
         $scope.listaCompra=aux;
         //nos aseguramos del contador aunque en principio no debería hacer falta
         $scope.alimentosPorComprar=$scope.listaCompra.length;
      })
     .catch(
       function(err){
         console.log(err)
        });
      
  };

  /**
   * Métodos para modal -> externalizar en servicio
   */
  $ionicModal.fromTemplateUrl('templates/casa/lista_compra_add.html', {
        scope: $scope,
        animation: 'jelly'
      }).then(function(modal) {
        $scope.modal = modal;
      });

  $scope.closeModal = ()=> {
    $scope.modal.hide();
  };

  $scope.openModal = ()=> {
    $scope.modal.show();
  };

 
  
 /**
   * Métodos para reconocedor de voz -> externalizar en servicio
   */
 $scope.record = function() {
    var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.alimento.nombre = event.results[0][0].transcript;
            $scope.$apply()
        }
    };
    recognition.start();
  };

 $scope.speak = function(campo) {
    TTS.speak({
           text: campo,
           locale: 'en-US',
           rate: 0.75
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
       });
  };

  /**
   * Se captura el evento loaded para realizar todas las operaciones sobre la vista necesarias
   * al comienzo
   */
  
   $scope.$on('$ionicView.loaded', function(){
    	_initView();
   });
  
});
