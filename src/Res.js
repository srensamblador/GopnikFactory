// Lista re recursos a precargar
var cache = [];
var imagenes = {
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    conveyor_left: "res/conveyor_left.png",
    conveyor_right: "res/conveyor_right.png",
    conveyor: "res/conveyor.png",
    fondo: "res/fondo.png",
    middle_machine: "res/Machine1.png",
    gopnik: "res/gopnik.png",
    boris_idle: "res/boris_idle.png",
    boris_squat: "res/boris_squat.png",
    boris_stand: "res/boris_stand.png",
    anatoli_idle: "res/anatoli_idle.png",
    anatoli_squat: "res/anatoli_squat.png",
    anatoli_stand: "res/anatoli_stand.png",
    caja: "res/box.png",
    caja_deluxe: "res/box_deluxe.png"
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
