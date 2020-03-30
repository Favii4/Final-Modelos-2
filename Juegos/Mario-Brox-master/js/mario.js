window.addEventListener('load', iniciar, false);
//LLamadas

function iniciar() {
  var subirvol= document.getElementById('masVolumen');
	var bajarvol= document.getElementById('menosVolumen');
  var menu=document.getElementById('inicio');
  var cerrarmenu=document.getElementById('controlesbox')


  subirvol.addEventListener('click',accionSubirVol,false);
	bajarvol.addEventListener('click',accionBajarVol,false);
  menu.addEventListener('click',boton_start,false);
  cerrarmenu.addEventListener('click',cerrarcontroles,false);
}

function boton_start() {

  document.getElementById('menu').style.opacity='0';
  document.getElementById('menu').style.transition="linear 2s";
  iniciar_juego();
}

//Posiciones iniciales.
var bloqueX = Math.random()*230;
var bloqueY = 0;
var marioX = 110;
var marioY = 410;
var combo = 0;
var acierto=0;
var fallo=3;
var velocidad=7;
var activo=1;



//Imagenes.
var img1 = new Image;
img1.src = "./imgs/box.png";
var img2 = new Image;
img2.src = "./imgs/mariod.png";
var gameover = new Image;
gameover.src = "./imgs/mariogameover.gif";

//Sonidos
var next = new Audio('./media/nsmbwiiHurryUp.wav');
var coin = new Audio('./media/nsmbwiiCoin.wav');
var muerto = new Audio('./media/mariodead.mp3');
var perderbloque = new Audio('./media/smw_break_block.wav');
next.volume = 0.6;
function iniciar_juego(){

  lienzo = document.getElementById('lienzo');
  lienzo.style.background= "#f3f3f3 url('./imgs/fondo.jpg') no-repeat right top";
  ctx = lienzo.getContext('2d');

  //Llamar a la función cada 30 milisegundos.
  //Recordar que 1000 milisegundos = 1 segundo
  setInterval(mover, 80);
}

function mover(){

  if (activo==1){
  //muevo la imagen hacia la izquierda restando 5.
  bloqueY = bloqueY + velocidad;

  if (bloqueX>marioX){ bloqueX = bloqueX + Math.random()*2;}
  else
  {bloqueX = bloqueX - Math.random()*2;}
  }
  if (bloqueX > 270){
    bloqueX = bloqueX - Math.random()*2;
  }
  if(bloqueX < 10){
    bloqueX = bloqueX + Math.random()*2;
  }

  //Hitbox de Acierto
  if   (
    (Math.abs(bloqueX-marioX)<35) &&
    (Math.abs(bloqueY-marioY)<35)
        )
  {
  //Incremento de velocidad por combos y puntos.
  console.log(velocidad);
    if (combo == 3 && velocidad <= 15){
      console.log("LVL 1");
    velocidad++;
    combo=0;
    next.play();
    levelupin();

  } else if (combo == 5 && velocidad <= 25) {
    console.log("LVL 2");
    velocidad++;
    combo=0;
    next.play();
    levelupin();
  } else if (combo == 10) {
    console.log("LVL 3");
    velocidad++;
    next.play();
    levelupin();
  }
  // sumar un punto
  acierto++;
  //Sumar Combo
  combo++;

  reposicionar_bloque()
  coin.play();

  }


  if (bloqueY >=550)  
  {
    fallo--;
    if (fallo==0)
    {

    //Borro todo lo que haya en nuestro lienzo
    ctx.clearRect(0,0,lienzo.width,lienzo.height);
    document.getElementById("puntos").innerHTML = acierto;
    document.getElementById('final').style.visibility='visible';
    document.getElementById('final').style.opacity='1';
    document.getElementById('final').style.transition="linear 2s";
    muerto.play();

    activo=0;

    }
    // reposicionar a david
    reposicionar_bloque()
    var audio = new Audio('./media/smw_break_block.wav');
    perderbloque.play();

  }

  if (marioX <= 0){marioX = 0;}
  if (marioX >= 240){marioX = 240;}

  if (activo==1)
  {
    //Borro todo lo que haya en nuestro lienzo
    ctx.clearRect(0,0,lienzo.width,lienzo.height);

    //Dibujo las imágenes en la nueva posición
    ctx.drawImage(img1, bloqueX, bloqueY);
    ctx.drawImage(img2, marioX, marioY);
    ctx.font = "20px Arial";
    ctx.fillText("Puntaje: "+acierto,5,25);
    ctx.fillText("Vidas: "+fallo,225,25);
    puntajeTotal = acierto;  
  }

}

function reposicionar_bloque()
{
  bloqueX = Math.random()*230;
  bloqueY = 0;

}


document.onkeydown = function (event) {
  var teclaC;

  if ( event == null ) {
    teclaC = window.event.keyCode;
  }
  else {
    teclaC = event.keyCode;
  }

  switch (teclaC) {
    case 39:marioX = marioX + 15;
    img2.src = "./imgs/mariod.png";
      break;
    case 37:marioX = marioX - 15;
    img2.src = "./imgs/marioi.png";
      break;
    case 82:
    case 114:
    document.getElementById('final').style.opacity='0';
    document.getElementById('final').style.transition="linear 1s";
    document.getElementById('final').style.visibility='hidden';
      acierto=0;
      fallo=3
      velocidad=7;
      activo=1;

      break;
    //case 38:marioY = marioY - 5;
    //	break;
    //case 40:marioY = marioY + 5;
    //	break;
    default:
  }
}

function accionSubirVol()
{
  next.volume = next.volume+0.1;
  coin.volume = coin.volume+0.1;
  muerto.volume = muerto.volume+0.1;
  perderbloque.volume = perderbloque.volume+0.1;


}
function accionBajarVol()
{
  next.volume = next.volume-0.1;
  coin.volume = coin.volume-0.1;
  muerto.volume = muerto.volume-0.1;
  perderbloque.volume = perderbloque.volume-0.1;
}


//Funcion Sleep para esperar sleep(milisegudnos)

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function levelupin(){
  document.getElementById('lvlup').style.opacity='1';
  document.getElementById('lvlup').style.transition="opacity 3s linear";
  document.getElementById('lvlup').addEventListener('transitionend', levelupout, false);
  console.log("lvlin");
}
function levelupout(){
  document.getElementById('lvlup').style.opacity='0';
  document.getElementById('lvlup').style.transition="opacity 1s linear";
  console.log("Lvlout");
}
function abrircontroles(){
  console.log("ABRIR");
  document.getElementById('controlesbox').style.visibility='visible';
  document.getElementById('controlesbox').style.opacity='1';
  document.getElementById('controlesbox').style.transition="opacity 2s linear";
}
function cerrarcontroles(){
  console.log("Cerrar");
  document.getElementById('controlesbox').style.opacity='0';
  document.getElementById('controlesbox').style.transition="opacity 3s linear";

  document.getElementById('controlesbox').addEventListener('transitionend',efectocontroles(), false);
}

function efectocontroles(){
  document.getElementById('controlesbox').style.visibility='hidden'
}
