# Principios REST
principios y/o restricciones de la arquitectura REST  

## Qué significa API REST
REST viene de, REpresentational State Transfer

## Cliente-servidor: 
El cliente y el servidor deben estar completamente separados e independientes.  
La única forma de comunicación debe ser mediante solicitudes HTTP.  
- El cliente y servidor están separados, su unión es mediante la interfaz uniforme
- Los desarrollos en frontend y backend se hacen por separado, teniendo en cuenta la API.
- Mientras la interfaz no cambie, podremos cambiar el cliente o el servidor sin problemas.
## Sin estado (stateless): 
La comunicación entre el cliente y el servidor debe ser sin estado, lo cual implica que no se almacenará ni se compartirá información entre peticiones.  
Toda petición es independiente y debe contener sólo la información necesaria para procesarla.
## Identificador único (URI): 
Todo recurso debe tener un identificador irrepetible, no puede existir dos o más recursos con el mismo identificador en la red y estos deben mantener una jerarquía lógica.
## Uso correcto de HTTP: 
REST debe respetar tanto los verbos y códigos de estado para cada operación (GET, POST, PUT, DELETE, PATCH, etc.).

## Interfaz uniforme
- La interfaz de basa en recursos (por ejemplo el recurso Empleado (Id, Nombre, Apellido, Puesto, Sueldo)
- El servidor mandará los datos (vía html, json, xml...) pero lo que tenga en su interior (BBDD por ejemplo) para el cliente es transparente
- La representación del recurso que le llega al cliente, será suficiente para poder cambiar/borrar el recurso:
   * Suponiendo que tenga permisos
   * Por eso en el recurso solicitado se suele enviar un parámetro Id
- La idea es que todas las interacciones entre el cliente y el servidor se realicen a través de una interfaz uniforme, que define las acciones que se pueden realizar en los recursos y cómo realizarlas.
- Esto implica que los recursos deben ser accesibles a través de URLs bien definidas, que los métodos HTTP deben ser limitados y que el servidor no puede guardar información sobre el cliente entre solicitudes.

## Peticiones sin estado
- http es un protocolo sin estado ---> mayor rendimiento
> GET mi_url/empleados/1234  
> DELETE mi_url/empleados/1234
- En la segunda petición hemos tenido que incidar el identificador del recurso que queremos borrar
- El servidor no guardaba los datos de la consulta previa que tenía el cliente en partícular.
- Una petición del tipo DELETE mi_url/empleado debe dar error, ¡falta el id y el servidor no lo conoce!
## Cacheable
+ En la web los clientes pueden cachear las respuestas del servidor
Las respuestas se deben marcar de forma implícita o explícita como cacheables o no.
- En futuras peticiones, el cliente sabrá si puede reutilizar o no los datos que ya ha obtenido.
- Si ahorramos peticiones, mejoraremos la escabilidad de la aplicación y el rendimiento en cliente (evitamos principalmente la latencia).
## Sistema de Capas
+ El cliente puede estar conectado mediante la interfaz al servidor o a un intermediario, para el es irrelevante y desconocido.
+ Al cliente solo le preocupa que la API REST funcione como debe: no importa el COMO sino el QUE
+ El uso de capas o servidores intermedios puede servir para aumentar la escalabilidad (sistemas de balanceo de carga, cachés) o para implementar políticas de seguridad.
- Este principio implica que cada capa de un sistema puede interactuar únicamente con las capas superiores o inferiores directamente conectadas a ella.
- De esta forma, cada capa puede reutilizarse y ser independiente del resto de capas.
## Código bajo demanda (opcional)
Los servidores pueden ser capaces de aumentar o definir cierta funcionalidad en el cliente transfiriéndole cierta lógica que pueda ejecutar:  
Componentes compilados como applets de Java
JavaScript en cliente.