function Cola () {	
	this.indice = 0;
	this.isfull = false;
	this.cliente = {};
	this.ad = 0;
	
	this.nuevoCliente = function(){

		if (this.isfull == false) {
			if (this.indice < 20){				
				this.cliente[this.indice] = new Cliente(270, 250, this.indice, Math.floor((Math.random() * 3) + 1));
				this.cliente[this.indice].definirItem(Math.floor((Math.random() * 6)));			
				for (i = 0; i < this.indice; i++){
					x1 = this.cliente[this.indice].x;
					if (x1 == this.cliente[i].x) {
						this.cliente[this.indice].x -= 70;
					}
				}
				this.indice++;
				this.ad++;
			}else{				
				this.indice = 0;
				this.isfull = true;	
				this.ad = 20;			
			}
		}else{
			this.cliente[this.indice].reciclar(270, 250, Math.floor((Math.random() * 3) + 1));
			this.cliente[this.indice].definirItem(Math.floor((Math.random() * 6)));
			for (i = 0; i < 20; i++){
					if (i != this.indice){
						x1 = this.cliente[this.indice].x;
						if (x1 == this.cliente[i].x
							&& this.cliente[i].isActivo 
							&& this.cliente[i].sentado == false){						
							this.cliente[this.indice].x -= 70;
						}
					}				}
			this.indice++;
			if (this.indice > 19){
				this.indice = 0;
			}			
		}
		this.seguro();
			
	}



	this.getCliente = function(i){
		return this.cliente[i];
	}

	this.alguienSeSento = function(){
		for (i = 0; i < this.ad; i++){
			if (this.cliente[i].sentado == false && this.cliente[i].isActivo){
				this.cliente[i].x += 70;
			}
		}
	}

	this.limpiarCola = function(){
		for (i = 0; i < this.ad; i++){
			this.cliente[i].mefui = 0;
			if (this.cliente[i].sentado == false){
				this.cliente[i].isActivo = false;
				this.cliente[i].x = 2000;
			}
		}
	}
	this.seguro = function(){
		for (i = 0; i < this.ad; i++){
			for (j = 0; j < this.ad; j++){
				if (i != j){
					if (this.cliente[i].x == this.cliente[j].x
						&& this.cliente[i].isActivo
						&& this.cliente[i].sentado == false
						&& this.cliente[j].isActivo
						&& this.cliente[j].sentado == false){
						this.cliente[i].x -= 70;
					}
				}
			}
		}
	}

	this.juegoNuevo = function(){
		for (i = 0; i < this.ad; i++){
			this.cliente[i].mefui = 0;			
			this.cliente[i].sentado = false;
			this.cliente[i].isActivo = false;
			this.cliente[i].x = 2000;
			this.cliente[i].selecto = false;
			this.cliente[i].sentado = false;			
		}
	}	
}