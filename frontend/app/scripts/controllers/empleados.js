'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:EmpleadosCtrl
 * @description
 * # EmpleadosCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('EmpleadosCtrl', function ($scope,$http,$mdDialog) {
   	
   	//Cargar Usuarios
   	$scope.personas = []
   	listarElementos().then(function(r){
   		var res = r.data.data;
   		console.log(res)
   		for (var i = 0; i < res.length; i++) {
   			$scope.personas.push({ nombre: res[i].Nombre,cedula:res[i].Cedula,id:res[i].id,correo:res[i].Correo})
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
	    $scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	    $scope.guardar = function() {
	      console.log($scope.user);
	      var data =
	      	"Nombre="+encodeURIComponent($scope.user.nombre)+
			"&Cedula="+encodeURIComponent($scope.user.cedula)+
			"&Correo="+encodeURIComponent($scope.user.correo)
	      
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
	      	 window.location.reload()
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
   		$scope.user.nombre = persona.nombre;
		$scope.user.cedula = persona.cedula;
		$scope.user.correo = persona.correo;

	    $scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	    $scope.guardar = function() {
	      console.log($scope.user);
	      var data =
	      	"Nombre="+encodeURIComponent($scope.user.nombre)+
			"&Cedula="+encodeURIComponent($scope.user.cedula)+
			"&Correo="+encodeURIComponent($scope.user.correo);
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
			        url : "http://localhost/covinoc_prueba/backend/api/empleados.php",
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
	        url : "http://localhost/covinoc_prueba/backend/api/empleados.php",
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
	        url : "http://localhost/covinoc_prueba/backend/api/empleados.php?id="+id,
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
	        url : "http://localhost/covinoc_prueba/backend/api/empleados.php?id="+id,
	        data:datos,
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).then(function mySucces(response) {
	       return response;
	    }, function myError(response) {
	       return response;
	    });
	}
  });
