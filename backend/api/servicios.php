<?php 
error_reporting(-1);
ini_set('display_errors', 'On');
include "../config/database.php";
include "../config/funciones_generales.php";
//Controlador de Servicios
$tabla_p = "servicios";
//Recibir la peticion
$tipo = $_SERVER['REQUEST_METHOD'];
//  Seleccionar una opcion
if ($tipo == "GET") {
	getServicios($tabla_p);
} else if ($tipo == "POST") {
	postServicios($tabla_p);
} else if ($tipo == "DELETE") {
	deleteServicios($tabla_p);
} else if ($tipo == "PUT") {
	putServicios($tabla_p);
}else{
	printJSON("Metodo no permitido");
	die();
}

//Manejar las peticiones por get
/*
	Manejar entrada por GET
*/
function getServicios($tabla_p)
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
function postServicios($tabla_p)
{	
	$valores = array(
			"Nombre"=>$_POST["Nombre"],
			"Status"=>1
			);
	$data = crearRegistro($tabla_p,$valores);
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function putServicios($tabla_p)
{
	parse_str(file_get_contents("php://input"),$post_vars);
	$id = verificarId();
	$valores = array(
			"Nombre"=>$post_vars["Nombre"],
			);
	$data = actualizarRegistro($tabla_p,$valores,$id);
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function deleteServicios($tabla_p)
{
	$id = verificarId();
	$data = borrarRegistro($tabla_p,$id);
	printJSON($data);
}
