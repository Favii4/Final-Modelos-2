function Policia(){
	this.x = 870;
	this.y = 250;

	this.isMolesto = false;

	this.xObjetivo = 0;
	this.yObjetivo = 0;

	this.xMisilPolicia = 0;
	this.yMisilPolicia = 0;	
	
	this.isDisparando = false;
	this.isPasando = false;	

	this.dibujar = function(ctx){
		if (this.isPasando){
			ctx.drawImage($("#policia")[0], 865, 245, 100, 100);
		}else{
			ctx.drawImage($("#policia")[0], 870, 250);
		}
		if (this.isDisparando){
			ctx.drawImage($("#basuca")[0], 855, 300);
			ctx.drawImage($("#misilDer")[0], this.xMisilPolicia, this.yMisilPolicia);
		}
	}	
}