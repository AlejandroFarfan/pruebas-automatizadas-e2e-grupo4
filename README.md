# pruebas-automatizadas-e2e-grupo4

## Instrucciones

### Se necesita tener instalado y configurado: 
* Ruby + DevKit, en una versión igual o superior a la 2.20. (https://www.ruby-lang.org/es/documentation/installation/)
* JDK instalado en una versión de Java igual o superior a la 8.
* variable de entorno JAVA_HOME apuntando a la ubicación del JDK.
* SDK de Android instalado. (https://developer.android.com/studio).
* variable de entorno ANDROID_HOME apuntando a la ubicación del SDK de Android.
* incluir en el path la ubicacion del platform tools que esta dentro de la carpeta del SDK de Android
* El driver Chromedriver instalado en su máquina. (https://chromedriver.chromium.org/downloads).
* node 12.20.1
* ghost version 3.3.0 (el usuario y contraseña principal deben estar establecidos)

### Para las pruebas con cypress se debe: 

1. Desde un terminar de comandos dirigirse a la raiz del proyecto
2. Ejecutar `npm install`
2. Actaulizar el archivo _Cypress/cypress.json_ con las valores correctos de los parametros de la aplicación bajo pruebas
3. Ejecutar `cypress open --project ./Cypress`
4. En la ventana que se despliega, hacer clic donde dice "Run * integration specs"

### Para las pruebas con kraken

1. Descargar el repositorio de este link https://github.com/TheSoftwareDesignLab/KrakenMobile/archive/refs/tags/1.0.9.zip y descomprimirlo dentro de la carpeta _Kraken_.
2. Actualizar el archivo _Kraken\ghostTests\kraken_properties.json_ con los valores correctos de los parametros de la aplicación bajo pruebas
3. Desde un terminal de comandos dirigirse a la carpeta Kraken\ghostTests
4. Ejecutar `bundle install`
5. Ejecutar las pruebas con el comando `bundle exec kraken-mobile run --properties=kraken_properties.json`
6. ver reporte en Kraken\ghostTest\reports

## Funcionalidades bajo pruebas

1. Publicar posts: Crear, editar y publicar posts desde el módulo de administrador para que aparezcan en la página de inicio de Ghost.
2. Publicar pages
3. Administrar tags
4. Gestionar links de navegación
5. 

## Descripción de escenarios
Publicar posts: 
1. Attempt to create post without contents: Crear post sin editar ningún campo y validar que no haya sido creado en la lista de posts.
2. Create unpublished untitled post: Crear un post al hacer click en el campo de texto del título, validar que aparezca en la lista de posts creados, pero no en los posts publicados en el home del sitio de Ghost.
3. Edit post with invalid title length and try to publish it: Editar el primer post de la lista de posts creados, con un título que excede los 256 caracteres permitidos, y validar que este no haya sido actualizado.
4. Edit post with valid title and publish it: Editar el primer post de la lista de posts creados, con un título válido y con un contenido, publicarlo y validar que aparezca en la primer card de posts publicados en el home del sitio de Ghost.

Administrar tags
1. Internal tags should start by #: Luego de login, crear un tag que comience con # y validar que aparezcan en el la lista de tags internos
2. New Tag should be visible on post settings: Luego de Login, crear un tag y valida que este disponible para ser usado en las configuraciones de un post
3. Deleted tag shoud not be on tagList: Luego de login, elimina un tag que no tenga post y lo elimina, valida que no aparezca en la lista de tags
4. Tag updates should be visible on webSite: Luego de Login, edita nombre, descripcion y slug un tag que tenga posts asociados y luego valida que el sitio muestre los cambios hechos en la pagina del tag. 
