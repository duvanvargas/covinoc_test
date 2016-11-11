<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: origin, x-requested-with, content-type, accept');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');

  function printJSON($mensaje = [])
  {
  	header('Content-Type: application/json');
  	echo json_encode(array('data' => $mensaje));
  }

  function verificarId()
  {
  	if (!isset($_GET["id"])) {
  			printJSON("Verifica que has enviado un id");
  			die();
	}else{
		if ($_GET["id"]!="" && is_numeric($_GET["id"])) {
			# code...
			return $_GET["id"];
		}else{
			printJSON("Has enviado un parametro que no es un numero");
  			die();
		}
	}
  }