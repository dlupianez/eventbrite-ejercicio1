const juegoParte2 = {
	iniciarJuego(){
		let validado = false;
		//el "pensador" piensa un numero de 4 cifras (como "1234" o "9072").
		alert("Piense su n\u00famero.");
		do{
			//El "adivinador" prueba de adivinar el numero diciendo un numero de 4 cifras
			let numeroAdivinado=adivinadorParte2.generarNumeroAdivinado(); 
			let respuesta = adivinadorParte2.mostrarNumeroAdivinado();
			if (respuesta!==0){
				//el "pensador" le dice cuantas cifras están en el lugar correcto y cuantas en el lugar incorrecto
				validado = adivinadorParte2.validarNumero(numeroAdivinado, respuesta);
			}
			else{
				break;
			}	
		}while(validado!==true);
		
	}
};
const adivinadorParte2 = {
	numeroAdivinado: "",
	numeroDescartado: [],
	historial: [],
	jugadas: 0,
	mostrarNumeroAdivinado(){
		let respuesta = prompt(`El n\u00famero candidato es: ${this.numeroAdivinado} \nIngrese su respuesta con el formato: xbxr \nEjemplo: 3b1r`, "");
		if (respuesta == null || respuesta == "") {
        	alert("Cancelaste o no ingresaste datos, haz clic en el bot\u00f3n para jugar nuevamente.");
        	this.jugadas=0;
			this.numeroAdivinado= "";
			this.historial= [];
        	return 0;
        } 
        else {
        	return respuesta;
        }

	},
	generarNumeroAdivinado(){
		let numeroAdivinado="";
		let i = 0, contador=1;
		let menorNumero=1023;
		let candidatoOk = false;
		let numeroGenerado = 0;
		//si es la primer jugada comienzo con el menor numero de 4 cifras sin repetir digitos
		if (this.jugadas===0){
			numeroAdivinado=menorNumero;			
		}
		else{
			//Generar un numero de cuatro cifras (que no se repiten), teniendo en cuenta las condiciones
			while(candidatoOk===false){
				numeroGenerado=this.numeroAdivinado+contador;
				//console.log(numeroGenerado);
				//verificamos que no contenga uno de los numeros descartados
				if(this.verificarDescartado(numeroGenerado)==false){
					//verificamos que no tenga numeros repetidos
					if(this.verificarRepetido(numeroGenerado.toString())==false){
						//verificamos que cumpla con las reglas del historico
						if(this.verificarHistorico(numeroGenerado)==true){
							numeroAdivinado=numeroGenerado;
							candidatoOk=true;
							break;
						}
					}
				}
				contador++;
				if(contador>9999){
					alert("Ups! Algo ha malido sal.");
					return 0;
				}	
			}
		}
		this.numeroAdivinado=numeroAdivinado;
		this.jugadas+=1;
		return numeroAdivinado;
		},
	validarNumero(numeroAdivinado, respuesta){
			//console.log(`jugadas: ${this.jugadas}`);
			let contadorBien = respuesta[0];
			let contadorRegular = respuesta[2];
			//siempre voy guardando los numeros adivinados en el historial
			const numeroHistorico = {numeroAdivinado: numeroAdivinado, respuesta: respuesta};
			this.historial.push(numeroHistorico);
			//si es la primer jugada y no acerto todos los numeros debo aplicar fuerza bruta
			if ((this.jugadas===1) && (Number(contadorBien)<4)){
				alert(`Bien: ${contadorBien} - Regular: ${contadorRegular} - Intentare otro numero`);
				return false;
			}else if (Number(contadorBien)<4){//si no acerto todos los numero se continua el juego
				//si no acierta ningun numero los guardo para filtrar y acelerar la generacion del proximo
				if (Number(contadorBien)===0&&Number(contadorRegular)===0){
					this.numeroDescartado.push(numeroAdivinado);
				}
				alert(`Bien: ${contadorBien} - Regular: ${contadorRegular} - Intentare otro numero`);
				return false;
			}else{//si acerto todos los numero se termina el juego y restablezco los valores
				alert(`Bien: ${contadorBien} - Regular: ${contadorRegular} - JUEGO TERMINADO!`);
				this.jugadas=0;
				this.numeroAdivinado= "";
				this.historial= [];
				return true;	
			} 
		},
	verificarRepetido(numeroGenerado){
		//console.log("verificarRepetido");
		let contieneRepetido=false;
		//verificamos que no tenga numeros repetidos analizando cantidad de apariciones en el array
		for (let i=0;i<4;i++){
 			if(this.contarRepetido(numeroGenerado[i], numeroGenerado)===true){
 				contieneRepetido=true;	
 				break;
 			}
		}
		//console.log("verificarRepetido: "+contieneRepetido);
		return contieneRepetido;
	},
	contarRepetido(element, numeroGenerado){
		let i=0;
  		let idx = numeroGenerado.indexOf(element);
		while (idx != -1) {
  			i++;
  			idx = numeroGenerado.indexOf(element, idx + 1);
  			if (i>1) break;
		}
  		if (i>1) return true;
  		else return false;
	},
	verificarDescartado(numeroGenerado){
		//console.log("verificarDescartado");
		let sNumeroGenerado = numeroGenerado.toString();
	  	let contieneDescartado=false;
		//console.log("numeroDescartado.length: "+this.numeroDescartado.length);
		if (this.numeroDescartado.length>0){
			for(let h=0;h<this.numeroDescartado.length;h++){
				console.log("numerosDescartados: "+this.numeroDescartado[h]);
				let sNumeroDescartado = this.numeroDescartado[h].toString();
				for(let j=0; j<4; j++){
                  //console.log(sNumeroDescartado.indexOf(sNumeroGenerado[j]));
					if (sNumeroDescartado.indexOf(sNumeroGenerado[j]) >= 0){
						contieneDescartado=true;
						break;
					}
				}
			}
		}
		//console.log("verificarDescartado: "+contieneDescartado);
		return contieneDescartado;
	},
	verificarHistorico(numeroGenerado){
		//console.log("verificarHistorico");
		//console.log("------------------");
		let cumpleHistorico=false;
		//console.log("this.historial.length: "+this.historial.length);
		if (this.historial.length>0){
			for(let h=0;h<this.historial.length;h++){
				let contadorBien=0, contadorRegular=0;	
				//console.log("historial.numeroAdivinado"+this.historial[h].numeroAdivinado);
				//console.log("this.historial.respuesta"+this.historial[h].respuesta);
  				//recorro cada numero digito por digito
				for(let i=0; i<4; i++){
					for(let j=0; j<4; j++){
						if (numeroGenerado.toString()[i]===this.historial[h].numeroAdivinado.toString()[j]){
							if (i===j) contadorBien++;
							else contadorRegular++;
						}
					}
    			}
  				if ((contadorBien.toString()===this.historial[h].respuesta[0])
  					&&(contadorRegular.toString()===this.historial[h].respuesta[2])){
  						cumpleHistorico=true;
    			}
  				else{
					cumpleHistorico=false;	
 					break;
  					}
			}
		}
		//console.log("verificarHistorico: "+cumpleHistorico);
		return cumpleHistorico;
	}
}