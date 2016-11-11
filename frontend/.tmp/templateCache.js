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
