'use strict';

/**
 * @ngdoc overview
 * @name citasApp
 * @description
 * # citasApp
 *
 * Main module of the application.
 */
angular
  .module('citasApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'mwl.calendar'
  ])
  .controller('principal', ["$scope", "$mdSidenav", "$location", function ($scope,$mdSidenav,$location) {
     $scope.abrirCerrarMenu = function () {
       $mdSidenav('left').toggle();
     }

     $scope.abrirvista = function (vista) {
      console.log(vista);
       $location.path(vista);
     }
  }])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/empleados', {
        templateUrl: 'views/empleados.html',
        controller: 'EmpleadosCtrl',
        controllerAs: 'empleados'
      })
      .when('/servicios', {
        templateUrl: 'views/servicios.html',
        controller: 'ServiciosCtrl',
        controllerAs: 'servicios'
      })
      .when('/sucursales', {
        templateUrl: 'views/sucursales.html',
        controller: 'SucursalesCtrl',
        controllerAs: 'sucursales'
      })
      .when('/reservas', {
        templateUrl: 'views/reservas.html',
        controller: 'ReservasCtrl',
        controllerAs: 'reservas'
      })
      .otherwise({
        redirectTo: '/',
      });
  }])
  ;

'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:EmpleadosCtrl
 * @description
 * # EmpleadosCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('EmpleadosCtrl', ["$scope", "$http", "$mdDialog", function ($scope,$http,$mdDialog) {
   	
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
	  DialogController.$inject = ["$scope", "$mdDialog"];
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
	  EditController.$inject = ["$scope", "$mdDialog", "id", "persona"];
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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:ServiciosCtrl
 * @description
 * # ServiciosCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('ServiciosCtrl', ["$scope", "$http", "$mdDialog", function ($scope,$http,$mdDialog) {
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
	      	"Nombre="+encodeURIComponent($scope.user.nombre);
	      
	      crearElemento(data).then(function(r){
	      	console.log(r)
	      	 window.location.reload()
	      })
	      //$mdDialog.hide(answer);
	    };
	  }
	  DialogController.$inject = ["$scope", "$mdDialog"];
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
	      	"Nombre="+encodeURIComponent($scope.user.nombre);
	      actualizarElemento(id,data).then(function(r){
	      	console.log(r)
	      	window.location.reload()
	      })
	      //$mdDialog.hide(answer);
	    };
	  }
	  EditController.$inject = ["$scope", "$mdDialog", "id", "persona"];
	//funciones generales
	//listar todos los items
	function listarElementos(){
		return $http({
			        method : "GET",
			        url : "http://localhost/covinoc_prueba/backend/api/servicios.php",
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
	        url : "http://localhost/covinoc_prueba/backend/api/servicios.php",
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
	        url : "http://localhost/covinoc_prueba/backend/api/servicios.php?id="+id,
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
	        url : "http://localhost/covinoc_prueba/backend/api/servicios.php?id="+id,
	        data:datos,
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).then(function mySucces(response) {
	       return response;
	    }, function myError(response) {
	       return response;
	    });
	}
  }]);

'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:SucursalesCtrl
 * @description
 * # SucursalesCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('SucursalesCtrl', ["$scope", "$http", "$mdDialog", function ($scope,$http,$mdDialog) {
    
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
	  DialogController.$inject = ["$scope", "$mdDialog"];
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
	  EditController.$inject = ["$scope", "$mdDialog", "id", "persona"];
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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name citasApp.controller:ReservasCtrl
 * @description
 * # ReservasCtrl
 * Controller of the citasApp
 */
