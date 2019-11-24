console.log("Navegador admiteMandos: " + admiteMandos());

// Los que hay pulsados actualmente
var botonesPulsados = [];
var axisHeld = false;

function admiteMandos() {
    return "getGamepads" in navigator;
}

window.addEventListener("gamepadconnected", function (e) {
    console.log("GamePad Conectado tipo: " + e.gamepad.id);
    // Se podrían conectar varios, multijugador
    console.log("Número: " + e.gamepad.index);

    // Leer botones del mando
    if (navigator.getGamepads()[0] != null) {
        setInterval(actualizarOrdenes, 1000 / 30);
    }

});

function actualizarOrdenes() {
    // Obtener gamePad en cada iteración
    var gP1 = navigator.getGamepads()[0];
    for (var i = 0; i < gP1.buttons.length; i++) {
        if (gP1.buttons[i].pressed || Math.abs(parseFloat(gP1.axes[9])) < 1.5) {
            entrada = entradas.gamepad;
        }
    }

    if (entrada != entradas.gamepad) {
        return;
    }

    if (gP1.buttons[9].pressed){
        if (botonesPulsados[9] == false){
            botonesPulsados[9] = true;
            controles.pausar = true;
        }
    }else{
        botonesPulsados[9] = false;
    }
   
    // Triángulo
    if (gP1.buttons[0].pressed) {
        if (botonesPulsados[0] == false) {
            botonesPulsados[0] = true;
            controles.moverAnatoliY = 1;
        }
    } else {
        botonesPulsados[0] = false;
    }
    // X
    if (gP1.buttons[2].pressed) {
        if (botonesPulsados[2] == false) {
            botonesPulsados[2] = true;
            controles.moverAnatoliY = -1;
            controles.continuar = true;
        }
    } else {
        botonesPulsados[2] = false;
    }
    
    // D-Pad es el eje 9 en mi mando
    borisAxis = parseFloat(gP1.axes[9]).toFixed(2);
    if (borisAxis < -0.5 && !axisHeld) {
        controles.moverBorisY = 1;
        controles.menuUp = true;
        axisHeld = true;
    }
    if (borisAxis > -0.5 && borisAxis < 0.5 && !axisHeld) {
        controles.moverBorisY = -1
        controles.menuDown = true;
        axisHeld = true;
    }
    if (borisAxis > 0.5 && axisHeld){
        axisHeld = false;
    }
    
}
