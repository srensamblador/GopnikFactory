class CajaCoke extends Caja{
    constructor(x,y){
        super(imagenes.caja_cocacola, x, y);
        this.puntos = -50;
        this.aMorir = new Animacion(imagenes.caja_cocacola_morir, this.ancho, this.alto, 12, 3, this.finAnimacionMorir.bind(this));
        this.esCocaCola = true;
    }
}