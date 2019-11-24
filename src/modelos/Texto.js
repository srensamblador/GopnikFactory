class Texto {

    constructor(valor, x, y) {
        this.valor = valor;
        this.x = x;
        this.y = y;
        this.color = "white";
    }

    dibujar (){
        contexto.font = "16px Tahoma";
        contexto.fillStyle = this.color;
        contexto.textAlign = "left";
        contexto.fillText(this.valor,this.x,this.y);
    }

}
