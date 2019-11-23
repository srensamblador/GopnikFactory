class CajaDeluxe extends Caja{
    constructor(x,y){
        super(imagenes.caja_deluxe, x, y);
        this.puntos = 30;
        this.animacion = new Animacion(imagenes.caja_deluxe_idle, this.ancho, this.alto, 12, 2);
        this.aMorir = new Animacion(imagenes.caja_deluxe_morir, this.ancho, this.alto, 12, 7, this.finAnimacionMorir.bind(this));
        this.deliver_sfx = efectos.cheeki;
        this.break_sfx = efectos.explosion;
    }
}