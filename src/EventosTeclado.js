var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown(event) {
    entrada = entradas.teclado;
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if (posicion == -1) {
        teclas.push(event.keyCode);
        switch (event.keyCode) {
            case 32:
            case 13:
                controles.continuar = true;
                break;
            case 83:
                controles.menuUp = true;
                controles.moverBorisY = -1;
                break;
            case 87:
                controles.menuDown = true;
                controles.moverBorisY = 1;
                break;
            case 38:
                controles.menuUp = true;
                controles.moverAnatoliY = 1;
                break;
            case 40:
                controles.menuDown = true;
                controles.moverAnatoliY = -1;
                break;
            case 80:
                controles.pausar = true;
                break;
            default:
                console.log(event.keyCode);
                break;
        }
    }

}

function onKeyUp(event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice(posicion, 1);
    switch (event.keyCode) {
        case 32:
            controles.continuar = false;
            break;
        case 38:
            if (controles.moverY == 1) {
                controles.moverY = 0;
            }
            break;
        case 40:
            if (controles.moverY == -1) {
                controles.moverY = 0;
            }
            break;
        case 39:
            if (controles.moverX == 1) {
                controles.moverX = 0;
            }
            break;
        case 37:
            if (controles.moverX == -1) {
                controles.moverX = 0;
            }
            break;
    }

}
