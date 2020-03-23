function Ladron(n){
	this.x = 2000;
	this.y = 0;
	this.isVivo = false;
	this.isDisparando = false;
	this.isDesplazandose = false;

	this.imgMisil = $("#misilDer")[0];
	this.xMisil = this.x;
	this.yMisil = this.y;
	this.misilIsDisparado = false;
	
	switch(n){
		case 0:
			this.img = $("#ladron")[0];
			break;
		case 1:
			this.img = $("#ladron1")[0];
	}

	this.llegar = function(x1, y1){
		this.x = x1;
		this.y = y1;
		while (this.y >= 200 && this.y <= 300){
			this.y = Math.floor((Math.random() * 300) + 110)
		}

		n = this.y % 2;
		if(n == 0){
			this.img = $("#ladron")[0];
		}else{
			this.img = $("#ladron1")[0];
		}
		sonidoFondo = $("#llegaLadron")[0].play();
		this.isVivo = true;
		this.isDesplazandose = true;
	}

	this.fijarObjetivo = function(objetivo){		
		this.isDisparando = true;
		switch(objetivo){
			case 0:
				this.xObjetivoMisil = 410;
				this.yObjetivoMisil = 190;
				break;
			case 1:
				this.xObjetivoMisil = 760;
				this.yObjetivoMisil = 190;
				break;
			case 2:
				this.xObjetivoMisil = 650;
				this.yObjetivoMisil = 290;
				break;
			case 3:
				this.xObjetivoMisil = 540;
				this.yObjetivoMisil = 400;
				break;
			case 4:
				this.xObjetivoMisil = 925;
				this.yObjetivoMisil = 400;
				break;
		}				
	}

	this.dibujar = function(ctx){
		
		ctx.drawImage(this.img, this.x, this.y);
		if (this.isDisparando){
			ctx.drawImage($("#lanzacohetes")[0], this.x-30, this.y+40);
			if (this.misilIsDisparado){					
				ctx.drawImage($("#misilIzq")[0], this.xMisil, this.yMisil);
			}
		}
		
		
	}
}