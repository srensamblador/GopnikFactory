class Caja extends Modelo {
  constructor(x, y) {
    super(imagenes.caja, x, y);
    this.vx = -1;
    this.vy = 0;

    this.state = 0;
  }

  actualizar() {
    if (this.vy > 0) {
      this.vx = 0;
    }
  }

  mover(destino) {
    this.x = destino.x;
    this.y = destino.y - this.alto/2;
    if (this.state > 0){
        this.vx *= -1;
    }
    this.state ++;
  }
}
