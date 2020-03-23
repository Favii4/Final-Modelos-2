$(document).ready(inicio);

function inicio() {
	lienzo = $("#lienzo")[0];
	fondo = $("#fondo")[0];
	corazon = $("#corazon")[0];
	corazonMuerto = $("#corazonMuerto")[0];
	imgExplosion = $("#corazonMuerto")[0];
	imgInstrucciones = $("#instruccion1")[0];
	imgBug = $("#fondoBug")[0];

	$("#menuSonido")[0].play();
	contexto = lienzo.getContext("2d");
	buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;

	b = true;
	velocidadJuego = 3000;
	vida = 0;
	puntaje = 0;

	isInMenu = true;
	isInGame = false;
	isInGameOver = false;
	isInInstructions = false;
	isInExit = false;

	pagina = 0;
	btnAtras = false;
	btnAtrasSelecto = false;
	btnSiguiente = false;
	btnSiguienteSelecto = false;
	btnMenu = false;
	btnMenuSelecto = false;

	bug = 0;
	xCapataz = 3000;

	boton = [new Boton("Juego Nuevo", 80, 250),
			new Boton("Instrucciones", 80, 350),
			new Boton("Emm Salir?", 80, 450),
			new Boton("Continuar", 330, 500),
			new Boton("Eeh.. Menu ._.", 330, 450)];

	morraco = new Morraco(360, 250);
	morraco.cambiarPerfil("frente der");

	mesa = [];
	mesa[0] = new Mesa(335, 190);
	mesa[1] = new Mesa(670, 190);
	mesa[2] = new Mesa(560, 290);
	mesa[3] = new Mesa(450, 400);
	mesa[4] = new Mesa(835, 400);

	basura = false;
	basuraSelecta = false;

	numMesa = 0;
	numPedido = 0;
	pedido = [];

	for (i = 0; i < 5; i++){
		pedido[i] = new Pedido();
	}

	asistente = [];
	asistente[0] = new Asistente(435, 135, 1);
	asistente[1] = new Asistente(780, 135, 1);
	asistente[2] = new Asistente(660,235, 2);
	asistente[3] = new Asistente(560,345, 2);
	asistente[4] = new Asistente(940, 345, 3);

	objetivoLadron = 0;
	ladron = new Ladron(Math.floor((Math.random() * 2)));
	policia = new Policia();

	explosion = false;
	idExplosion = 0;
	xExplosion = 0;
	yExplosion = 0;

	var hiloPaciencia;
	var hiloAtender;
	var hiloLlegada;
	var hiloColados;
	var hiloMorraco;
	var hiloLlegadaLadrones;
	var hiloLadrones;
	var hiloMisilDisparado;
	var hiloMisil;
	var hiloPolicia;

	var hiloLlegaCapataz;

	cola = new Cola();
	eventos();
	dibujar();

}


function nuevoJuego(){
	$("#menuSonido")[0].pause();
	$("#sonidoJuego2")[0].currentTime = 0;
	$("#sonidoJuego2")[0].play();
	vida = 5;
	puntaje = 0;
	velocidadJuego = 0;
	morraco.cambiarPerfil("frente der");
	morraco.x = 360;
	morraco.y = 250;
	morraco.item = "";
	morraco.desplazandose = false;
	ladron.img = $("#croquis")[0];
	ladron.isVivo = false;
	ladron.misilIsDisparado = false;
	ladron.isDisparando = false;
	ladron.isDesplazandose = false;
	policia.isDisparando = false;
	explosion = false;
	idExplosion = 0;
	xExplosion = 0;
	yExplosion = 0;
	objetivoLadron = 0;
	explosion = false;
	idExplosion = 0;
	xExplosion = 0;
	yExplosion = 0;

	basura = false;
	basuraSelecta = false;

	for (i = 0; i < 5; i++){
		mesa[i].ocupada = false;
		mesa[i].pasado = false;
		mesa[i].tiempoUso = -1;
		mesa[i].indiceCliente = -1;
		mesa[i].isUtil = true;
		mesa[i].indicePedido = false;
		mesa[i].clienteEnMesa = null;
		asistente[i].isVivo = true;
		asistente[i].cuerpo = true;
		pedido[i].existe = false;
		pedido[i].isPasando = false;
		pedido[i].isInMesa = false;
	}

	cola.juegoNuevo();
	cola.nuevoCliente();
	hiloPaciencia = setInterval("acabarPaciencia()", 1000);
	hiloAtender = setInterval("atenderClientes()", 1000);
	hiloLlegada = setInterval("llegaCliente()", 2500);
	//hiloColados = setInterval("colados()", 475);
	hiloMorraco = setInterval("moverMorraco()", 6);
	hiloLlegadaLadrones = setInterval("llegaLadron()", 15000);
	hiloLadrones = setInterval("moverLadron()", 30);
	hiloLimpieza = setInterval("limpiarCadaveres()", 5000);

}

