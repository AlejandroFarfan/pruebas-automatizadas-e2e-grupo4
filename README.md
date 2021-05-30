# MSIW4103-2021-12 - Entregable Semana 7
## Pruebas de validacion de datos en Ghost 3.42.5 con diferentes técnicas de generación de datos

Escenarios de pruebas automatizados por:

* Alejandro Farfán - a.farfanm@uniandes.edu.co

* Ana Castillo - a.castillob@uniandes.edu.co

* Leonardo Garzón - l.garzonr@uniandes.edu.co

* Oscar Ortiz - o.ortizf@uniandes.edu.co


## Instrucciones

### Se necesita tener instalado y configurado: 
* node 12.20.1
* Ghost version 3.42.5 (Se debe contar con un usuario **user@email.com** y la clave para este usuario debe ser **abc123xyz456**)

### Para las pruebas con Cypress se debe: 

0. "[Solicitar permiso para CORS](https://cors-anywhere.herokuapp.com/corsdemo)" a Heroku, de acuerdo con lo indicado en el tutorial del curso, para poder usar el API generado en Mockaroo
1. Desde la terminal de comandos dirigirse a la raíz del proyecto
2. Ejecutar `npm install`
2. Actualizar el archivo _Cypress/cypress.json_ con las valores correctos de los parametros de la aplicación bajo pruebas
3. Ejecutar `cypress open --project ./Cypress`
4. En la ventana que se despliega, hacer clic donde dice "Run * integration specs"

### Para las pruebas con Monkeys: 

0. Se debe contar con un usuario **user@email.com** y la clave para este usuario debe ser **abc123xyz456**
1. Desde la terminal de comandos dirigirse a la carpeta _Monkey_
2. Ejecutar `npm install`
3. Ejecutar `npm run monkey`
4. Las pruebas se ejecutaran Headless y al final el resultado (video e informe) estará en la carpeta _Monkey/results_

### Para las pruebas con Rippers: 

0. Se debe contar con un usuario **user@email.com** y la clave para este usuario debe ser **abc123xyz456**
1. Desde la terminal de comandos dirigirse a la carpeta _Ripper_
2. Ejecutar `npm install`
3. Ejecutar `node index.js`
4. Las pruebas se ejecutaran Headless y al final el resultado (informe html) estará en la carpeta _Ripper/results_


### Técnicas de generación de datos usadas

En la [wiki](https://github.com/AlejandroFarfan/pruebas-automatizadas-e2e-grupo4/wiki/Estrategias-120-escenarios) podrá encontrar la descripción de las técnicas usadas para la generación de datos y la distribución de la misma en las 120 pruebas.

---

### Changelog (Tags/Releases)
Tenemos los siguientes tags o releases para identificar fácilmente los distintos entregables, y que el tutor o persona que califique, se ubique mejor:
- [Semana 7 - 120 escenarios funcionales con técnicas de generación de datos para Ghost 3.42.5](https://github.com/AlejandroFarfan/pruebas-automatizadas-e2e-grupo4/tree/semana-7-3.42.5)
- [Semana 6 - 40 escenarios funcionales para Ghost 3.42.5 y generación de reportes de ResembleJS y BackstopJS](https://github.com/AlejandroFarfan/pruebas-automatizadas-e2e-grupo4/tree/semana-6-3.42.5)
- [Semana 6 - 40 escenarios funcionales para Ghost 3.3.0 y toma de screenshots en cada paso.](https://github.com/AlejandroFarfan/pruebas-automatizadas-e2e-grupo4/tree/semana-6-3.3.0)
- [Semana 5 - 40 escenarios funcionales para Ghost 3.3.0](https://github.com/AlejandroFarfan/pruebas-automatizadas-e2e-grupo4/tree/semana-5-3.3.0)
