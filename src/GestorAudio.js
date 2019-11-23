var musicaAmbiente = new Audio("res/bgm.mp3");
musicaAmbiente.loop = true;

var efectos = {
    explosion : "res/sfx/boom.mp3",
    glass: "res/sfx/glass.mp3",
    cheeki: "res/sfx/cheekibreeki.mp3",
    papali: "res/sfx/papali.mp3",
    coke: "res/sfx/coke.mp3",
    time: "res/sfx/time.mp3",
    score: "res/sfx/cash.mp3"
}

function reproducirMusica() {
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}
