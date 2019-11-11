class Jugador extends Modelo{
    /**
     * 
     * @param {player_number} 1 = Boris, 2 = Anatoli
     * @param {posiciones} lista de posiciones que el personaje puede adoptar 
     */
    constructor(player_number, posiciones) {
        super(imagenes.gopnik, posiciones[0].x , posiciones[0].y);
        this.y -= this.alto/2;
        this.currPos = 0;

        this.posiciones = posiciones;
        console.log(player_number, posiciones)
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

    mover(sentido){
        if (this.currPos + sentido >= 0 && this.currPos + sentido < this.posiciones.length){
            this.currPos += sentido;
            this.x = this.posiciones[this.currPos].x;
            this.y = this.posiciones[this.currPos].y - this.alto/2;
        }
    }
}