#en caso de que tengan algun problema con la visualizacion monte una copia exacta en 
  
  http://104.131.252.191/covinoc_test/frontend/dist/#/

# Instrucciones para montar en local

1. Correr los scripts de la base de datos  (Dump_covinoc.sql)
2. Cambiar el usuario y clave de la base de datos en el archivo 
https://github.com/duvanvargas/covinoc_test/blob/master/backend/config/database.php

3.Verificar que los servicios esten arriba
4.Cambiar las rutas en el frontend para que apunten al nuevo servidor
5.en la carpeta de frontend correr 'grunt serve'


