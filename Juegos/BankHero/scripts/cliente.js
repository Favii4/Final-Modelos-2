function Cliente (x1, x2, index, ti) {
	
	this.x = x1;		
	this.y = x2;
	this.tipo = ti;
	this.indice = index;
	this.pasado = false;
	this.selecto = false;
	this.sentado = false;
	this.isActivo = false;	
	this.mefui = 0;
	
	this.item = "";
	this.pacienciaEnMesa = 20;
	
	switch(this.tipo){
		case 1:
			this.img = $("#cliente1")[0];
			this.paciencia = 24;
			this.necesidad = 12;
			this.isActivo = true;
			break;
		case 2:
			this.img = $("#cliente2")[0];
			this.paciencia = 18;
			this.necesidad = 4;
			this.isActivo = true;
			break;

		case 3:
			this.img = $("#cliente3")[0];
			this.paciencia = 14;
			this.necesidad = 8;
			this.isActivo = true;	
			break;
		}
		
	//console.log(this.x);	
	
	

	this.dibujar = function(ctx){		
		
		ctx.font = "bold 22px Showcard Gothic";
		
		if(this.isActivo){
			//selecto
			if(this.selecto && this.sentado == false){
				flecha = $("#flechita")[0];
				ctx.drawImage(flecha, 290, 170);
				/*ctx.fillStyle="green";
				ctx.fillText(this.necesidad, this.x + 76, this.y + 10);*/
			}
			//si le pasa la flechita del mouse
			if (this.pasado){			
				ctx.drawImage(this.img, this.x-5, this.y-5, 72, 90);			
			}else{			
				ctx.drawImage(this.img, this.x, this.y);
			}		
			
			//mostrar la paciencia del cliente
			if (this.sentado == false){
				if (this.paciencia > 18){
					ctx.fillStyle="white";
				}else{
					if (this.paciencia > 12){
						ctx.fillStyle="orange";
					}else{
						ctx.fillStyle="red";
					}
				}
				ctx.fillText(this.paciencia, this.x + 40, this.y - 10);
			}
		}
			
	} 

	this.reciclar = function(x1, x2, ti) {	//reutilizar los elementos de la cola
		this.x = x1;		
		this.y = x2;
		this.tipo = ti;
		this.definirItem(Math.floor((Math.random() * 6)));
		this.pacienciaEnMesa = 20;
		switch(this.tipo){
			case 1:
				this.img = $("#cliente1")[0];
				this.paciencia = 24;
				this.necesidad = 12;
				this.isActivo = true;				
				break;
			case 2:
				this.img = $("#cliente2")[0];
				this.paciencia = 18;
				this.necesidad = 4;
				this.isActivo = true;
				break;

			case 3:
				this.img = $("#cliente3")[0];
				this.paciencia = 14;
				this.necesidad = 8;
				this.isActivo = true;	
				break;
		}
	}

	this.acabarpaciencia = function(){		
		if (this.sentado == false && this.isActivo){
			this.paciencia--;
		}
		if (this.sentado && this.isActivo){
			this.pacienciaEnMesa--;
		}
		if (this.paciencia < 0 && this.sentado == false && this.isActivo){			
			this.mefui = this.x;
			this.marcharse();					
		}		
	}

	this.definirItem = function(n){
		switch(n){
			case 0:
				this.item = "papeles";
				this.imgItem = $("#papeles")[0];
				break;
			case 1:
				this.item = "recibo";
				this.imgItem = $("#recibo")[0];
				break;
			case 2:
				this.item = "papelH";
				this.imgItem = $("#papelH")[0];
				break;
			case 3:
				this.item = "dinero";
				this.imgItem = $("#dinero")[0];
				break;
			case 4:
				this.item = "carta";
				this.imgItem = $("#carta")[0];
				break;
			case 5:
				this.item = "masterCard";
				this.imgItem = $("#masterCard")[0];
				break;
		}
	}

	this.marcharse = function(){
		this.isActivo = false;
		this.sentado = false;
		this.x = 2000;
	}
}
