class GameLayer extends Layer {
  constructor() {
    super();
    this.pausa = false;
    this.iniciar();
  }

  iniciar() {
    reproducirMusica();
    this.espacio = new Espacio(1);
    this.stats = new Stats();

    this.conveyors = [];
    this.posiciones_a = [];
    this.posiciones_b = [];
    this.posiciones_cajas = {};

    this.cajas = [];

    this.fondo = new Fondo(
      imagenes.fondo,
      canvasWidth * 0.5,
      canvasHeight * 0.5
    );
    this.machine = new Fondo(
      imagenes.middle_machine,
      canvasWidth * 0.5,
      canvasHeight * 0.5
    );

    this.cargarMapa("res/0.txt");
  }

  actualizar() {
    if (this.pausa) {
      return;
    }

    this.espacio.actualizar();

    // Conveyor belts
    for (var i = 0; i < this.conveyors.length; i++) {
      this.conveyors[i].actualizar();
    }

    // Jugadores
    if (this.boris != null) {
      this.boris.actualizar();
    }
    if (this.anatoli != null) {
      this.anatoli.actualizar();
    }

    // Cajas
    for (var i = 0; i < this.cajas.length; i++) {
      //this.cajas[i].actualizar();
    }

    // Colisión caja, jugador
    for (const k in this.posiciones_cajas) {
      const origen = this.posiciones_cajas[k].origen;
      for (var i = 0; i < this.cajas.length; i++) {
        const destino = this.posiciones_cajas[k].destino;
        var sentido = -1;
        var keys = Object.keys(this.posiciones_cajas).sort();
        // La carga y descarga de la caja al sistema de cintas no invierte el sentido del movimiento
        if (k == keys[keys.length - 1] || k == keys[0]) {
          sentido = 1;
        }
        this.boris.intentarCogerCaja(this.cajas[i], origen, destino, sentido);
        this.anatoli.intentarCogerCaja(this.cajas[i], origen, destino, sentido);
      }
    }

    // Caja llegó a destino
    this.cajasEnDestino();
  }

  // comprueba si las cajas llegaron a su destino
  cajasEnDestino() {
    for (var i = 0; i < this.cajas.length; i++) {
      const caja = this.cajas[i];
      if (caja.x == this.destinoCajas.x && caja.y + caja.alto/2 == this.destinoCajas.y){
          this.stats.puntos += caja.puntos;
          this.cajas.splice(i, 1);
          this.espacio.eliminarCuerpoDinamico(caja);
          i = i -1;
          console.log("PUNTOS: ",this.stats.puntos);
      }
    }
  }

  dibujar() {
    this.fondo.dibujar();

    // Conveyor belts
    for (var i = 0; i < this.conveyors.length; i++) {
      this.conveyors[i].dibujar();
    }

    // Jugadores
    if (this.boris != null) {
      this.boris.dibujar();
    }
    if (this.anatoli != null) {
      this.anatoli.dibujar();
    }

    //Cajas
    for (var i = 0; i < this.cajas.length; i++) {
      this.cajas[i].dibujar();
    }

    this.machine.dibujar();
  }

  procesarControles() {
    if (controles.continuar) {
      controles.continuar = false;
      this.pausa = false;
    }

    if (controles.moverBorisY > 0) {
      this.boris.mover(1);
      controles.moverBorisY = 0;
      console.log(this.boris.y + this.boris.alto / 2);
    }
    if (controles.moverBorisY < 0) {
      this.boris.mover(-1);
      controles.moverBorisY = 0;
      console.log(this.boris.y + this.boris.alto / 2);
    }
    if (controles.moverAnatoliY > 0) {
      this.anatoli.mover(1);
      controles.moverAnatoliY = 0;
      console.log(this.anatoli.y + this.anatoli.alto / 2);
    }
    if (controles.moverAnatoliY < 0) {
      this.anatoli.mover(-1);
      controles.moverAnatoliY = 0;
      console.log(this.anatoli.y + this.anatoli.alto / 2);
    }
  }

  cargarMapa(ruta) {
    console.log("Cargando mapa");
    var fichero = new XMLHttpRequest();
    fichero.open("GET", ruta, false);

    fichero.onreadystatechange = function() {
      var texto = fichero.responseText;
      var lineas = texto.split("\n");
      this.altoMapa = lineas.length * tileHeight;
      this.anchoMapa = (lineas[0].length - 1) * tileWidth;
      for (var i = lineas.length - 1; i >= 0; i--) {
        var linea = lineas[i];
        for (var j = 0; j < linea.length; j++) {
          var simbolo = linea[j];
          var x = tileWidth / 2 + j * tileWidth; // x central
          var y = tileHeight + i * tileHeight; // y de abajo
          this.cargarObjetoMapa(simbolo, x, y);
        }
      }
      this.boris = new Jugador(1, this.posiciones_b);
      this.boris.y -= this.boris.alto / 2;
      this.anatoli = new Jugador(2, this.posiciones_a);
      this.anatoli.y -= this.anatoli.alto / 2;
      console.log(this.posiciones_cajas);
    }.bind(this);

    fichero.send(null);
  }

  cargarObjetoMapa(simbolo, x, y) {
    switch (simbolo) {
      case "-":
        var conveyor = new Conveyor(imagenes.conveyor, x, y);
        conveyor.y = conveyor.y - conveyor.alto / 2;
        this.conveyors.push(conveyor);
        this.espacio.agregarCuerpoEstatico(conveyor);
        break;
      case "<":
        var conveyor = new Conveyor(imagenes.conveyor_left, x, y);
        conveyor.y = conveyor.y - conveyor.alto / 2;
        this.conveyors.push(conveyor);
        this.espacio.agregarCuerpoEstatico(conveyor);
        break;
      case ">":
        var conveyor = new Conveyor(imagenes.conveyor_right, x, y);
        conveyor.y = conveyor.y - conveyor.alto / 2;
        this.conveyors.push(conveyor);
        this.espacio.agregarCuerpoEstatico(conveyor);
        break;
      case "1":
        this.posiciones_b.push({ x, y });
        break;
      case "2":
        this.posiciones_a.push({ x, y });
        break;
      case "X":
        var caja = new Caja(x, y);
        caja.y = caja.y - caja.alto / 2;
        this.cajas.push(caja);
        this.espacio.agregarCuerpoDinamico(caja);
        break;
      case "a":
      case "b":
      case "c":
      case "d":
      case "e":
      case "f":
        if (!(simbolo in this.posiciones_cajas)) {
          this.posiciones_cajas[simbolo] = {};
        }
        this.posiciones_cajas[simbolo].origen = { x, y };
        break;
      case "A":
      case "B":
      case "C":
      case "D":
      case "E":
      case "F":
        var lowerSimbolo = simbolo.toLowerCase();
        if (!(lowerSimbolo in this.posiciones_cajas)) {
          this.posiciones_cajas[lowerSimbolo] = {};
        }
        this.posiciones_cajas[lowerSimbolo].destino = { x, y };
        break;
      case "$":
        this.destinoCajas = {x, y}
    }
  }
}
