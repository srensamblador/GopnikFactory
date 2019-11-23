// Lista re recursos a precargar
var cache = [];
var imagenes = {
    menu_fondo : "res/menu_fondo.png",
    gameover: "res/gameover.png",
    boton_normal : "res/boton_normal.png",
    boton_easy: "res/boton_easy.png",
    conveyor_left: "res/conveyor_left.png",
    conveyor_right: "res/conveyor_right.png",
    conveyor: "res/conveyor.png",
    platform: "res/platform.png",
    platform_double: "res/platform2.png",
    fondo: "res/fondo.png",
    middle_machine: "res/machine.png",
    middle_machine_sheet: "res/machine_sheet.png",
    gopnik: "res/gopnik.png",
    boris_idle: "res/boris_idle.png",
    boris_squat: "res/boris_squat.png",
    grab_alt: "res/grab_alt.png",
    anatoli_idle: "res/anatoli_idle.png",
    anatoli_squat: "res/anatoli_squat.png",
    caja: "res/box.png",
    caja_morir: "res/caja_morir.png",
    caja_deluxe: "res/box_deluxe.png",
    caja_deluxe_idle: "res/box_deluxe_idle.png",
    caja_deluxe_morir: "res/box_deluxe_morir.png",
    caja_cocacola: "res/box_coke.png",
    caja_cocacola_morir: "res/coke_morir.png",
    anticoke: "res/anticoke.png",
    lifeup: "res/lifeup.png",
    truck: "res/truck.png",
    generador: "res/generador.png",
    generador_sheet: "res/generador_sheet.png",
    reloj: "res/hourglass.png",
    icono_vodka: "res/vodka_icon_mini.png",
    icono_rublos: "res/icono_rublos_mini.png"
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
