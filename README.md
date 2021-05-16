# MSIW4103-2021-12 - Entregable Semana 6

Escenarios de pruebas automatizados por:

* Alejandro Farfán - a.farfanm@uniandes.edu.co

* Ana Castillo - a.castillob@uniandes.edu.co

* Leonardo Garzón - l.garzonr@uniandes.edu.co

* Oscar Ortiz - o.ortizf@uniandes.edu.co


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
2. Actualizar el archivo _Cypress/cypress.json_ con las valores correctos de los parametros de la aplicación bajo pruebas
3. Ejecutar `cypress open --project ./Cypress`
4. En la ventana que se despliega, hacer clic donde dice "Run * integration specs"

### Para las pruebas con kraken

1. Descargar el repositorio de este link https://github.com/TheSoftwareDesignLab/KrakenMobile/archive/refs/tags/1.0.9.zip y descomprimirlo dentro de la carpeta _Kraken_.
2. Actualizar el archivo _Kraken\ghostTests\kraken_properties.json_ con los valores correctos de los parametros de la aplicación bajo pruebas
3. Desde un terminal de comandos dirigirse a la carpeta Kraken\ghostTests
4. Ejecutar `bundle install`
5. Ejecutar las pruebas con el comando `bundle exec kraken-mobile run --properties=kraken_properties.json`
6. ver reporte en Kraken\ghostTest\reports
* Asegúrese de que la ruta del repositorio no sea muy larga, para que los reportes funcionen

## Funcionalidades bajo pruebas

1. Publicar posts: Crear, editar y publicar posts desde el módulo de administrador para que aparezcan en la página de inicio de Ghost.
2. Publicar pages: Crear, editar, publicar y eliminar paginas desde el modulo administrador.
3. Administrar tags: Crear, editar, asignar a contenidos y eliminar tags
4. Administrar enlaces de navegación: Crear, editar y eliminar enlaces en el menú de navegación principal y secundario
5. Manejo de usuarios: Inicio de sesión y modificación del perfil de usuario administrador

## Descripción de escenarios

Los escenarios realizados en cypress se implementaron siguien el patro de pruebas PageObject mientras que los realizados con la herramienta kraken siguen el patron Given-When-Then. La edfinicion, de acuerdo a las funcionalidades, son: 

Publicar posts: 
1. Attempt to create post without contents: Crear post sin editar ningún campo y validar que no haya sido creado en la lista de posts.
2. Create unpublished untitled post: Crear un post al hacer click en el campo de texto del título, validar que aparezca en la lista de posts creados, pero no en los posts publicados en el home del sitio de Ghost.
3. Edit post with invalid title length and try to publish it: Editar el primer post de la lista de posts creados, con un título que excede los 256 caracteres permitidos, y validar que este no haya sido actualizado.
4. Edit post with valid title and publish it: Editar el primer post de la lista de posts creados, con un título válido y con un contenido, publicarlo y validar que aparezca en la primer card de posts publicados en el home del sitio de Ghost.

Publicar pages
1. Attempt to create page and publish: Crea una pagina y la publica en el sitio.
2. Attempt to create page without content: Crea una pagina sin contenido.
3. Edit first page and publish it: Se modifica la primera pagina y se publica.
4. Attempt to delete page: Se elimina una pagina almacenada.

Administrar tags
1. Internal tags should start by #: Luego de login, crear un tag que comience con # y validar que aparezcan en el la lista de tags internos
2. New Tag should be visible on post settings: Luego de Login, crear un tag y valida que este disponible para ser usado en las configuraciones de un post
3. Deleted tag shoud not be on tagList: Luego de login, elimina un tag que no tenga post y lo elimina, valida que no aparezca en la lista de tags
4. Tag updates should be visible on webSite: Luego de Login, edita nombre, descripcion y slug un tag que tenga posts asociados y luego valida que el sitio muestre los cambios hechos en la pagina del tag. 

Administrar enlaces de navegación
1. Creates a link in main navigation: Crear un enlace en el menú principal de navegación (ubicado en el sitio público en la parte superior izquierda) y verificar que existe en el homepage.
2. Edits a link in main navigation: Editar un enlace en el menú principal de navegación (ubicado en el sitio público en la parte superior izquierda) y verificar que fue modificado en el homepage.
3. Deletes a link in main navigation: Eliminar un enlace en el menú principal de navegación (ubicado en el sitio público en la parte superior izquierda) y verificar que fue eliminado en el homepage.
4. Creates a link in secondary navigation: Crear un enlace en el menú secundario de navegación (ubicado en el sitio público en la parte superior derecha) y verificar que existe en el homepage.
5. Deletes a link in secondary navigation: Eliminar un enlace en el menú secundario de navegación (ubicado en el sitio público en la parte superior derecha) y verificar que fue eliminado en el homepage.

Manejo de usuarios
1. Invalid login: Intenga registrarse en el sistema con un nombre de usuario y contraseña aleatorio.
2. Valid login: Se autentica en el sistema con los nombres de usuario y contraseñas del archivo de de configuración.
3. Update user name: Luego del login, se accede a la información de perfil de usuario y se actualiza el nombre del usuario

## Escenarios para VRT
1. Invalid login: kraken-resemble
2. Update user name: cypress-resemble
3. Creates a link in main navigation: cypress-resemble
4. Creates a link in secondary navigation: cypress-resemble
5. Attempt to create post without contents: cypress-resemble
6. Edit post with invalid title length: kraken-resemble
7. Edit first page and publish it: cypress-resemble
8. Edit first page and publish it: kraken-resemble

## VRT con resemble
1. Moverse a la carpeta resemble-report
2. En la terminal ejecutar el comando node index.js
3. Dirigirse a la carpeta results y abrir report.html

## VRT con backstop
ejecutar npm run vtr:backstop