function sentarCliente(clien, i){
	$("#sentarCliente")[0].play();
	if (mesa[i].isUtil){
		mesa[i].ocupada = true;
		mesa[i].recibirCliente(clien, asistente[i]);

		clien.x = mesa[i].x - 10;
		clien.y = mesa[i].y - 55;
		clien.sentado = true;
		clien.selecto = false;
		morraco.isSelecto = true;
		cola.alguienSeSento();
	}
}

function acabarPaciencia(){

	for (i = 0; i < 5; i++){
		if (mesa[i].ocupada){
			if (mesa[i].isUtil && mesa[i].esperaEnMesa(cola.getCliente(mesa[i].clienteEnMesa.indice), pedido[mesa[i].indicePedido]) > 0){
				vida--;
				berificarGameOver();
			}
		}
	}
	for (i = 0; i < cola.ad; i++){
		cola.getCliente(i).acabarpaciencia();
		if (cola.getCliente(i).mefui != 0){
			vida--;
			berificarGameOver();
		}
		if (cola.getCliente(i).x < -10){
			cola.limpiarCola();
			vida--;
			berificarGameOver();
			return;
		}
	}

	clearInterval("acabarPaciencia()");
}



function berificarGameOver(){
	if (vida == 0){
		//clearInterval(hiloDificultad);
		clearInterval(hiloPaciencia);
		clearInterval(hiloAtender);
		clearInterval(hiloLlegada);
		//clearInterval(hiloColados);
		clearInterval(hiloMorraco);
		clearInterval(hiloLlegadaLadrones);
		clearInterval(hiloLadrones);
		clearInterval(hiloLimpieza);

		if (ladron.misilIsDisparado){
			clearInterval(hiloMisilDisparado);
		}
		if (ladron.isDisparando){
			clearInterval(hiloMisil);

		}
		if (policia.isDisparando){
			clearInterval(hiloPolicia);
		}

		isInMenu = false;
		isInGame = false;
		isInGameOver = true;
		isInInstructions = false;
		isInExit = false;
		$("#sonidoJuego2")[0].pause();
		$("#fail")[0].currentTime = 0;
		$("#fail")[0].play();
		return
	}
}
function colados(){
	cola.muevanseQueSeColan();
	clearInterval("colados()");
}

function atenderClientes(){
	for (i = 0; i < 5; i++){
		if (mesa[i].clienteEnMesa != null && mesa[i].seEntregoPedido){
			puntaje += mesa[i].atender(puntaje, cola.getCliente(mesa[i].clienteEnMesa.indice));
		}
	}
	clearInterval("atenderClientes()");
}

function llegaCliente(){
	cola.nuevoCliente();
	sonidoFondo = $("#llegadaCliente")[0].play();
	console.log(cola.indice);
	clearInterval("llegaCliente()");
}


this.tomarPedido = function(mesa){
	if (mesa.seTomoPedido == false){
		$("#cogerItem")[0].play();
		for (i = 0; i < 5; i++){
			if (pedido[i].existe == false){
				mesa.indicePedido = i;
				pedido[i].setPedido(mesa.clienteEnMesa.item, mesa.clienteEnMesa.imgItem, i);
				return;
			}
		}
	}
}

this.entregarItem = function(mesa){
	if (morraco.item == mesa.clienteEnMesa.item){
		mesa.seEntregoPedido = true;
		morraco.item = "";
		pedido[numPedido].existe = false;
		sonidoFondo = $("#cogerItem")[0].play();
	}
}

