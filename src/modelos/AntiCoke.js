class AntiCoke extends Modelo{
    constructor(x, y){
        super(imagenes.anticoke, x, y);
        this.sfx = efectos.alarm;
    }

    activar(gamelayer){
        reproducirEfecto(this.sfx);
        for (var i=0; i < gamelayer.cajas.length; i++){
            var caja = gamelayer.cajas[i]
            if (caja.esCocaCola){
                gamelayer.espacio.eliminarCuerpoDinamico(caja);
                gamelayer.cajas.splice(i, 1);
                i = i-1;
            }
        }
    }
}