class GameLayer extends Layer {
    constructor() {
        super();
        this.pausa = false;
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();
        this.espacio = new Espacio(1);

        this.conveyors = []
        this.positions_a = []
        this.positions_b = []

        this.fondo = new Fondo(imagenes.fondo, canvasWidth*0.5, canvasHeight*0.5);
        this.machine = new Fondo(imagenes.middle_machine, canvasWidth*0.5, canvasHeight*0.5)

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

        // Jugadores
        if (this.boris != null){
            this.boris.actualizar();
        }
        if (this.anatoli != null){
            this.anatoli.actualizar();
        }
    }   

    dibujar() {
        this.fondo.dibujar();

        // Conveyor belts
        for (var i = 0; i < this.conveyors.length; i++){
            this.conveyors[i].dibujar();
        }

        // Jugadores
        if (this.boris != null){
            this.boris.dibujar();
        }
        if (this.anatoli != null){
            this.anatoli.dibujar();
        }

        this.machine.dibujar();               
    }

    procesarControles() {
        if (controles.continuar){
            controles.continuar = false;
            this.pausa = false;
        }
        
        if (controles.moverBorisY > 0){
            this.boris.mover(1);
            controles.moverBorisY = 0;
        }
        if (controles.moverBorisY < 0){
            this.boris.mover(-1);
            controles.moverBorisY = 0;
        }
        if (controles.moverAnatoliY > 0){
            this.anatoli.mover(1);
            controles.moverAnatoliY = 0;
        }
        if (controles.moverAnatoliY < 0){
            this.anatoli.mover(-1);
            controles.moverAnatoliY = 0;
        }
    }

    cargarMapa(ruta) {
        console.log("Cargando mapa");
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.altoMapa = (lineas.length) * tileHeight;
            this.anchoMapa = (lineas[0].length - 1) * tileWidth;
            for (var i = lineas.length -1; i >= 0; i--) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = tileWidth / 2 + j * tileWidth; // x central
                    var y = tileHeight + i * tileHeight; // y de abajo
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
            this.boris = new Jugador(1, this.positions_b);
            this.anatoli = new Jugador(2, this.positions_a);
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch (simbolo){
            case "-":
                var conveyor = new Conveyor(imagenes.conveyor, x, y);
                conveyor.y = conveyor.y - conveyor.alto/2;
                this.conveyors.push(conveyor);
                this.espacio.agregarCuerpoEstatico(conveyor);
                break;
            case "<":
                var conveyor = new Conveyor(imagenes.conveyor_left, x, y);
                conveyor.y = conveyor.y - conveyor.alto/2;
                this.conveyors.push(conveyor);
                this.espacio.agregarCuerpoEstatico(conveyor);
                break;
            case ">":
                var conveyor = new Conveyor(imagenes.conveyor_right, x, y);
                conveyor.y = conveyor.y - conveyor.alto/2;
                this.conveyors.push(conveyor);
                this.espacio.agregarCuerpoEstatico(conveyor);
                break;
            case "A":
                this.positions_a.push({x,y});
                break;
            case "B":
                this.positions_b.push({x,y});
                break;
            /*
            case "1":
                this.boris = new Jugador(1, x, y);
                this.boris.y = this.boris.y - this.boris.alto/2;
                this.espacio.agregarCuerpoDinamico(this.boris);
                break;
            case "2":
                this.anatoli = new Jugador(2, x, y);
                this.anatoli.y = this.anatoli.y - this.anatoli.alto/2;
                this.espacio.agregarCuerpoDinamico(this.anatoli);
                break;
            */
        }
    }



}