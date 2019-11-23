class Reloj extends Modelo {
    constructor(x, y) {
        super(imagenes.reloj, x, y);
        this.sfx = efectos.time;
        this.duration = 300;
        this.estado = estados.desactivado;
    }

    actualizar() {
        if (this.estado == estados.activado) {
            this.duration--;
            if (this.duration <= 0) {
                boxSpeed = boxSpeedNormal;
                this.estado = estados.muerto;
            }
        }
    }

    activar(cajas) {
        reproducirEfecto(this.sfx);
        boxSpeed = boxSpeedSlow;
        this.estado = estados.activado;

        for (const caja of cajas) {
            if (caja.vx < 0)
                caja.vx = -boxSpeed;
            else
                caja.vx = boxSpeed;
        }
    }
}