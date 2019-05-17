const juegoParte1 = {
	iniciarJuego(){
		let validado = false;
		//el "pensador" piensa un numero de 4 cifras (como "1234" o "9072").
		let numeroPensado = pensadorParte1.pensarNumero();
		do{
			//El "adivinador" prueba de adivinar el numero diciendo un numero de 4 cifras
			let numeroAdivinado = adivinadorParte1.adivinarNumero(); 
			if (numeroAdivinado!==0){
				//el "pensador" le dice cuantas cifras están en el lugar correcto y cuantas en el lugar incorrecto
				validado = pensadorParte1.validarNumero(numeroPensado, numeroAdivinado);
			}
			else{
				break;
			}	
		}while(validado!==true);
		
	}
};
const pensadorParte1 = {
	pensarNumero (){
		let numeroPensado="";
		let i = 0;
		//Generar un numero de cuatro cifras (que no se repiten)
		while(i<4){
			let numeroGenerado = Math.floor(Math.random() * 9 ); 
			if (numeroPensado.indexOf(numeroGenerado) < 0) {
    			numeroPensado+=numeroGenerado;
    			i++;
  			}
		}
		//comentar esta línea para ocultar por completo el numero pensado.
		console.log(numeroPensado);	
		return numeroPensado;
	},
	validarNumero(numeroPensado, numeroAdivinado){
		let contadorBien = 0;
		let contadorRegular = 0;
		//recorro cada numero digito por digito
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				if (numeroPensado[i]===numeroAdivinado[j]){
					if (i===j) contadorBien++;
					else contadorRegular++;
				}
			}
		}
		if (contadorBien<4){
			alert(`Bien: ${contadorBien} - Regular: ${contadorRegular}`);
			contadorBien = 0;
			contadorRegular = 0;
			return false;
		} 
		else{
			alert(`Bien: ${contadorBien} - Regular: ${contadorRegular} - JUEGO TERMINADO!`);
			contadorBien = 0;
			contadorRegular = 0;
			return true;	
		} 
	}
};
const adivinadorParte1 = {
	adivinarNumero(){
		let numeroAdivinado = prompt("Ingrese su n\u00famero:", "");
		if (numeroAdivinado == null || numeroAdivinado == "") {
        	alert("Cancelaste o no ingresaste datos, haz clic en el bot\u00f3n para jugar nuevamente.");
        	return 0;
        } 
        else {
        	return numeroAdivinado;
        }
	}
}