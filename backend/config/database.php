<?php 
	 define('_HOST_NAME','localhost');
     define('_DATABASE_NAME','reservas_covinoc');
     define('_DATABASE_USER_NAME','root');
     define('_DATABASE_PASSWORD','');
 
     $db = new MySQLi(_HOST_NAME,_DATABASE_USER_NAME,_DATABASE_PASSWORD,_DATABASE_NAME);
  
     if($db->connect_errno)
     {
       die("ERROR : -> ".$db->connect_error);
     }


   function obtenerTodos($tabla){
      global $db;
      $SQL = $db->query("SELECT * FROM " .$tabla);
      $results_array = [];
      while ($row = $SQL->fetch_assoc()) {
      $results_array[] = $row;
    }
    return $results_array;
   }  

   function obtenerReservas(){
      global $db;
      $SQL = $db->query("SELECT reservas.*,empleados.nombre nombre_e,servicios.nombre nombre_s,sucursales.nombre nombre_ FROM reservas,empleados,servicios,sucursales
where reservas.id_empleado=empleados.id
and reservas.id_servicio=servicios.id
and reservas.id_sucursal=sucursales.id");
      $results_array = [];
      while ($row = $SQL->fetch_assoc()) {
      $results_array[] = $row;
    }
    return $results_array;
   }
   function obtenerQuery($query){
   		global $db;
   		$SQL = $db->query($query);
   		$results_array = [];
   		while ($row = $SQL->fetch_assoc()) {
		  $results_array[] = $row;
		}
		return $results_array;
   }

   function obtenerId($tabla,$id){
   		global $db;
   		$SQL = $db->query("SELECT * FROM " .$tabla. " WHERE id=".$id);
   		$results_array = [];
		while ($row = $SQL->fetch_assoc()) {
		  $results_array[] = $row;
		}
		return $results_array;
   }

   function crearRegistro($tabla,$valores){
   		global $db;
   		//Obtener las llaves y valores
   		$columnas = [];
   		$valor = [];
   		foreach ($valores as $key => $value) {
   			$columnas[] = $key;
   			$valor[]  = "'".$value."'";
   		}
   		//creo la insercion
   		$sql_insert = "INSERT INTO $tabla (".implode(",", $columnas).") VALUES(".implode(",", $valor).")";
   		$insertar = $db->query($sql_insert);
   		//Valido el resultado
		if($insertar){
		    return 'Insertado' ; 
		}else{
		    return ('Error : ('. $db->errno .') '. $db->error);
		}
   }

   function actualizarRegistro($tabla,$valores,$id){
   		global $db;
   		//Obtener las llaves y valores
   		$actualizar = [];
   		foreach ($valores as $key => $value) {
        if ($value!="") {
   			  $actualizar[] = "".$key." = '".$value."'";
        }
   		}
   		//creo la insercion
   		$sql_update = "UPDATE  $tabla SET ".implode(",", $actualizar)." WHERE id=".$id;
   		$act = $db->query($sql_update);
   		//Valido el resultado
		if($act){
		    return 'Actualizado' ; 
		}else{
		    return ('Error : ('. $db->errno .') '. $db->error);
		}
   }

   function borrarRegistro($tabla,$id)
   {
   		global $db;
   		//creo la insercion
   		if ($tabla=="empleados"||$tabla=="sucursales"||$tabla=="servicios") {
        
        if ($tabla=="empleados") {
          $sql_update ="DELETE FROM reservas WHERE id_empleado=".$id;
        }
        if ($tabla=="sucursales") {
          $sql_update ="DELETE FROM reservas WHERE id_servicio=".$id;
        }
        if ($tabla=="servicios") {
          $sql_update ="DELETE FROM reservas WHERE id_sucursal=".$id;
        }
        
        $act = $db->query($sql_update);
      }
      $sql_update ="DELETE FROM " .$tabla. " WHERE id=".$id;
   		$act = $db->query($sql_update);
   		//Valido el resultado
		if($act){
		    return 'Eliminado' ; 
		}else{
		    return ('Error : ('. $db->errno .') '. $db->error);
		}
   }