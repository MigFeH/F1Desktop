/* Miguel Fernández Huerta UO287577 */

"use strict";
class Noticias
{
    constructor()
    {
        if (window.File && window.FileReader && window.FileList && window.Blob) // Si el navegador soporta el uso de la API File de HTML5...
        {
            // El navegador soporta el uso de la API File de HTML5
            this.#prepararListeners();
        } else
        {
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
            document.querySelector("article:nth-of-type(1) > label > input").setAttribute("disabled","true");
        }
    }

    #prepararListeners()
    {
        document.querySelector("body > main > article:nth-of-type(1) > label > input").onchange = this.readInputFile.bind(this, this.files);
        document.querySelector("body > main > article:nth-of-type(2) > button").onclick = this.añadirNoticia.bind(this);
    }

    readInputFile(files)
    {
        /* Método encargado de realizar la lectura del fichero noticias.txt */

        //Solamente toma un archivo
        //var archivo = document.getElementById("archivoTexto").files[0];
        var archivo = document.querySelector("article:nth-of-type(1) > label > input").files[0];
        var thisAuxiliar = this; // para no perder el this al hacer la llamada al método crearNoticia

        //Solamente admite archivos de tipo texto
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
            var lector = new FileReader();
            lector.onload = function (evento)
            {
                //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                //La propiedad "result" es donde se almacena el contenido del archivo
                //Esta propiedad solamente es válida cuando se termina la operación de lectura
                var noticias = lector.result.split("\n");
                $.each(noticias, (i,noticia) =>
                {
                    var campos = noticia.split("_");
                    thisAuxiliar.crearNoticia(campos[0],campos[1],campos[2]);
                });
            }
            lector.readAsText(archivo);

        } else
        {
            var errorArchivo = document.createElement("p");
            contenido = createTextNode("Error : ¡¡¡ Archivo no válido !!!");
            errorArchivo.appendChild(contenido);
            main.appendChild(errorArchivo);
        }  
    }

    añadirNoticia()
    {
        var queryBase = "main > article:nth-of-type(2)";
        
        var inputTitulo = document.querySelector(queryBase + " > label:nth-of-type(1) > input");
        var intputContenido = document.querySelector(queryBase + " > label:nth-of-type(2) > input");
        var inputAutor = document.querySelector(queryBase + " > label:nth-of-type(3) > input");

        var titulo = inputTitulo.value;
        var contenido = intputContenido.value;
        var autor = inputAutor.value;

        this.crearNoticia(titulo,contenido,autor);
        
        inputTitulo.value = "";
        intputContenido.value = "";
        inputAutor.value = "";
    }

    crearNoticia(titular, entradilla, autor)
    {
        var main = document.querySelector("body > main");
        var articulo = document.createElement("article");

        var campoTitular = document.createElement("h4");
        var contenido = document.createTextNode(titular);
        campoTitular.appendChild(contenido);

        var campoEntradilla = document.createElement("p");
        contenido = document.createTextNode(entradilla);
        campoEntradilla.appendChild(contenido);
                    
        var campoAutor = document.createElement("p");
        contenido = document.createTextNode("Autor: " + autor);
        campoAutor.appendChild(contenido);

        articulo.appendChild(campoTitular);
        articulo.appendChild(campoEntradilla);
        articulo.appendChild(campoAutor);

        main.appendChild(articulo);
    }
}