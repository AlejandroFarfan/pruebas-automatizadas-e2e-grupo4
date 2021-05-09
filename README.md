# pruebas-automatizadas-e2e-grupo4

## Se necesita tener instalado y configurado: 
* Ruby + DevKit, en una versión igual o superior a la 2.20. (https://www.ruby-lang.org/es/documentation/installation/)
* JDK instalado en una versión de Java igual o superior a la 8.
* variable de entorno JAVA_HOME apuntando a la ubicación del JDK.
* SDK de Android instalado. (https://developer.android.com/studio).
* variable de entorno ANDROID_HOME apuntando a la ubicación del SDK de Android.
* incluir en el path la ubicacion del platform tools que esta dentro de la carpeta del SDK de Android
* El driver Chromedriver instalado en su máquina. (https://chromedriver.chromium.org/downloads).
* node 12.20.1
* ghost version 3.3.0 (el usuario y contraseña principal deben estar establecidos)

## para las pruebas con cypres se debe: 

1. Desde un terminar de comandos dirigirse a la raiz del proyecto
2. Ejecutar `npm install`
2. Actaulizar el archivo _Cypress/cypress.json_ con las valores correctos de los parametros de la aplicacion bajo pruebas
3. Ejecutar `cypress open --project ./Cypress`
4. En la ventana que se despliega, hacer clic donde dice "Run * integration specs"

## Para las pruebas con kraken

1. Descargar el repositorio de este link https://github.com/TheSoftwareDesignLab/KrakenMobile/archive/refs/tags/1.0.9.zip y descomprimirlo dentro de la carpeta _Kraken_.
2. Actaulizar el archivo _Kraken\ghostTests\kraken_properties.json_ con las valores correctos de los parametros de la aplicacion bajo pruebas
3. Desde un terminal de comandos dirigirse a la carpeta Kraken\ghostTests
4. Ejecutar `bundle install`
5. Ejecutar las pruebas con el comando `bundle exec kraken-mobile run --properties=kraken_properties.json`
6. ver reporte en Kraken\ghostTest\reports
