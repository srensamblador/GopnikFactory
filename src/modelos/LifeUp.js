class LifeUp extends Modelo{
    constructor(x, y){
        super(imagenes.lifeup, x, y);
        this.sfx = efectos.papali;
    }

    activar(gamelayer){
        reproducirEfecto(this.sfx);
        gamelayer.stats.vidas += 1;
    }
}