function moverMorraco(){
	if(morraco.isDesplazandose){
		if (morraco.y < morraco.yObjetivo){
			morraco.y += 5;
		}else{
			if (morraco.x < morraco.xObjetivo){
				morraco.x += 5;
				morraco.cambiarPerfil("frente izq");
			}else{
				if (morraco.x > morraco.xObjetivo){
					morraco.x -= 5;
					morraco.cambiarPerfil("frente der");
				}else{
					if (morraco.y > morraco.yObjetivo){
						morraco.y -= 5;
					}else{
						morraco.isDesplazandose = false;
						//Coger Pedidos
						if (numMesa == 6){
							if (basura && morraco.item != ""){
								morraco.item = "";
								basura = false;
								pedido[numPedido].existe = false;
							}
							if (pedido[numPedido].existe && morraco.item == ""){
								morraco.recogerItem(pedido[numPedido]);
								pedido[numPedido].isInMesa = false;
								$("#cogerItem")[0].play();
								return
							}
							if (pedido[numPedido].existe && morraco.item != ""){
								morraco.recogerItem(pedido[numPedido]);
								for (i = 0; i < 5; i++){
									if (pedido[i].existe){
										pedido[i].isInMesa = true;
									}
								}
								morraco.recogerItem(pedido[numPedido]);
								pedido[numPedido].isInMesa = false;
								$("#cogerItem")[0].play();
							}

							return;
						}
						//Tomar Pedidos
						if (mesa[numMesa].clienteEnMesa != null){
							tomarPedido(mesa[numMesa]);
							mesa[numMesa].seTomoPedido = true;
						}
						//EntregarPedidos
						if (mesa[numMesa].clienteEnMesa != null && morraco.item != ""){
							entregarItem(mesa[numMesa]);
						}
					}
				}
			}
		}
	}
}


function llegaLadron(){
	if (ladron.isVivo == false){
		ladron.llegar(0, Math.floor((Math.random() * 300) + 110));
	}
	clearInterval("llegaLadron()");
}

function moverLadron(){
	if (ladron.isDesplazandose){
		ladron.x += 2;
		if (ladron.x == 150){

			ladron.isDesplazandose = false;
			ladron.isDisparando = true;

			hiloMisil = setInterval("recargaMisil()", 3500);
		}
	}
}

function recargaMisil(){
	if (ladron.isVivo){
		ladron.fijarObjetivo(objetivoLadron);
		ladron.misilIsDisparado = true;
		ladron.xMisil = ladron.x + 120;
		ladron.yMisil = ladron.y + 60;

		pasoX = ladron.xObjetivoMisil - ladron.xMisil;
		pasoY = 2*(ladron.yObjetivoMisil - ladron.yMisil)/pasoX;

		hiloMisilDisparado = setInterval("disparar(pasoY)", 1);
	}else{
		clearInterval(hiloMisil);
		//clearInterval(hiloMisilDisparado);
	}

	clearInterval("recargaMisil(indice)");
}


function disparar(paso) {
	if (ladron.misilIsDisparado){
		$("#disparo")[0].play();
		ladron.xMisil += 2;
		ladron.yMisil += paso;
		if (mirarContactoMesa(ladron.xMisil, ladron.yMisil, objetivoLadron)
		|| mirarContactoMesa(ladron.xMisil + 45, ladron.yMisil, objetivoLadron)
		|| mirarContactoMesa(ladron.xMisil, ladron.yMisil + 12, objetivoLadron)
		|| mirarContactoMesa(ladron.xMisil + 45, ladron.yMisil + 12, objetivoLadron)) {
			vida--;
			berificarGameOver();
			if (vida == 0){
				clearInterval(hiloMisil);
				clearInterval(hiloMisilDisparado);
				return;
			}
			asistente[objetivoLadron].isVivo = false;
			ladron.misilIsDisparado = false;
			explosion = true;

			if (mesa[objetivoLadron].clienteEnMesa == null){
				mesa[objetivoLadron].explotar();

			}else{
				mesa[objetivoLadron].explotarConCliente(cola.getCliente(mesa[objetivoLadron].clienteEnMesa.indice), pedido[mesa[objetivoLadron].indicePedido]);
			}

			xExplosion = mesa[objetivoLadron].x - 10;
			yExplosion = mesa[objetivoLadron].y - 150;
			objetivoLadron++;
			hiloExplosion = setInterval("asd()", 100);
			clearInterval(hiloMisilDisparado);
		}
	}
}

