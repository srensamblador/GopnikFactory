class Stats{
    constructor(){
        this.vidas = 3;
        this.puntos = 0;
    }

    calcularScore(incomingScore){
        this.puntos = Math.max(this.puntos + incomingScore, 0);
    }
}