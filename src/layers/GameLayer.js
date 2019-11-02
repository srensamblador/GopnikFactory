class GameLayer extends Layer {
    constructor() {
        super();
        this.pausa = true;
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();
        this.espacio = new Espacio(1);

        this.conveyors = []

        this.fondo = new Fondo(imagenes.fondo, canvasWidth*0.5, canvasHeight*0.5);

        this.cargarMapa("res/0.txt");
    }

    actualizar() {
        if (this.pausa){
            return;
        }

        // Conveyor belts
        for (var i = 0; i < this.conveyors.length; i++){
            this.conveyors[i].actualizar();
        }
    }   

    dibujar() {
        this.fondo.dibujar();

        // Conveyor belts
        for (var i = 0; i < this.conveyors.length; i++){
            this.conveyors[i].dibujar();
        }
               
    }

    procesarControles() {
        if (controles.continuar){
            controles.continuar = false;
            this.pausa = false;
        }     

    }

    cargarMapa(ruta) {
        console.log("Cargando mapa");
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.altoMapa = (lineas.length) * 15;
            this.anchoMapa = (lineas[0].length - 1) * 18;
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = 18 / 2 + j * 18; // x central
                    var y = 15 + i * 15; // y de abajo
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch (simbolo){
            case "-":
                var conveyor = new Conveyor(imagenes.conveyor, x, y);
                this.conveyors.push(conveyor);
                this.espacio.agregarCuerpoEstatico(conveyor);
                break;
            case "<":
                var conveyor = new Conveyor(imagenes.conveyor_left, x, y);
                this.conveyors.push(conveyor);
                this.espacio.agregarCuerpoEstatico(conveyor);
                break;
            case ">":
                var conveyor = new Conveyor(imagenes.conveyor_right, x, y);
                this.conveyors.push(conveyor);
                this.espacio.agregarCuerpoEstatico(conveyor);
                break;

        }
    }



}