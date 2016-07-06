aplicación oara casa!

importante, tiene SQLLite embebido. Está preparado para furrular tanto en móvil como en browser.
Para que funcionase en móvil hay un problema, window.cordova = null. Raro la verdad. Al final se pudo hacer ñapa añadiendo  
<script>window.phonegap = {}</script> en el index.html.

Para probar en servidor, ionic serve, si queremos ver como queda en ios y android-> ionic serve --lab
Para probar en móvil, ponerlo en modo debug el móvil, chufar cable y ejecutar ionic run android.

Importante-> para probar la aplicación desde el móvil y debuggearla, se puede con el chrome.
Una vez instalada la aplic en el móvil con el cable enchufao, y poner en chrome chrome://inspect/#devices.

Sale todas las aplicaciones que está funcionando en el móvl. Elegimos la nuestra y ya se nos abre el debugger de
chrome.   

Pero ojo, no pilla el if (window.sqlitePlugin !== undefined) ... en sqllite.js cuando abre/crea la BBDD en el 
método self.db. Y entonces ejecuta la de window.openDatabase. ES porque aún no está cargado el plugin de sqllite en ese momento.
Por ello el archivo demo.db no se abre ni en browser ni en móvil. 
La BBDD se puede ver bien en chrome remote como ponía arriba.



objetos
mirar otro de voz
modal
claves i18n
crear paquetes.
minificación