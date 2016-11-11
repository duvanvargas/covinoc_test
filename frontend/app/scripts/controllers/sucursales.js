'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:SucursalesCtrl
 * @description
 * # SucursalesCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('SucursalesCtrl', function ($scope,$http,$mdDialog) {
    
   	//Cargar Usuarios
   	$scope.personas = []
   	listarElementos().then(function(r){
   		var res = r.data.data;
   		console.log(res)
   		for (var i = 0; i < res.length; i++) {
   			$scope.personas.push({ 
   				id: res[i].id,
   				nombre: res[i].Nombre,
   				direccion:res[i].Direccion,
   				desde:res[i].Desde,
   				hasta:res[i].Hasta})
   		}
   	})
   	//crea Elemento
   	$scope.nuevo = function (ev) {
   		$mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'nuevo.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
   	}
   	/*
	controlador del modal
   	*/
   	function DialogController($scope, $mdDialog) {
   		$scope.user={};
	    $scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	    $scope.guardar = function() {
	    	if ($scope.user.desde&&$scope.user.hasta&&$scope.user.nombre&&$scope.user.direccion) {
	    		
	    	}else{
	    		alert("Veirfica los campos");
	    		return
	    	}

	      var desde =$scope.user.desde.toTimeString().split(' ')[0];
	      var hasta =$scope.user.hasta.toTimeString().split(' ')[0];
	      console.log(desde);
	      console.log(hasta);
	      var data =
	      	"Nombre="+encodeURIComponent($scope.user.nombre)+
			"&Direccion="+encodeURIComponent($scope.user.direccion)+
			"&Desde="+encodeURIComponent(desde)+
			"&Hasta="+encodeURIComponent(hasta)

	      crearElemento(data).then(function(r){
	      	console.log(r)
	      	 window.location.reload()
	      })
	      //$mdDialog.hide(answer);
	    };
	  }
	//Editar Usuarios
	$scope.eliminar = function (id,ev) {
		var confirm = $mdDialog.confirm()
          .title('Desea eliminar este item?')
          .textContent('Esta accion eliminara un elemento.')
          .ariaLabel('asd')
          .targetEvent(ev)
          .ok('Eliminar')
          .cancel('Cancelar');

	    $mdDialog.show(confirm).then(function() {
	      eliminarElemento(id).then(function (id) {
	      	 //window.location.reload()
	      })
	    }, function() {
	      //No hacer nada
	    });
	}

	//Eliminar usuarios
	$scope.editar = function (id,person,ev) {
		//abrir modal
		$mdDialog.show({
			locals:{id: id,persona:person},
	      controller: EditController,
	      templateUrl: 'editar.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
   	}
   	/*
	controlador del modal
   	*/
   	function EditController($scope, $mdDialog,id,persona) {
   		$scope.user = {};
   		$scope.user.desde = persona.desde;
		$scope.user.hasta = persona.hasta;
		$scope.user.nombre = persona.nombre;
		$scope.user.direccion = persona.direccion;

	    $scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	    $scope.guardar = function() {
	      	if ($scope.user.desde&&$scope.user.hasta&&$scope.user.nombre&&$scope.user.direccion) {
	    		
	    	}else{
	    		alert("Veirfica los campos");
	    		return
	    	}

	      var desde =$scope.user.desde.toTimeString().split(' ')[0];
	      var hasta =$scope.user.hasta.toTimeString().split(' ')[0];
	      console.log(desde);
	      console.log(hasta);
	      var data =
	      	"Nombre="+encodeURIComponent($scope.user.nombre)+
			"&Direccion="+encodeURIComponent($scope.user.direccion)+
			"&Desde="+encodeURIComponent(desde)+
			"&Hasta="+encodeURIComponent(hasta)
			

	      actualizarElemento(id,data).then(function(r){
	      	console.log(r)
	      	window.location.reload()
	      })
	      //$mdDialog.hide(answer);
	    };
	  }
	//funciones generales
	//listar todos los items
	function listarElementos(){
		return $http({
			        method : "GET",
			        url : "http://localhost/covinoc_prueba/backend/api/sucursales.php",
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).then(function mySucces(response) {
			        return  response;
			    }, function myError(response) {
			        return response;
			    });
	}
	//Crear un elemento 
	function crearElemento(datos) {
		return $http({
	        method : "POST",
	        url : "http://localhost/covinoc_prueba/backend/api/sucursales.php",
	        data:datos,
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).then(function mySucces(response) {
	       return response;
	    }, function myError(response) {
	       return response;
	    });
	}
	//Borrar un item
	function eliminarElemento(id){
		return $http({
	        method : "DELETE",
	        url : "http://localhost/covinoc_prueba/backend/api/sucursales.php?id="+id,
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).then(function mySucces(response) {
	       return response;
	    }, function myError(response) {
	       return response;
	    });
	}
	//Actualiar un item
	function actualizarElemento(id,datos) {
		return $http({
	        method : "PUT",
	        url : "http://localhost/covinoc_prueba/backend/api/sucursales.php?id="+id,
	        data:datos,
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).then(function mySucces(response) {
	       return response;
	    }, function myError(response) {
	       return response;
	    });
	}
  });
