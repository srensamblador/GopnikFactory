class Jugador extends Modelo {
  /**
   *
   * @param {player_number} 1 = Boris, 2 = Anatoli
   * @param {posiciones} lista de posiciones que el personaje puede adoptar
   */
  constructor(player_number, posiciones) {
    super(imagenes.gopnik, posiciones[0].x, posiciones[0].y);
    this.currPos = 0; // Índice actual en la lista de posiciones

    this.posiciones = posiciones;
    console.log(player_number, posiciones);
    if (player_number === 1) {
      this.aIdle = new Animacion(
        imagenes.boris_idle,
        this.ancho,
        this.alto,
        18,
        3
      );
      this.aSquat = new Animacion(
        imagenes.boris_squat,
        this.ancho,
        this.alto,
        18,
        3
      );
      this.aStand = new Animacion(
        imagenes.boris_stand,
        this.ancho,
        this.alto,
        18,
        3
      );
    } else {
      this.aIdle = new Animacion(
        imagenes.anatoli_idle,
        this.ancho,
        this.alto,
        18,
        3
      );
      this.aSquat = new Animacion(
        imagenes.anatoli_squat,
        this.ancho,
        this.alto,
        18,
        3
      );
      this.aStand = new Animacion(
        imagenes.anatoli_stand,
        this.ancho,
        this.alto,
        18,
        3
      );
    }

    this.estado = estados.moviendo;
    this.animacion = this.aIdle;
  }

  actualizar() {
    this.animacion.actualizar();
  }

  dibujar() {
    this.animacion.dibujar(this.x, this.y);
  }

  mover(sentido) {
    if (
      this.currPos + sentido >= 0 &&
      this.currPos + sentido < this.posiciones.length
    ) {
      this.currPos += sentido;
      this.x = this.posiciones[this.currPos].x;
      this.y = this.posiciones[this.currPos].y - this.alto / 2;
    }
  }

  cogerCaja(caja, origen, destino, sentido) {
    if (caja.x == origen.x && caja.y + caja.alto / 2 == origen.y) {
        console.log("caja en posición")
      // Caja en el punto adecuado
      console.log("Caja x:" + caja.x, " y:" + caja.y)
      console.log("Jugador y:" + (this.y + this.alto/2)+ " y_2: " + (this.y + tileHeight))
      if (this.y  + this.alto/2== origen.y|| this.y + tileHeight== origen.y) {
        // Misma fila o la de abajo
        caja.mover(destino, sentido);
      }
    }
  }
}
