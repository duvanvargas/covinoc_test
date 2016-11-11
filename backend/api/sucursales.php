<?php 
error_reporting(-1);
ini_set('display_errors', 'On');
include "../config/database.php";
include "../config/funciones_generales.php";
//Controlador de sucursales
$tabla_p = "sucursales";
//Recibir la peticion
$tipo = $_SERVER['REQUEST_METHOD'];
//  Seleccionar una opcion
if ($tipo == "GET") {
	getSucursal($tabla_p);
} else if ($tipo == "POST") {
	postSucursal($tabla_p);
} else if ($tipo == "DELETE") {
	deleteSucursal($tabla_p);
} else if ($tipo == "PUT") {
	putSucursal($tabla_p);
}else{
	printJSON("Metodo no permitido");
	die();
}

//Manejar las peticiones por get
/*
	Manejar entrada por GET
*/
function getSucursal($tabla_p)
{
	if (!isset($_GET["id"])) {
		$data = obtenerTodos($tabla_p);
	}else{
	    $id = verificarId();
	    $data = obtenerId($tabla_p,$id);
	}
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function postSucursal($tabla_p)
{	
	$valores = array(
			"Nombre"=>$_POST["Nombre"],
			"Direccion"=>$_POST["Direccion"],
			"Desde"=>$_POST["Desde"],
			"Hasta"=>$_POST["Hasta"],
			"Status"=>1
			);
	$data = crearRegistro($tabla_p,$valores);
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function putSucursal($tabla_p)
{
	parse_str(file_get_contents("php://input"),$post_vars);
	$id = verificarId();
	$valores = array(
			"Nombre"=>$post_vars["Nombre"],
			"Direccion"=>$post_vars["Direccion"],
			"Desde"=>$post_vars["Desde"],
			"Hasta"=>$post_vars["Hasta"]
			);
	$data = actualizarRegistro($tabla_p,$valores,$id);
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function deleteSucursal($tabla_p)
{
	$id = verificarId();
	$data = borrarRegistro($tabla_p,$id);
	printJSON($data);
}
