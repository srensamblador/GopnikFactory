class Caja extends Modelo {
  constructor(imagen, x, y) {
    super(imagen, x, y);
    this.vx = -boxSpeed;
    this.vy = 0;
    this.estado = estados.moviendo;

    this.aMorir = new Animacion(imagenes.caja_morir, this.ancho, this.alto, 12, 3, this.finAnimacionMorir.bind(this));
    
    this.puntos = 10;
  }

  actualizar() {
    if (this.animacion != null){
      this.animacion.actualizar();
    }
    if (this.vy > 0 && this.estado == estados.moviendo) {
      this.vx = 0;
      this.estado = estados.muriendo;
      reproducirEfecto(this.break_sfx);
    }
    if (this.estado == estados.muriendo && this.vy == 0){
      this.animacion = this.aMorir;
    }
  }

  dibujar(){
    if (this.animacion != null){
      this.animacion.dibujar(this.x, this.y);
    }else{
      super.dibujar();
    }
  }
  finAnimacionMorir(){
    this.estado = estados.muerto;
  }

  mover(destino, sentido) {
    this.x = destino.x;
    this.y = destino.y - this.alto/2;
    this.vx *= sentido;
  }
}