function solicitarProteccion(){

	if (ladron.isVivo){
		policia.isDisparando = true;
		policia.xObjetivo = ladron.x;
		policia.yObjetivo = ladron.y;

		policia.xMisilPolicia = policia.x - 20;
		policia.yMisilPolicia = policia.y + 60;

		pX = policia.xMisilPolicia - policia.xObjetivo;
		pY = 2*(policia.yObjetivo - policia.yMisilPolicia)/pX;
		hiloPolicia = setInterval("dispararPolicia(pY)", 1);
	}else{
		sonidoFondo = $("#error")[0].play();
	}
}

function dispararPolicia(paso){

	if (policia.isDisparando){
		$("#disparo")[0].play();
		policia.xMisilPolicia -= 2;
		policia.yMisilPolicia += paso;
		if (mirarContactoLadron(policia.xMisilPolicia, policia.yMisilPolicia)
		|| mirarContactoLadron(policia.xMisilPolicia + 45, policia.yMisilPolicia)
		|| mirarContactoLadron(policia.xMisilPolicia, policia.yMisilPolicia + 12)
		|| mirarContactoLadron(policia.xMisilPolicia + 45, policia.yMisilPolicia + 12)) {

			puntaje += 500;
			ladron.isVivo = false;
			ladron.misilIsDisparado = false;
			ladron.isDisparando = false;
			ladron.isDesplazandose = false;
			policia.isDisparando = false;
			explosion = true;

			xExplosion = ladron.x - 10;
			yExplosion = ladron.y - 150;

			ladron.img = $("#cadaver")[0];
			hiloExplosion = setInterval("asd()", 100);
			clearInterval(hiloPolicia);
		}
	}
}

function asd(){
	sonidoFondo = $("#explosion")[0].play();
	switch(idExplosion){
		case 0:
			imgExplosion = $("#explosion1")[0];
			idExplosion++;
			break;
		case 1:
			imgExplosion = $("#explosion2")[0];
			idExplosion++;
			break;
		case 2:
			imgExplosion = $("#explosion3")[0];
			idExplosion++;
			break;
		case 3:
			imgExplosion = $("#explosion4")[0];
			idExplosion++;
			break;
		case 4:
			imgExplosion = $("#explosion5")[0];
			idExplosion++;
			break;
		case 5:
			imgExplosion = $("#explosion6")[0];
			idExplosion++;
			break;
		case 6:
			imgExplosion = $("#explosion7")[0];
			idExplosion++;
			break;
		case 7:
			imgExplosion = $("#explosion8")[0];
			idExplosion++;
			break;
		case 8:
			explosion = false;
			idExplosion = 0;
			clearInterval(hiloExplosion);
			break;
	}
}

function mirarContactoMesa(x1, y1, ind){
	b = false;
	if (x1 >= mesa[ind].x
		&& x1 <= mesa[ind].x + 185
		&& y1 >= mesa[ind].y
		&& y1 <= mesa[ind].y + 68){
			b = true;
		}
	return b;
}

function mirarContactoLadron(x1, y1){
	b = false;
	if (x1 >= ladron.x
		&& x1 <= ladron.x + 90
		&& y1 >= ladron.y
		&& y1 <= ladron.y + 90){
			b = true;
		}
	return b;
}

function limpiarCadaveres(){
	for (i = 0; i < 5; i++){
		if (asistente[i].isVivo == false){
			asistente[i].cuerpo = false;
		}
	}
	if (ladron.isVivo == false){
		ladron.img = $("#croquis")[0];
	}
}

