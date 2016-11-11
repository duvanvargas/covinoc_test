'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:ReservasCtrl
 * @description
 * # ReservasCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('ReservasCtrl', function ($scope,calendarConfig,$http,$mdDialog) {
   	//Cargar todos los selects
   	var now=new Date();
   	document.getElementById("fechas_d").value = new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().substring(0,19)
   	document.getElementById("fechas_h").value = new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().substring(0,19)
   	$scope.empleados = [];
	$scope.servicios = [];
	$scope.sucursales = [];
	$scope.user = {};


	listarElementos().then(function(r){
   		var res = r.data.data;
   		console.log(res)
   		for (var i = 0; i < res.length; i++) {
   			console.log(res[i]);
   			$scope.events.push({
		        title: res[i].nombre_e+"-"+res[i].nombre_s+"-"+res[i].nombre_l,
		        color: calendarConfig.colorTypes.warning,
		        startsAt: moment(res[i].desde),
		        endsAt: moment(res[i].hasta),
		        draggable: true,
		        resizable: true,
		        item:res[i]
		      })
   		}
	})
   	listarEmpleados().then(function(r){
   		var res = r.data.data;
   		
   		for (var i = 0; i < res.length; i++) {
   			$scope.empleados.push({id:res[i].id,nombre:res[i].Nombre})
   		}

   	})
	listarSucursales().then(function(r){
   		var res = r.data.data;
		
		for (var i = 0; i < res.length; i++) {
   			$scope.sucursales.push({id:res[i].id,nombre:res[i].Nombre})
   		}
	})
	listarServicios().then(function(r){
   		var res = r.data.data;
		
		for (var i = 0; i < res.length; i++) {
   			$scope.servicios.push({id:res[i].id,nombre:res[i].Nombre})
   		}
	})
	//Crear reservacion

	$scope.nuevo = function (ev){
		$scope.msj_error = "";
		if ($scope.user.nombre&&$scope.user.servicio&&$scope.user.sucursal&&$scope.user.desde&&$scope.user.hasta) {

		}
		else{
			alert("Campos incompletos");
		}
		var data =
	      	"id_empleado="+encodeURIComponent($scope.user.nombre)+
			"&id_servicio="+encodeURIComponent($scope.user.servicio)+
			"&id_sucursal="+encodeURIComponent($scope.user.sucursal)+
			"&desde="+encodeURIComponent(format_fecha($scope.user.desde))+
			"&hasta="+encodeURIComponent(format_fecha($scope.user.hasta));
	    console.log(data);
	    
		crearElemento(data).then(function(r){
			var res= r.data.data;
			console.log(res)
			if (res=="Insertado") {
				window.location.reload();
			}
			$scope.msj_error = res.error; 
		})
	}

	function format_fecha(fecha) {
		var parse_fecha= moment(fecha);
		return parse_fecha.format('YYYY-MM-DD HH:mm:ss')
	}
    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'week';
    $scope.viewDate = new Date();

    

    $scope.cellIsOpen = true;

    

    $scope.eventClicked = function(event) {
    	$scope.editar(event)
    };
    $scope.editar = function (ev) {
    	
		//abrir modal
		$mdDialog.show({
			locals:{data:ev},
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
   	function EditController($scope, $mdDialog,data) {
   		$scope.user = {};
   		console.warn(data.item);
   		var id =data.item.id;
   		$scope.user.nombre=data.item.id_empleado
		$scope.user.servicio=data.item.id_servicio
		$scope.user.sucursal=data.item.id_sucursal
		$scope.user.desde=new Date(data.item.desde);
		$scope.user.hasta=new Date(data.item.hasta);


		$scope.empleados = [];
		$scope.servicios = [];
		$scope.sucursales = [];
		listarEmpleados().then(function(r){
   		var res = r.data.data;
   		
   		for (var i = 0; i < res.length; i++) {
   			$scope.empleados.push({id:res[i].id,nombre:res[i].Nombre})
   		}

	   	})
		listarSucursales().then(function(r){
	   		var res = r.data.data;
			
			for (var i = 0; i < res.length; i++) {
	   			$scope.sucursales.push({id:res[i].id,nombre:res[i].Nombre})
	   		}
		})
		listarServicios().then(function(r){
	   		var res = r.data.data;
			
			for (var i = 0; i < res.length; i++) {
	   			$scope.servicios.push({id:res[i].id,nombre:res[i].Nombre})
	   		}
		})
		$scope.eliminar = function(){
			eliminarElemento(id).then(function(r){
				window.location.reload();
			})
		}
	    $scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };

	    $scope.guardar = function() {
	      $scope.msj_error = "";
			if ($scope.user.nombre&&$scope.user.servicio&&$scope.user.sucursal&&$scope.user.desde&&$scope.user.hasta) {

			}
			else{
				alert("Campos incompletos");
			}
			var data =
		      	"id_empleado="+encodeURIComponent($scope.user.nombre)+
				"&id_servicio="+encodeURIComponent($scope.user.servicio)+
				"&id_sucursal="+encodeURIComponent($scope.user.sucursal)+
				"&desde="+encodeURIComponent(format_fecha($scope.user.desde))+
				"&hasta="+encodeURIComponent(format_fecha($scope.user.hasta));
		    console.log(data);
	      	
	      actualizarElemento(id,data).then(function(r){
	      	console.log(r)
	      	window.location.reload()
	      })
	      //$mdDialog.hide(answer);
	    };
	  }

    /*
    PETICIONES
    */
    function listarEmpleados(){
		return $http({
			        method : "GET",
			        url : "http://104.131.252.191/covinoc_test/backend/api/empleados.php",
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).then(function mySucces(response) {
			        return  response;
			    }, function myError(response) {
			        return response;
			    });
	}
	function listarSucursales(){
		return $http({
			        method : "GET",
			        url : "http://104.131.252.191/covinoc_test/backend/api/sucursales.php",
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).then(function mySucces(response) {
			        return  response;
			    }, function myError(response) {
			        return response;
			    });
	}
	function listarServicios(){
		return $http({
			        method : "GET",
			        url : "http://104.131.252.191/covinoc_test/backend/api/servicios.php",
			        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).then(function mySucces(response) {
			        return  response;
			    }, function myError(response) {
			        return response;
			    });
	}
    function listarElementos(){
		return $http({
			        method : "GET",
			        url : "http://104.131.252.191/covinoc_test/backend/api/reservas.php",
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
	        url : "http://104.131.252.191/covinoc_test/backend/api/reservas.php",
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
	        url : "http://104.131.252.191/covinoc_test/backend/api/reservas.php?id="+id,
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
	        url : "http://104.131.252.191/covinoc_test/backend/api/reservas.php?id="+id,
	        data:datos,
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).then(function mySucces(response) {
	       return response;
	    }, function myError(response) {
	       return response;
	    });
	}

  });
