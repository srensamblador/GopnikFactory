class GameLayer extends Layer {
  constructor() {
    super();
    this.pausa = false;
    this.iniciar();
  }

  iniciar() {
    this.espacio = new Espacio(1);
    this.stats = new Stats();

    this.platforms = [];
    this.conveyors = [];
    this.posiciones_a = [];
    this.posiciones_b = [];
    this.posiciones_cajas = {};

    this.cajas = [];
    this.reloj = null;
    this.pickup = null;
    
    this.iteracionesCajas = 0;
    this.iteracionesPickup = 300;

    this.fondo = new Fondo(
      imagenes.fondo,
      canvasWidth * 0.5,
      canvasHeight * 0.5
    );
    this.machine = new FondoAnimado(
      imagenes.middle_machine,
      canvasWidth * 0.5,
      canvasHeight * 0.5,
      imagenes.middle_machine_sheet,
      18,
      3
    );

    this.fondoPuntos = new Fondo(imagenes.icono_rublos, canvasWidth * 0.88, canvasHeight * 0.05);
    this.textoPuntos = new Texto(0, canvasWidth * 0.91, canvasHeight * 0.07);

    this.fondoVidas = new Fondo(imagenes.icono_vodka, canvasWidth * 0.75, canvasHeight * 0.05);
    this.textoVidas = new Texto(0, canvasWidth * 0.78, canvasHeight * 0.07);

    this.fondoReloj = new Fondo(imagenes.reloj, canvasWidth * 0.25, canvasHeight * 0.05);
    this.textoReloj = new Texto(0, canvasWidth * 0.28, canvasHeight * 0.07);

    this.cargarMapa("res/" + nivel + ".txt");
  }

  actualizar() {
    if (this.pausa) {
      return;
    }
    reproducirMusica();

    if (this.stats.vidas <= 0) {
      this.gameOver();
    }
    this.espacio.actualizar();

    // Generar interactuables
    this.generarCajas();
    this.generarPickUps();

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
      this.cajas[i].actualizar();
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

    // Cajas destruidas
    for (var i = 0; i < this.cajas.length; i++) {
      const caja = this.cajas[i];
      if (caja.estado == estados.muerto) {
        if (!caja.esCocaCola) this.stats.vidas--;
        console.log("VIDAS: ", this.stats.vidas);
        this.cajas.splice(i, 1);
        this.espacio.eliminarCuerpoDinamico(caja);
        i = i - 1;
      }
    }

    // Reloj
    if (this.reloj != null) {
      this.reloj.actualizar();
      if (this.reloj.estado == estados.desactivado &&
        (this.reloj.colisiona(this.boris) || this.reloj.colisiona(this.anatoli))) {
        this.reloj.activar(this.cajas);
      }
      if (this.reloj.estado == estados.activado) {
        this.textoReloj.valor = "00:" +
          ("0" + Math.floor(this.reloj.duration / 30)).slice(-2);
      }
      if (this.reloj.estado == estados.muerto) {
        this.reloj = null;
        for (var i = 0; i < this.cajas.length; i++) {
          const caja = this.cajas[i];
          if (caja.vx < 0)
            caja.vx = -boxSpeed;
          else
            caja.vx = boxSpeed;
        }
      }
    }

    // Pickups
    if (this.pickup != null) {
      if (this.pickup.colisiona(this.boris) || this.pickup.colisiona(this.anatoli)) {
        this.pickup.activar(this);
        this.pickup = null;
      }
    }

    // Decoraciones animadas
    this.machine.actualizar();
    this.generador.actualizar();

    // HUD
    this.textoPuntos.valor = this.stats.puntos;
    this.textoVidas.valor = "x " + this.stats.vidas;
  }

  // Generación de cajas
  generarCajas() {
    if (this.iteracionesCajas == null) {
      this.iteracionesCajas = 0;
    }
    this.iteracionesCajas--;

    if (this.iteracionesCajas <= 0) {
      var rng = Math.random();
      let caja;
      if (rng <= 0.1)
        caja = new CajaDeluxe(this.origenCajas.x, this.origenCajas.y);
      else if (rng <= 0.25)
        caja = new CajaCoke(this.origenCajas.x, this.origenCajas.y);
      else
        caja = new CajaNormal(this.origenCajas.x, this.origenCajas.y);

      caja.y = caja.y - caja.alto / 2;
      this.cajas.push(caja);
      this.espacio.agregarCuerpoDinamico(caja);

      this.iteracionesCajas = 350 - 5 * Math.floor(Math.sqrt(this.stats.puntos));
      console.log("iteraciones", this.iteracionesCajas)
    }
  }

  // Genera pickups
  generarPickUps() {
    var posiciones = this.posiciones_a.concat(this.posiciones_b);
    if (this.iteracionesPickup == null) {
      this.iteracionesPickup = 300;
    }
    this.iteracionesPickup--;

    if (this.pickup == null && this.iteracionesPickup <= 0) {
      do {
        var random_pos = Math.floor(Math.random() * posiciones.length);
      } while (
        (posiciones[random_pos].x == this.anatoli.x && posiciones[random_pos].y == this.anatoli.y + this.anatoli.alto / 2) ||
        (posiciones[random_pos].x == this.boris.x && posiciones[random_pos].y == this.boris.y + this.boris.alto / 2)
      )

      var rng = Math.random();
      if (rng <= 0.3) {
        this.pickup = new AntiCoke(posiciones[random_pos].x, posiciones[random_pos].y);
        this.pickup.y -= this.pickup.alto / 2;
      }
      else if (rng <= 0.7 && this.stats.vidas < 3) {
        this.pickup = new LifeUp(posiciones[random_pos].x, posiciones[random_pos].y);
        this.pickup.y -= this.pickup.alto / 2;
      }
      else if (this.reloj == null) {
        this.reloj = new Reloj(posiciones[random_pos].x, posiciones[random_pos].y)
        this.reloj.y -= this.reloj.alto / 2;
      }

      this.iteracionesPickup = 600;
    }
  }

  // comprueba si las cajas llegaron a su destino
  cajasEnDestino() {
    for (var i = 0; i < this.cajas.length; i++) {
      const caja = this.cajas[i];
      if (
        Math.abs(caja.x - this.destinoCajas.x) <= caja.ancho / 2 &&
        caja.y + caja.alto / 2 == this.destinoCajas.y
      ) {
        reproducirEfecto(caja.deliver_sfx);
        this.stats.calcularScore(caja.puntos);
        this.cajas.splice(i, 1);
        this.espacio.eliminarCuerpoDinamico(caja);
        i = i - 1;
      }
    }
  }

  dibujar() {
    this.fondo.dibujar();

    // Conveyor belts
    for (var i = 0; i < this.conveyors.length; i++) {
      this.conveyors[i].dibujar();
    }

    // Plataformas
    for (var i = 0; i < this.platforms.length; i++) {
      this.platforms[i].dibujar();
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

    // Pickups
    if (this.reloj != null && this.reloj.estado == estados.desactivado)
      this.reloj.dibujar();
    if (this.pickup != null)
      this.pickup.dibujar();

    // Decoraciones
    this.machine.dibujar();
    this.truck.dibujar();
    this.generador.dibujar();

    // HUD
    this.fondoPuntos.dibujar();
    this.textoPuntos.dibujar();
    this.fondoVidas.dibujar();
    this.textoVidas.dibujar();
    if (this.reloj != null && this.reloj.estado == estados.activado) {
      this.fondoReloj.dibujar();
      this.textoReloj.dibujar();
    }

    if (this.pausa) {
      this.mensaje_gameover.dibujar();
    }
  }

  gameOver() {
    this.iniciar();    
    this.pausa = true;
    this.mensaje_gameover = new Boton(imagenes.gameover, canvasWidth / 2, canvasHeight / 2);
    console.log(this)
  }

  calcularPulsaciones(pulsaciones) {
    // Suponemos false
    controles.continuar = false;

    for (var i = 0; i < pulsaciones.length; i++) {
      if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
        controles.continuar = true;
      }
    }
  }

  procesarControles() {
    if (controles.continuar) {
      controles.continuar = false;
      this.pausa = false;
    }

    if (controles.moverBorisY > 0) {
      this.boris.mover(1);
      controles.moverBorisY = 0;
    }
    if (controles.moverBorisY < 0) {
      this.boris.mover(-1);
      controles.moverBorisY = 0;
    }
    if (controles.moverAnatoliY > 0) {
      this.anatoli.mover(1);
      controles.moverAnatoliY = 0;
    }
    if (controles.moverAnatoliY < 0) {
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
      case "#":
        var platform = new Platform(imagenes.platform, x, y);
        platform.y = platform.y - platform.alto / 2;
        this.platforms.push(platform);
        this.espacio.agregarCuerpoEstatico(platform);
        break;
      case "%":
        var platform = new Platform(imagenes.platform_double, x, y);
        platform.y = platform.y - platform.alto / 2;
        this.platforms.push(platform);
        this.espacio.agregarCuerpoEstatico(platform);
        break;
      case "1":
        this.posiciones_b.push({ x, y });
        break;
      case "2":
        this.posiciones_a.push({ x, y });
        break;
      case "X":
        var caja = new CajaNormal(x, y);
        caja.y = caja.y - caja.alto / 2;
        this.cajas.push(caja);
        this.espacio.agregarCuerpoDinamico(caja);
        break;
      case "K":
        var caja = new CajaCoke(x, y);
        caja.y = caja.y - caja.alto / 2;
        this.cajas.push(caja);
        this.espacio.agregarCuerpoDinamico(caja);
        break;
      case "€":
        var caja = new CajaDeluxe(x, y);
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
      case "0":
        this.origenCajas = { x, y };
        this.generador = new FondoAnimado(
          imagenes.generador,
          x,
          y,
          imagenes.generador_sheet,
          18,
          3
        );
        this.generador.y -= this.generador.alto / 2;
        break;
      case "$":
        this.destinoCajas = { x, y };
        break;
      case "T":
        this.truck = new Fondo(imagenes.truck, x, y);
        this.truck.y -= this.truck.alto / 2;
        this.truck.x -= this.truck.ancho * 0.3;
        break;
    }
  }
}