function cambiarPagina(){
	btnAtras = true;
	btnSiguiente = true;
	btnMenu = true;
	switch(pagina){
		case 0:
			btnAtras = false;
			imgInstrucciones = $("#instruccion1")[0];
			break;
		case 1:
			imgInstrucciones = $("#instruccion2")[0];
			break;
		case 2:
			imgInstrucciones = $("#instruccion3")[0];
			break;
		case 3:
			imgInstrucciones = $("#instruccion4")[0];
			break;
		case 4:
			imgInstrucciones = $("#instruccion5")[0];
			break;
		case 5:
			imgInstrucciones = $("#instruccion6")[0];
			break;
		case 6:
			imgInstrucciones = $("#instruccion7")[0];
			break;
		case 7:
			imgInstrucciones = $("#instruccion8")[0];
			break;
		case 8:
			imgInstrucciones = $("#instruccion9")[0];
			break;
		case 9:
			btnSiguiente = false;
			imgInstrucciones = $("#instruccion10")[0];
			break;
	}
}

function bugs(){
	switch(bug){
		case 0:
			imgBug = $("#fondoBug")[0];
			boton[4].texto = "Eeh.. Menu ._.";
			boton[4].x = 330;
			boton[4].y = 450;
			bug++;
			break;
		case 1:
			imgBug = $("#fondoBug1")[0];
			boton[4].texto = "Em si Por favor";
			boton[4].x = 100;
			boton[4].y = 10;
			bug++;
			break;
		case 2:
			imgBug = $("#fondoBug2")[0];
			boton[4].x = 650;
			boton[4].y = 450;
			boton[4].texto = "Abrirse";
			hiloLlegaCapataz = setInterval("traerAlCapataz()", 20);
			bug++;
			break;
		case 3:
			isInMenu = true;
			isInGame = false;
			isInGameOver = false;
			isInInstructions = false;
			isInExit = false;
			xCapataz =
			clearInterval(hiloLlegaCapataz);
			$("#grito")[0].pause();
			$("#grito")[0].currentTime = 0;
			$("#suspenso")[0].pause();
			break;
	}
}

function traerAlCapataz(){
	xCapataz--;
}