angular.module('citasApp')
  .controller('ReservasCtrl', ["$scope", "calendarConfig", "$http", "$mdDialog", function ($scope,calendarConfig,$http,$mdDialog) {
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
	  EditController.$inject = ["$scope", "$mdDialog", "data"];

    /*
    PETICIONES
    */
    function listarEmpleados(){
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
	function listarSucursales(){
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
	function listarServicios(){
		return $http({
			        method : "GET",
			        url : "http://localhost/covinoc_prueba/backend/api/servicios.php",
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
			        url : "http://localhost/covinoc_prueba/backend/api/reservas.php",
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
	        url : "http://localhost/covinoc_prueba/backend/api/reservas.php",
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
	        url : "http://localhost/covinoc_prueba/backend/api/reservas.php?id="+id,
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
	        url : "http://localhost/covinoc_prueba/backend/api/reservas.php?id="+id,
	        data:datos,
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).then(function mySucces(response) {
	       return response;
	    }, function myError(response) {
	       return response;
	    });
	}

  }]);

angular.module('citasApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/empleados.html',
    "<h1>Empleados</h1> <md-button aria-label=\"More\" ng-click=\"nuevo($event)\"> Crear&nbsp;<i class=\"fa fa-plus\" aria-hidden=\"true\"></i> </md-button> <md-list> <md-subheader class=\"md-no-sticky\">Empleados inscritos en la base de datos:</md-subheader> <md-list-item ng-repeat=\"person in personas\" ng-click=\"a()\" class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>{{ person.nombre }}</h3> <h4>Cedula: {{ person.cedula }}</h4> <p>Correo : {{ person.correo }}</p> </div> <md-button class=\"md-icon-button\" aria-label=\"More\" ng-click=\"editar(person.id,person,$event)\"> <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> </md-button> &nbsp;&nbsp; <md-button class=\"md-icon-button\" aria-label=\"More\" ng-click=\"eliminar(person.id,$event)\"> <i class=\"fa fa-trash\" aria-hidden=\"true\"></i> </md-button> </md-list-item> </md-list> <script type=\"text/ng-template\" id=\"nuevo.tmpl.html\"><md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2>Nuevo</h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "         <i class=\"fa fa-close\" aria-hidden=\"true\"></i>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "   \n" +
    "<md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "      <form name=\"userForm\">\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Nombre</label>\n" +
    "          <input ng-model=\"user.nombre\">\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Correo</label>\n" +
    "          <input ng-model=\"user.correo\">\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Cedula</label>\n" +
    "          <input ng-model=\"user.cedula\">\n" +
    "        </md-input-container>\n" +
    "      </form>\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "\n" +
    "\n" +
    "      <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"guardar()\">\n" +
    "        Guardar\n" +
    "      </md-button>\n" +
    "    </md-dialog-actions></script> <script type=\"text/ng-template\" id=\"editar.tmpl.html\"><md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2>Editar</h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "         <i class=\"fa fa-close\" aria-hidden=\"true\"></i>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "   \n" +
    "<md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "      <form name=\"userForm\">\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Nombre</label>\n" +
    "          <input ng-model=\"user.nombre\">\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Correo</label>\n" +
    "          <input ng-model=\"user.correo\">\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Cedula</label>\n" +
    "          <input ng-model=\"user.cedula\">\n" +
    "        </md-input-container>\n" +
    "      </form>\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "\n" +
    "\n" +
    "      <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"guardar()\">\n" +
    "        Actualizar\n" +
    "      </md-button>\n" +
    "    </md-dialog-actions></script>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>Sala de belleza Covicute</h1> <p>Selecciona una opcion en el menu lateral. :)</p> </div>"
  );


  $templateCache.put('views/reservas.html',
    "<h1>Reservas</h1> <form> <div layout=\"row\"> <md-input-container class=\"md-block\"> <label>Empleado</label> <md-select ng-model=\"user.nombre\"> <md-option ng-repeat=\"item in empleados\" value=\"{{item.id}}\"> {{item.nombre}} </md-option> </md-select> </md-input-container> <md-input-container class=\"md-block\"> <label>Servicio</label> <md-select ng-model=\"user.servicio\"> <md-option ng-repeat=\"item in servicios\" value=\"{{item.id}}\"> {{item.nombre}} </md-option> </md-select> </md-input-container> <md-input-container class=\"md-block\"> <label>Sucursal</label> <md-select ng-model=\"user.sucursal\"> <md-option ng-repeat=\"item in sucursales\" value=\"{{item.id}}\"> {{item.nombre}} </md-option> </md-select> </md-input-container> <md-input-container class=\"md-block\"> <label>Desde</label> <input ng-model=\"user.desde\" type=\"datetime-local\" id=\"fechas_d\"> </md-input-container> <md-input-container class=\"md-block\"> <label>Hasta</label> <input ng-model=\"user.hasta\" type=\"datetime-local\" id=\"fechas_h\"> </md-input-container> <md-input-container class=\"md-block\"> <md-button aria-label=\"More\" ng-click=\"nuevo($event)\"> Crear&nbsp;<i class=\"fa fa-plus\" aria-hidden=\"true\"></i> </md-button> </md-input-container> </div> <span style=\"color: red\"> {{msj_error}} </span> </form> <md-button class=\"btn btn-primary\" mwl-date-modifier date=\"viewDate\" decrement=\"calendarView\" ng-click=\"cellIsOpen = false\"> Anterior </md-button> <md-button class=\"btn btn-default\" mwl-date-modifier date=\"viewDate\" set-to-today ng-click=\"cellIsOpen = false\"> Hoy </md-button> <md-button class=\"btn btn-primary\" mwl-date-modifier date=\"viewDate\" increment=\"calendarView\" ng-click=\"cellIsOpen = false\"> Siguiente </md-button> <mwl-calendar events=\"events\" view=\"calendarView\" view-title=\"calendarTitle\" view-date=\"viewDate\" on-event-click=\"eventClicked(calendarEvent)\" cell-is-open=\"cellIsOpen\" day-view-start=\"06:00\" day-view-end=\"22:59\" day-view-split=\"30\" cell-modifier=\"modifyCell(calendarCell)\" cell-auto-open-disabled=\"true\"> </mwl-calendar> <script type=\"text/ng-template\" id=\"editar.tmpl.html\"><md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2>Editar</h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "         <i class=\"fa fa-close\" aria-hidden=\"true\"></i>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "   \n" +
    "<md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "      <form >\n" +
    "<div layout=\"row\">\n" +
    "  \n" +
    "<md-input-container class=\"md-block\">\n" +
    "          <label>Empleado</label>\n" +
    "          <md-select ng-model=\"user.nombre\">\n" +
    "              <md-option ng-repeat=\"item in empleados\" value=\"{{item.id}}\">\n" +
    "                {{item.nombre}}\n" +
    "              </md-option>\n" +
    "            </md-select>\n" +
    "\n" +
    "          \n" +
    "        </md-input-container>\n" +
    "<md-input-container class=\"md-block\">\n" +
    "          <label>Servicio</label>\n" +
    "          <md-select ng-model=\"user.servicio\">\n" +
    "              <md-option ng-repeat=\"item in servicios\" value=\"{{item.id}}\">\n" +
    "                {{item.nombre}}\n" +
    "              </md-option>\n" +
    "            </md-select>\n" +
    "        </md-input-container>\n" +
    "<md-input-container class=\"md-block\">\n" +
    "          <label>Sucursal</label>\n" +
    "          <md-select ng-model=\"user.sucursal\">\n" +
    "              <md-option ng-repeat=\"item in sucursales\" value=\"{{item.id}}\">\n" +
    "                {{item.nombre}}\n" +
    "              </md-option>\n" +
    "            </md-select>\n" +
    "        </md-input-container>\n" +
    "<md-input-container class=\"md-block\">\n" +
    "          <label>Desde</label>\n" +
    "          <input ng-model=\"user.desde\" type=\"datetime-local\" id=\"fechas_d\">\n" +
    "        </md-input-container>\n" +
    "<md-input-container class=\"md-block\">\n" +
    "          <label>Hasta</label>\n" +
    "          <input ng-model=\"user.hasta\" type=\"datetime-local\" id=\"fechas_h\">\n" +
    "        </md-input-container> \n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "<span style=\"color: red\"> {{msj_error}} </span>\n" +
    "\n" +
    "</form>\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "\n" +
    "\n" +
    "      <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"guardar()\">\n" +
    "        Actualizar\n" +
    "      </md-button>\n" +
    "      <md-button ng-click=\"eliminar()\">\n" +
    "        Eliminar\n" +
    "      </md-button>\n" +
    "    </md-dialog-actions></script>"
  );


  $templateCache.put('views/servicios.html',
    "<h1>Servicios</h1> <md-button aria-label=\"More\" ng-click=\"nuevo($event)\"> Crear&nbsp;<i class=\"fa fa-plus\" aria-hidden=\"true\"></i> </md-button> <md-list> <md-subheader class=\"md-no-sticky\">Servicios inscritos en la base de datos:</md-subheader> <md-list-item ng-repeat=\"person in personas\" ng-click=\"a()\" class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>{{ person.nombre }}</h3> </div> <md-button class=\"md-icon-button\" aria-label=\"More\" ng-click=\"editar(person.id,person,$event)\"> <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> </md-button> &nbsp;&nbsp; <md-button class=\"md-icon-button\" aria-label=\"More\" ng-click=\"eliminar(person.id,$event)\"> <i class=\"fa fa-trash\" aria-hidden=\"true\"></i> </md-button> </md-list-item> </md-list> <script type=\"text/ng-template\" id=\"nuevo.tmpl.html\"><md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2>Nuevo</h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "         <i class=\"fa fa-close\" aria-hidden=\"true\"></i>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "   \n" +
    "<md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "      <form name=\"userForm\">\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Nombre</label>\n" +
    "          <input ng-model=\"user.nombre\">\n" +
    "        </md-input-container>\n" +
    "      </form>\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "\n" +
    "\n" +
    "      <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"guardar()\">\n" +
    "        Guardar\n" +
    "      </md-button>\n" +
    "    </md-dialog-actions></script> <script type=\"text/ng-template\" id=\"editar.tmpl.html\"><md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2>Editar</h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "         <i class=\"fa fa-close\" aria-hidden=\"true\"></i>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "   \n" +
    "<md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "      <form name=\"userForm\">\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Nombre</label>\n" +
    "          <input ng-model=\"user.nombre\">\n" +
    "        </md-input-container>\n" +
    "      </form>\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "\n" +
    "\n" +
    "      <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"guardar()\">\n" +
    "        Actualizar\n" +
    "      </md-button>\n" +
    "    </md-dialog-actions></script>"
  );


  $templateCache.put('views/sucursales.html',
    "<h1>Sucursales</h1> <md-button aria-label=\"More\" ng-click=\"nuevo($event)\"> Crear&nbsp;<i class=\"fa fa-plus\" aria-hidden=\"true\"></i> </md-button> <md-list> <md-subheader class=\"md-no-sticky\">Sucursales registradas:</md-subheader> <md-list-item ng-repeat=\"person in personas\" ng-click=\"a()\" class=\"md-3-line\"> <div class=\"md-list-item-text\" layout=\"column\"> <h3>{{ person.nombre }}</h3> <h4>{{ person.direccion }}</h4> <p>Abre : {{ person.desde }}</p> <p>Cierra : {{ person.hasta }}</p> </div> <md-button class=\"md-icon-button\" aria-label=\"More\" ng-click=\"editar(person.id,person,$event)\"> <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> </md-button> &nbsp;&nbsp; <md-button class=\"md-icon-button\" aria-label=\"More\" ng-click=\"eliminar(person.id,$event)\"> <i class=\"fa fa-trash\" aria-hidden=\"true\"></i> </md-button> </md-list-item> </md-list> <script type=\"text/ng-template\" id=\"nuevo.tmpl.html\"><md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2>Nuevo</h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "         <i class=\"fa fa-close\" aria-hidden=\"true\"></i>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "   \n" +
    "<md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "      <form name=\"userForm\" ng-submit=\"guardar()\">\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Nombre</label>\n" +
    "          <input ng-model=\"user.nombre\" required>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Direccion</label>\n" +
    "          <input ng-model=\"user.direccion\" required>\n" +
    "        </md-input-container>\n" +
    "\n" +
    "        <div layout=\"row\">\n" +
    "         <md-input-container class=\"md-block\" flex=\"50\">\n" +
    "         <label>Desde</label>\n" +
    "        \t<input type=\"time\" name=\"bdaytime\" ng-model=\"user.desde\" required>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block\" flex=\"50\">\n" +
    "        <label>Hasta</label>\n" +
    "        \t<input type=\"time\" name=\"bdaytime\" ng-model=\"user.hasta\" required>\n" +
    "\t\t</md-input-container>\n" +
    "\n" +
    "      \t</div>\n" +
    "      \t \n" +
    "        \n" +
    "      </form>\n" +
    "   \n" +
    "\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "\n" +
    "\n" +
    "      <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"guardar()\" type=\"submit\">\n" +
    "        Guardar\n" +
    "      </md-button>\n" +
    "\n" +
    "    </md-dialog-actions></script> <script type=\"text/ng-template\" id=\"editar.tmpl.html\"><md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2>Editar</h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "         <i class=\"fa fa-close\" aria-hidden=\"true\"></i>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "   \n" +
    "<md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "      <form name=\"userForm\" >\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Nombre</label>\n" +
    "          <input ng-model=\"user.nombre\" required>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block\">\n" +
    "          <label>Direccion</label>\n" +
    "          <input ng-model=\"user.direccion\" required>\n" +
    "        </md-input-container>\n" +
    "\n" +
    "        <div layout=\"row\">\n" +
    "         <md-input-container class=\"md-block\" flex=\"50\">\n" +
    "         <label>Desde</label>\n" +
    "        \t<input type=\"time\" name=\"bdaytime\" ng-model=\"user.desde\" required>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container class=\"md-block\" flex=\"50\">\n" +
    "        <label>Hasta</label>\n" +
    "        \t<input type=\"time\" name=\"bdaytime\" ng-model=\"user.hasta\" required>\n" +
    "\t\t</md-input-container>\n" +
    "\n" +
    "      \t</div>\n" +
    "      \t \n" +
    "        \n" +
    "      </form>\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "\n" +
    "\n" +
    "      <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"guardar()\">\n" +
    "        Actualizar\n" +
    "      </md-button>\n" +
    "    </md-dialog-actions></script>"
  );

}]);
