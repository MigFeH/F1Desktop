/* Miguel Fernández Huerta UO287577 */

"use strict";
class Agenda
{
    #url;

    constructor()
    {
        this.#url = "https://api.jolpi.ca/ergast/f1/2024/races";

        var botonSolicitar = document.createElement("button");
		var nombreBotonSolicitar = document.createTextNode("Solicitar");
		botonSolicitar.appendChild(nombreBotonSolicitar);
		botonSolicitar.setAttribute("onclick","agenda.cargarDatos()");
		document.querySelector("body > main > section").appendChild(botonSolicitar);
    }

    cargarDatos()
    {
        $.ajax({
            dataType: "json",
            url: this.#url,
            method: 'GET',
            success: function(JSONRecuperado)
            {
                document.querySelector("body > main > section").remove();
                var carreras = JSONRecuperado.MRData.RaceTable.Races;
                
                $.each(carreras, function(i, carrera)
                {
                    var nombreCarrera = carrera.raceName;
                    var nombreCircuito = carrera.Circuit.circuitName;
                    var coordenadas = carrera.Circuit.Location;
                    var coordenadasLatitud = coordenadas.lat;
                    var coordenadasLongitud = coordenadas.long;
                    var fechaCarrera = carrera.date;
                    var horaCarrera = carrera.time.split("Z")[0];

                    var articulo = document.createElement("article");

                    //--------------------- Imagen ---------------------//
                    var imagen = document.createElement("img");
                    imagen.setAttribute("src", "multimedia/imagenes/banderaCuadros.webp");
                    imagen.setAttribute("alt","Imagen de una bandera a cuadros típica de las carreras");
                    articulo.appendChild(imagen);

                    //--------------------- Nombre de la carrera ---------------------//
                    var cabeceraNombreCarrera = document.createElement("h3");
                    var contenidoNombreCarrera = document.createTextNode("Nombre de la carrera");
                    cabeceraNombreCarrera.appendChild(contenidoNombreCarrera);
                    articulo.appendChild(cabeceraNombreCarrera);

                    var parrafoNombreCarrera = document.createElement("p");
                    contenidoNombreCarrera = document.createTextNode(nombreCarrera);
                    parrafoNombreCarrera.appendChild(contenidoNombreCarrera);
                    articulo.appendChild(parrafoNombreCarrera);


                    //--------------------- Nombre del circuito ---------------------//
                    var cabeceraNombreCircuito = document.createElement("h3");
                    var contenidoNombreCircuito = document.createTextNode("Nombre del circuito");
                    cabeceraNombreCircuito.appendChild(contenidoNombreCircuito);
                    articulo.appendChild(cabeceraNombreCircuito);

                    var parrafoNombreCircuito = document.createElement("p");
                    contenidoNombreCircuito = document.createTextNode(nombreCircuito);
                    parrafoNombreCircuito.appendChild(contenidoNombreCircuito);
                    articulo.appendChild(parrafoNombreCircuito);

                    //--------------------- Coordenadas del circuito ---------------------//
                    var cabeceraCoordenadas = document.createElement("h3");
                    var contenidoCoordenadas = document.createTextNode("Coordenadas del circuito");
                    cabeceraCoordenadas.appendChild(contenidoCoordenadas);
                    articulo.appendChild(cabeceraCoordenadas);

                    var parrafoCoordenadasLatitud = document.createElement("p");
                    var parrafoCoordenadasLongitud = document.createElement("p");
                    var contenidoCoordenadasLatitud = document.createTextNode("Latitud: " + coordenadasLatitud);
                    var contenidoCoordenadasLongitud = document.createTextNode("Longitud: " + coordenadasLongitud);
                    parrafoCoordenadasLatitud.appendChild(contenidoCoordenadasLatitud);
                    parrafoCoordenadasLongitud.appendChild(contenidoCoordenadasLongitud);
                    articulo.appendChild(parrafoCoordenadasLatitud);
                    articulo.appendChild(parrafoCoordenadasLongitud);


                    //--------------------- Fecha y hora de la carrera ---------------------//
                    var cabeceraFechaHora = document.createElement("h3");
                    var contenidoFechaHora = document.createTextNode("Fecha y hora de la carrera");
                    cabeceraFechaHora.appendChild(contenidoFechaHora);
                    articulo.appendChild(cabeceraFechaHora);

                    var parrafoFecha = document.createElement("p");
                    var parrafoHora = document.createElement("p");
                    var contenidoFecha = document.createTextNode(fechaCarrera);
                    var contenidoHora = document.createTextNode(horaCarrera);
                    parrafoFecha.appendChild(contenidoFecha);
                    parrafoHora.appendChild(contenidoHora);
                    articulo.appendChild(parrafoFecha);
                    articulo.appendChild(parrafoHora);

                    document.querySelector("body > main").appendChild(articulo);
                })
            },

            error: function()
            {
                // Error en la petición
            }
        });
    }
}