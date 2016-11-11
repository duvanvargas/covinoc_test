<?php 
error_reporting(-1);
ini_set('display_errors', 'On');
include "../config/database.php";
include "../config/funciones_generales.php";
//Controlador de Reservas
$tabla_p = "reservas";
//Recibir la peticion
$tipo = $_SERVER['REQUEST_METHOD'];
//  Seleccionar una opcion
if ($tipo == "GET") {
	getReservas($tabla_p);
} else if ($tipo == "POST") {
	postReservas($tabla_p);
} else if ($tipo == "DELETE") {
	deleteReservas($tabla_p);
} else if ($tipo == "PUT") {
	putReservas($tabla_p);
}else{
	printJSON("Metodo no permitido");
	die();
}

//Manejar las peticiones por get
/*
	Manejar entrada por GET
*/
function getReservas($tabla_p)
{
	if (!isset($_GET["id"])) {
		$data = obtenerReservas();
	}else{
	    $id = verificarId();
	    $data = obtenerReservas($tabla_p,$id);
	}
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function postReservas($tabla_p)
{	
	//TODO verificar informacion antes de guardar
	$valores = array(
			"id_empleado"=>$_POST["id_empleado"],
			"id_servicio"=>$_POST["id_servicio"],
			"id_sucursal"=>$_POST["id_sucursal"],
			"desde"=>$_POST["desde"],
			"hasta"=>$_POST["hasta"],
			"Status"=>1
			);
	$vf = verificarFechas($valores["desde"],$valores["hasta"]); 
	$vhs = verificarHorarioSucrusal($valores["id_sucursal"],$valores["desde"],$valores["hasta"]); 
	$vr = verificarreserva($valores); 
	
	$data = crearRegistro($tabla_p,$valores);
	printJSON($data);
}

function verificarreserva($valores){
	$query ='SELECT 
			    *
			FROM
			    reservas_covinoc.reservas
			where
			    id_sucursal = '.$valores["id_sucursal"].'
			    and id_empleado = '.$valores["id_empleado"].'
				and ((desde between "'.$valores["desde"].'" and  "'.$valores["hasta"].'") OR
				(hasta between "'.$valores["desde"].'" and  "'.$valores["hasta"].'")) ';

	$res = obtenerQuery($query);
	if (count($res)>0) {
		$data = array('error' => 'Esta sucursal o empleado ya tiene una reserva en ese horario');
		printJSON($data);
		die();
	}else{
		return "ok";
	}

}
function verificarHorarioSucrusal($id_suc,$de,$ha)
{
	$desde = date("H:i:s",strtotime($de));
	$hasta = date("H:i:s",strtotime($ha));
	$sucursal = obtenerId('sucursales',$id_suc)[0];
	
	$desde_sucursal = date($sucursal["Desde"]);
	$hasta_sucursal = date($sucursal["Hasta"]); 
	

	if ($desde >= $desde_sucursal &&  $hasta <=  $hasta_sucursal ) {
		return "ok";
	}else{
		$data = array('error' => 'Esta sucursal no permite esos horarios');
		printJSON($data);
		die();
	}
}

function verificarFechas($de,$ha)
{
	if (strtotime($de) < strtotime($ha)) {	
		return "ok";
	}else{
		$data = array('error' => 'La fecha de inicio no puede ser mayor o igual que la fecha de cierre');
		printJSON($data);
		die();
	}
}
/*
	Manejar entrada por GET
*/
function putReservas($tabla_p)
{
	//TODO verificar informacion antes de actualizar
	parse_str(file_get_contents("php://input"),$post_vars);
	$id = verificarId();
	$valores = array(
			"id_empleado"=>$post_vars["id_empleado"],
			"id_servicio"=>$post_vars["id_servicio"],
			"id_sucursal"=>$post_vars["id_sucursal"],
			"desde"=>$post_vars["desde"],
			"hasta"=>$post_vars["hasta"],
			);
	$data = actualizarRegistro($tabla_p,$valores,$id);
	printJSON($data);
}
/*
	Manejar entrada por GET
*/
function deleteReservas($tabla_p)
{
	$id = verificarId();
	$data = borrarRegistro($tabla_p,$id);
	printJSON($data);
}
