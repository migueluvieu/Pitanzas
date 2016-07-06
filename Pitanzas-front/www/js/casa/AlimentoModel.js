angular.module('AlimentoModule')

.factory('AlimentoBean',  function () {
 

 /**
   * Constructor de la clase
   */
  function Alimento(id, nombre, tipo, marcado) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.marcado = marcado;
  };

  
 /**
  * Functión privada para construir objeto Alimento 
  */ 
 var _build = (data)=> {
    if (!data)
    return null;
      
    return new Alimento(
        data.id,
        data.nombre,
        data.tipo,
        data.marcado
      );
  };

  /**
   * Método público de instancia-> se utiliza prototype
   * Cambiar de marcado a no marcado o a la inversa
   */
  Alimento.prototype.toogle = function () {
     this.marcado = !(this.marcado);     
  };


 /**
   * Funcion estática. El objeto this no está accesible
   * Creamos instancia de Alimento o un array de instancias
   * Alimento si data es un array
   */
 Alimento.build = (data)=>{
    //es un método js que tiene los arrays. Lo que hace es aplicar la funcion 
    //parámetro a todos los objectos del array
    //en este caso para cada objeto del array, crea un alimento objeto Alimento 
    //al invocar a _build y el .filter(Boolean) hace que si el objeto es null, no lo mete en el array
  if (angular.isArray(data)) {
    return data.map(_build).filter(Boolean);
  }
  return _build(data);
 };


 /**
  * Si tuviéramos otra fuente de datos, podríamos crear otro build distinto
  */
  Alimento.otherBuild = (data)=> {
    return new User(
      data.other_Id,
      data.other_nombre,
      data.other_tipo,
      data.other_marcado
    );
  };
  
  //pendiente catálogo de tipos en BBDD, lo dejo aquí de momento
  var _tipos=["Compra","Comidas","Cenas"];

  //Devuelve tipo correspondiente
  Alimento.tipo = (id)=>{
    return _tipos[id];
  }


 return Alimento;

});