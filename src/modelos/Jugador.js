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
        2,
        3,
        this.finAccion.bind(this)
      );
      this.aAlt = new Animacion(
        imagenes.grab_alt,
        this.ancho,
        this.alto,
        2,
        2,
        this.finAccion.bind(this)
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
        2,
        3,
        this.finAccion.bind(this)
      );
      this.aAlt = new Animacion(
        imagenes.grab_alt,
        this.ancho,
        this.alto,
        2,
        2,
        this.finAccion.bind(this)
      );
    }

    this.estado = estados.moviendo;
    this.animacion = this.aIdle;
  }

  actualizar() {
    this.animacion.actualizar();
  }

  finAccion() {
    this.estado = estados.moviendo;
    this.animacion = this.aIdle;
  }

  dibujar() {
    this.animacion.dibujar(this.x, this.y);
  }

  mover(sentido) {
    if (
      this.currPos + sentido >= 0 &&
      this.currPos + sentido < this.posiciones.length &&
      this.estado == estados.moviendo
    ) {
      this.currPos += sentido;
      this.x = this.posiciones[this.currPos].x;
      this.y = this.posiciones[this.currPos].y - this.alto / 2;
    }
  }

  intentarCogerCaja(caja, origen, destino, sentido) {
    if (caja.estado == estados.moviendo) {
      if (
        Math.abs(caja.x - origen.x) < caja.ancho &&
        caja.y + caja.alto / 2 == origen.y
      ) {
        // Caja en el punto adecuado
        if (
          this.y + this.alto / 2 == origen.y ||
          this.y + tileHeight == origen.y
        ) {
          // Jugador y caja alineados
          if (sentido > 0) {
            this.animacion = this.aAlt;
          }
          else {
            this.animacion = this.aSquat;
          }
          this.estado = estados.actuando;
          caja.mover(destino, sentido);
        }
      }
    }
  }
}
