class CajaNormal extends Caja{
    constructor(x, y){
        super(imagenes.caja, x, y);
        this.deliver_sfx = efectos.score;
        this.break_sfx = efectos.glass;
    }
}