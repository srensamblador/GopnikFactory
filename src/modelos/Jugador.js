class Jugador extends Modelo{
    constructor(player_number, x, y) {
        super(imagenes.gopnik, x, y)
        if (player_number === 1){
            this.aIdle = new Animacion(imagenes.boris_idle,
                this.ancho, this.alto, 18, 3);
            this.aSquat = new Animacion(imagenes.boris_squat,
                this.ancho, this.alto, 18, 3);
            this.aStand = new Animacion(imagenes.boris_stand,
                this.ancho, this.alto, 18, 3);
        }else{
            this.aIdle = new Animacion(imagenes.anatoli_idle,
                this.ancho, this.alto, 18, 3);
            this.aSquat = new Animacion(imagenes.anatoli_squat,
                this.ancho, this.alto, 18, 3);
            this.aStand = new Animacion(imagenes.anatoli_stand,
                this.ancho, this.alto, 18, 3);
        }
        
        this.estado = estados.moviendo;
        this.animacion = this.aIdle;
    }

    actualizar(){
        this.animacion.actualizar();
    }

    dibujar(){
        this.animacion.dibujar(this.x, this.y)
    }
}