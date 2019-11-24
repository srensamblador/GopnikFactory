class MenuLayer extends Layer {
    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.fondo =
            new Fondo(imagenes.menu_fondo, canvasWidth * 0.5, canvasHeight * 0.5);
        this.boton_easy =
            new Boton(imagenes.boton_easy, canvasWidth * 0.5, canvasHeight * 0.55);
        this.selector_easy =
            new Fondo(imagenes.selector_modo, canvasWidth * 0.5 + this.boton_easy.ancho/2, canvasHeight * 0.55);
        this.boton_normal =
            new Boton(imagenes.boton_normal, canvasWidth * 0.5, canvasHeight * 0.75);
        this.selector_normal =
            new Fondo(imagenes.selector_modo, canvasWidth * 0.5 + this.boton_normal.ancho/2, canvasHeight * 0.75);
    }

    calcularPulsaciones(pulsaciones) {
        this.boton_normal.pulsado = false;
        this.boton_easy.pulsado = false;

        for (var i = 0; i < pulsaciones.length; i++) {
            if (this.boton_normal.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.boton_normal.pulsado = true;
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.continuar = true;
                    nivel = 0;
                }
            }
            else if (this.boton_easy.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.boton_easy.pulsado = true;
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.continuar = true;
                    nivel = 1;
                }
            }
        }

        if (!this.boton_normal.pulsado && !this.boton_easy.pulsado) {
            controles.continuar = false;
        }
    }

    procesarControles() {
        // siguiente pantalla
        if (controles.continuar) {
            reproducirEfecto(efectos.start);
            gameLayer = new GameLayer();
            layer = gameLayer;
            controles.continuar = false;
        }
        if (controles.pausar){
            controles.pausar = false;
        }
        if (controles.menuUp){
            controles.menuUp = false;
            nivel ^= 1;
        }
        if (controles.menuDown){
            controles.menuDown = false;
            nivel ^= 1;
        }
    }


    dibujar() {
        this.fondo.dibujar();
        this.boton_normal.dibujar();
        this.boton_easy.dibujar();

        if (nivel == 0)
            this.selector_normal.dibujar();
        else
            this.selector_easy.dibujar();
    }
}