function eventos(event){
		// Código para Cuando se mueve el cursor
		contexto.canvas.addEventListener('mousemove', function(event){
		var x = event.clientX - contexto.canvas.offsetLeft;
		var y = event.clientY - contexto.canvas.offsetTop;
		//Si esta en el Menu
		if (isInMenu){
			a = 0;
			for (i = 0; i < 3; i++){
				if (x >= boton[i].x
					&& x <= boton[i].x + 445
					&& y >= boton[i].y
					&& y <= boton[i].y + 90){
						boton[i].isPasando = true;
						if (b){
							$("#cambiarBoton")[0].play();
							b = false;
						}
					}else{
						boton[i].isPasando = false;
						boton[i].isSelecto = false;
						a++;
						if (a == 3){
							b = true;
						}
					}

		}
			return;
		}
		//Si esta Jugando
		if (isInGame){
			for (j = 0; j < cola.ad; j++) {
				if (cola.getCliente(j).isActivo){
					if (x >= cola.getCliente(j).x
					&& x <= cola.getCliente(j).x + 66
					&& y >= cola.getCliente(j).y
					&& y <= cola.getCliente(j).y + 80
					&& cola.getCliente(j).sentado == false){
						cola.getCliente(j).pasado = true;
					}else{
						cola.getCliente(j).pasado = false;
					}
					if (cola.getCliente(j).selecto || morraco.isSelecto){
						for (i = 0; i < 5; i++){
							if (x >= mesa[i].x
								&& x <= mesa[i].x + 180
								 && y >= mesa[i].y
								 && y <= mesa[i].y + 80
								 && (mesa[i].ocupada == false || morraco.isSelecto)){
								mesa[i].pasado = true;
							}else{
								mesa[i].pasado = false;
							}
						}
					}
				}
			}
			if (x >= morraco.x
					&& x <= morraco.x + 66
					&& y >= morraco.y
					&& y <= morraco.y + 80){
						morraco.isPasando = true;
					}else{
						morraco.isPasando = false;
					}
			if (x >= policia.x
					&& x <= policia.x + 90
					&& y >= policia.y
					&& y <= policia.y + 90){
						policia.isPasando = true;
					}else{
						policia.isPasando = false;
					}
			if (x >= 650
					&& x <= 690
					&& y >= 530
					&& y <= 596){
						basuraSelecta = true;
					}else{
						basuraSelecta = false;
					}
			for (i = 0; i < 5; i++){
				if (x >= (400 - i*60)
					&& x <= (400 - i*60) + 50
					&& y >= 465
					&& y <= 515){
						pedido[i].isPasando = true;
						return;
					}else{
						pedido[i].isPasando = false;
					}
			}
			return;
		}
		if (isInGameOver){
			if (x >= boton[3].x
				&& x <= boton[3].x + 445
				&& y >= boton[3].y
				&& y <= boton[3].y + 90){
					boton[3].isPasando = true;
				}else{
					boton[3].isPasando = false;
					boton[3].isSelecto = false;
				}
		}
		if (isInInstructions){
			if (x >= 5
					&& x <= 155
					&& y >= 20
					&& y <= 75){
						btnAtrasSelecto = true;
					}else{
						btnAtrasSelecto = false;
					}
			if (x >= 165
					&& x <= 315
					&& y >= 20
					&& y <= 75){
						btnMenuSelecto = true;
					}else{
						btnMenuSelecto = false;
					}
			if (x >= 325
					&& x <= 475
					&& y >= 20
					&& y <= 75){
						btnSiguienteSelecto = true;
					}else{
						btnSiguienteSelecto = false;
					}
		}
		if (isInExit){
			if (x >= boton[4].x
				&& x <= boton[4].x + 445
				&& y >= boton[4].y
				&& y <= boton[4].y + 90){
					boton[4].isPasando = true;
				}else{
					boton[4].isPasando = false;
					boton[4].isSelecto = false;
				}
		}
	});
		// Código para Cuando se Clickea
		contexto.canvas.addEventListener('click', function(event){
		var x = event.clientX - contexto.canvas.offsetLeft;
		var y = event.clientY - contexto.canvas.offsetTop;
		//Si esta en el Menu
		if (isInMenu){
			for (i = 0; i < 3; i++){
				if (x >= boton[i].x
					&& x <= boton[i].x + 445
					&& y >= boton[i].y
					&& y <= boton[i].y + 90){
						boton[i].isSelecto = true;
						switch(i){
							case 0:
								isInMenu = false;
								isInGame = true;
								isInGameOver = false;
								isInInstructions = false;
								isInExit = false;
								nuevoJuego();
								$("#entregar")[0].play();
								break;
							case 1:
								isInMenu = false;
								isInGame = false;
								isInGameOver = false;
								isInInstructions = true;
								isInExit = false;
								cambiarPagina();
								$("#entregar")[0].play();
								break;
							case 2:
								$("#entregar")[0].play();
								isInMenu = false;
								isInGame = false;
								isInGameOver = false;
								isInInstructions = false;
								isInExit = true;
								bug = 0;
								boton[4].x = 330;
								bugs();
								$("#menuSonido")[0].pause();
								$("#menuSonido")[0].currentTime = 0;
								$("#suspenso")[0].currentTime = 0;
								$("#suspenso")[0].play();
								break;
						}
						return;

					}else{
						boton[i].isSelecto = false;
					}
			}
			return;
		}
		//Si esta Jugando
		if (isInGame){
			for (j = 0; j < cola.ad; j++){
				if (cola.getCliente(j).isActivo){
					if (x >= cola.getCliente(j).x
					&& x <= cola.getCliente(j).x + 66
					&& x >= 270
					&& x <= 330
					&& y >= cola.getCliente(j).y
					&& y <= cola.getCliente(j).y + 80
					&& cola.getCliente(j).sentado == false){
						if (cola.getCliente(j).selecto){
							cola.getCliente(j).selecto = false;
						}else{
							cola.getCliente(j).selecto = true;
						}
						morraco.isSelecto = false;
					}
					if (cola.getCliente(j).selecto){
						for (i = 0; i < 5; i++){
							if (x >= mesa[i].x && x <= mesa[i].x + 180 && y >= mesa[i].y && y <= mesa[i].y + 80 && mesa[i].ocupada == false){
								sentarCliente(cola.getCliente(j), i);
								return;
							}
						}
					}
					if (morraco.isSelecto){
						for (i = 0; i < 5; i++){
							if (x >= mesa[i].x && x <= mesa[i].x + 180 && y >= mesa[i].y && y <= mesa[i].y + 80){
								numMesa = i;
								morraco.desplazarce(numMesa);
								morraco.isDesplazandose = true;
								return;
							}
						}
					}
				}
			}
			if (x >= morraco.x
				&& x <= morraco.x + 66
				&& y >= morraco.y
				&& y <= morraco.y + 80){
					morraco.isSelecto = true;
					for (i = 0; i < cola.ad; i++){
						cola.getCliente(i).selecto = false;
					}
				}
			if (x >= policia.x
					&& x <= policia.x + 90
					&& y >= policia.y
					&& y <= policia.y + 90){
						solicitarProteccion();
					}
			if (x >= 650
					&& x <= 690
					&& y >= 530
					&& y <= 596
					&& morraco.isSelecto){
						basura = true;
						numMesa = 6;
						morraco.xObjetivo = 575;
						morraco.yObjetivo = 550;
						morraco.isDesplazandose = true;
					}
			for (i = 0; i < 5; i++){
				if (x >= (400 - i*60)
					&& x <= (400 - i*60) + 50
					&& y >= 465
					&& y <= 515
					&& morraco.isSelecto){
						numPedido = i;
						numMesa = 6;
						morraco.xObjetivo = 400 - i * 60;
						morraco.yObjetivo = 430;
						morraco.isDesplazandose = true;
						return;
					}
			}
			return;
		}
		if (isInGameOver){
			if (x >= boton[3].x
				&& x <= boton[3].x + 445
				&& y >= boton[3].y
				&& y <= boton[3].y + 90){
					boton[3].isSelecto = true;
					$("#fail")[0].pause();
					$("#menuSonido")[0].currentTime = 0;
					$("#menuSonido")[0].play();
					isInMenu = true;
					isInGame = false;
					isInGameOver = false;
					isInInstructions = false;
					isInExit = false;

				}else{
					boton[3].isSelecto = false;
				}
		}
		if (isInInstructions){
			if (x >= 5
					&& x <= 155
					&& y >= 20
					&& y <= 75
					&& btnAtras){
						pagina--;
						cambiarPagina();
						$("#entregar")[0].play();
					}
			if (x >= 165
					&& x <= 315
					&& y >= 20
					&& y <= 75){
						isInMenu = true;
						isInGame = false;
						isInGameOver = false;
						isInInstructions = false;
						isInExit = false;
						$("#entregar")[0].play();
					}
			if (x >= 325
					&& x <= 475
					&& y >= 20
					&& y <= 75
					&& btnSiguiente){
						pagina++;
						cambiarPagina();
						$("#entregar")[0].play();
					}
		}
		if (isInExit){
			if (x >= boton[4].x
				&& x <= boton[4].x + 445
				&& y >= boton[4].y
				&& y <= boton[4].y + 90){
					boton[4].isSelecto = true;
					$("#entregar")[0].play();
					bugs();
				}else{
					if (bug < 2){
						 $("#error")[0].play();
					}else{
						 $("#grito")[0].play();
					}
				}
		}

	});
}

