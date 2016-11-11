<?php 
error_reporting(-1);
ini_set('display_errors', 'On');
include "../config/database.php";
include "../config/funciones_generales.php";
//Controlador de Empleadoses
$tabla_p = "empleados";
//Recibir la peticion
$tipo = $_SERVER['REQUEST_METHOD'];
//  Seleccionar una opcion
if ($tipo == "GET") {
	getEmpleados($tabla_p);
} else if ($tipo == "POST") {
	postEmpleados($tabla_p);
} else if ($tipo == "DELETE") {
	deleteEmpleados($tabla_p);
} else if ($tipo == "PUT") {
	putEmpleados($tabla_p);
}else{
	printJSON("Metodo no permitido");
	die();
}

//Manejar las peticiones por get
/*
	Manejar entrada por GET
*/
function getEmpleados($tabla_p)
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
function postEmpleados($tabla_p)
{	
	$valores = array(
			"Nombre"=>$_POST["Nombre"],
			"Cedula"=>$_POST["Cedula"],
			"Correo"=>$_POST["Correo"],
			"Status"=>1
			);
	$data = crearRegistro($tabla_p,$valores);
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function putEmpleados($tabla_p)
{
	parse_str(file_get_contents("php://input"),$post_vars);
	$id = verificarId();
	$valores = array(
			"Nombre"=>$post_vars["Nombre"],
			"Cedula"=>$post_vars["Cedula"],
			"Correo"=>$post_vars["Correo"]
			);
	$data = actualizarRegistro($tabla_p,$valores,$id);
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function deleteEmpleados($tabla_p)
{
	$id = verificarId();
	$data = borrarRegistro($tabla_p,$id);
	printJSON($data);
}
