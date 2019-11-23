var pulsaciones = []; // actuales registradas

var entradas = {};
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;
var entrada = entradas.pulsaciones;

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var nivelActual = 0;
var nivelMaximo = 2;

var estados = {};
estados.moviendo= 2; // Incluye parado, derecha , izquierda
estados.actuando = 3;
estados.muriendo = 4;
estados.muerto = 5;
estados.desactivado = 6;
estados.activado = 7;

var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;

var canvasWidth = 480;
var canvasHeight = 320;

var tileWidth = 18;
var tileHeight = 15;

var boxSpeed = 1;
var boxSpeedNormal = 1;
var boxSpeedSlow = 0.5;