function dibujar(){
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
	contextoBuffer.font = "bold 22px Showcard Gothic";
	//contextoBuffer.textAlign="start";
	if (isInMenu){
		contextoBuffer.drawImage($("#fondoMenu")[0],0,0);
		for (i = 0; i < 3; i++){
			boton[i].dibujar(contextoBuffer);
		}
	}

	if (isInGame){
		contextoBuffer.drawImage(fondo,0,0);
		contextoBuffer.strokeStyle = "black";
		contextoBuffer.fillStyle = "Yellow";
		contextoBuffer.textAlign = "start";

		contextoBuffer.fillText("Puntaje: " + puntaje, 20, 25);//Escribir el Puntaje
		contextoBuffer.strokeText("Puntaje: " + puntaje, 20, 25);


		policia.dibujar(contextoBuffer);
		if (basuraSelecta){
			contextoBuffer.drawImage($("#basura")[0], 640, 525, 45, 70);
		}else{
			contextoBuffer.drawImage($("#basura")[0], 650, 530);
		}

		// Codigo orden de pintado ladron y clientes
		if (ladron.y < 200){
			ladron.dibujar(contextoBuffer);
			for (i = 0; i < cola.ad; i++){
				cola.getCliente(i).dibujar(contextoBuffer);
			}

		}
		if (ladron.y > 300){
			for (i = 0; i < cola.ad; i++){
				cola.getCliente(i).dibujar(contextoBuffer);
			}
			ladron.dibujar(contextoBuffer);
		}

		for (i = 0; i < 5; i++){
			if (vida > i){
				contextoBuffer.drawImage(corazon, 940 - (32*i) , 5);
			}else{
				contextoBuffer.drawImage(corazonMuerto, 940 - (32*i) , 5);
			}
		}
		//Codigo para el orden de pintado del morraco y las mesas
		if (morraco.y < 235){
			for (i = 0; i < 2; i++) {
			 	asistente[i].dibujar(contextoBuffer);
			 	mesa[i].dibujar(contextoBuffer);
			}
			morraco.dibujar(contextoBuffer);
			for (i = 2; i < 5; i++) {
			 	asistente[i].dibujar(contextoBuffer);
			 	mesa[i].dibujar(contextoBuffer);
			}
		}
		if (morraco.y > 235 && morraco.y < 345){
			for (i = 0; i < 3; i++) {
			 	asistente[i].dibujar(contextoBuffer);
			 	mesa[i].dibujar(contextoBuffer);
			}
			morraco.dibujar(contextoBuffer);
			for (i = 3; i < 5; i++) {
			 	asistente[i].dibujar(contextoBuffer);
			 	mesa[i].dibujar(contextoBuffer);
			}
		}
		if (morraco.y > 345){
			for (i = 0; i < 5; i++) {
			 	asistente[i].dibujar(contextoBuffer);
			 	mesa[i].dibujar(contextoBuffer);
			}
			morraco.dibujar(contextoBuffer);
		}
		//Sep es algo muy feo
		//Pintar Mesita y lo que hay sobre ella
		contextoBuffer.drawImage($("#mesita")[0], -30, 475);
		for (i = 0; i < 5; i++){
			pedido[i].dibujar(contextoBuffer, 400 - i*60, 465);
		}
	}

	if (isInGameOver){
		contextoBuffer.drawImage($("#gameOver")[0],0,0);
		contextoBuffer.fillStyle="blue";
		contextoBuffer.font = "bold 36px Showcard Gothic";
		contextoBuffer.textAlign="center";
		contextoBuffer.fillText("Su Puntaje Total Fue: " + puntaje, 562, 180);
		puntajeTotal = puntaje;
		boton[3].dibujar(contextoBuffer);
	}

	if (explosion){
		contextoBuffer.drawImage(imgExplosion, xExplosion, yExplosion);
	}

	if (isInInstructions){
		contextoBuffer.drawImage(imgInstrucciones, 0, 0);
		if (btnAtras){
			if (btnAtrasSelecto){
				contextoBuffer.drawImage($("#btnAtrasSelecto")[0],5,20);
			}else{
				contextoBuffer.drawImage($("#btnAtras")[0],5,20);
			}
		}
		if (btnMenu){
			if (btnMenuSelecto){
				contextoBuffer.drawImage($("#btnMenuSelecto")[0],165,20);
			}else{
				contextoBuffer.drawImage($("#btnMenu")[0],165,20);
			}
		}
		if (btnSiguiente){
			if (btnSiguienteSelecto){
				contextoBuffer.drawImage($("#btnSiguienteSelecto")[0],325,20);
			}else{
				contextoBuffer.drawImage($("#btnSiguiente")[0],325,20);
			}
		}
	}

	if (isInExit){
		contextoBuffer.drawImage(imgBug,0,0);
		contextoBuffer.drawImage($("#capataz")[0],xCapataz, 50);
		boton[4].dibujar(contextoBuffer);
	}

	contexto.clearRect(0,0,lienzo.width, lienzo.height);
	contexto.drawImage(buffer,0,0);

	hilo = setTimeout("dibujar()", 20);
}
