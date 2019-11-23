class Stats{
    constructor(){
        this.vidas = 9;
        this.puntos = 0;
    }

    calcularScore(incomingScore){
        this.puntos = Math.max(this.puntos + incomingScore, 0);
    }
}