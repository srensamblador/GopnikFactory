class FondoAnimado extends Modelo{
    constructor(rutaImagen, x, y, rutaSpriteSheet, refresh, frames) {
        super(rutaImagen, x, y)
        this.vx = 0;
        this.aIdle = new Animacion(rutaSpriteSheet,
            this.ancho, this.alto, refresh, frames);
        this.animacion = this.aIdle;
    }

    actualizar(){
        this.animacion.actualizar();
    }

    dibujar(){
        this.animacion.dibujar(this.x, this.y);
    }
}