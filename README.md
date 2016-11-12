#En caso de que tengan algun problema con la visualizacion monte una copia exacta en 
  
  http://104.131.252.191/covinoc_test/frontend/dist/#/

#Contacto
  Duvan Alexander Vargas Sandoval
  davs3029@gmail.com
#Estructura
  backend/
    api -> Archivos para rutas
    config -> configuracion y conexion db
    database -> funciones adicionales
  
  frontend/
    app ->Aplicativo
      scripts -> js de la aplicacion
      view -> Vistas html de la aplicacion
      styles -> Estilos css de la aplicacion
      index.html ->Punto de partida del app
    dist-> Carpeta de produccion
    bower_modules -> componentes del app
    node_modules -> componentes del app

# Instrucciones para montar en local

1. Correr los scripts de la base de datos  (Dump_covinoc.sql)
2. Cambiar el usuario y clave de la base de datos en el archivo 
https://github.com/duvanvargas/covinoc_test/blob/master/backend/config/database.php

3.Verificar que los servicios esten arriba
4.Cambiar las rutas en el frontend para que apunten al nuevo servidor
5.en la carpeta de frontend correr 'grunt serve'


