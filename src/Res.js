// Lista re recursos a precargar
var cache = [];
var imagenes = {
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    conveyor_left: "res/conveyor_left.png",
    conveyor_right: "res/conveyor_right.png",
    conveyor: "res/conveyor.png",
    fondo: "res/fondo.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
