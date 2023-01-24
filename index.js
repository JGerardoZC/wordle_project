const diccionario = ['abran', 'actas', 'actos', 'acuso', 'agudo', 'aleja', 'algas', 'almas', 'altos', 'andas', 'animo', 'apodo', 'aptas', 'arcos', 'ardan', 'artes', 'ascos', 'asnos', 'atojo', 'autos', 'ayuda', 'bajos', 'balas', 'bebes', 'besos', 'beses', 'betas', 'bonos', 'botas', 'cabra', 'cajas', 'callo', 'calma', 'campo', 'canas', 'canta', 'capas', 'capto', 'cargo', 'caros', 'casos', 'causa', 'cazar', 'caida', 'cejas', 'cenas', 'cerca', 'cerdo', 'cerro', 'chile', 'china', 'ciega', 'citas', 'clavo', 'codos', 'edita', 'ellos', 'emoji', 'enojo', 'envio', 'erizo', 'estas', 'euros', 'fetos', 'filas', 'focos', 'formo', 'fosos' , 'fotos', 'frida', 'fugas', 'fugue', 'fumes', 'fosil', 'gafas', 'ganar', 'gases', 'gatos', 'genes', 'goles', 'gorra', 'grabe', 'grito', 'hacer', 'hecha', 'hecho', 'hijos', 'hilan', 'hilos', 'hojas', 'ideas', 'India', 'infle', 'islas', 'Ivana', 'jalan', 'jalon', 'Japon', 'jefes', 'jerga'
    ];
// Objeto con datos del juego, separados de la interfaz

const juego = {
    // Se crea un arreglo 5x6 con letras vacias
    cuadros: Array(6).fill().map(()=>Array(5).fill('')),
    filaActual: 0,
    colActual: 0,
    // Se busca una palabra aleatoriamente en el diccionario
    palabraSecreta: diccionario[Math.floor(Math.random()*diccionario.length)],
    // palabraSecreta: diccionario[0],

    //Setters y Getters para atributos de clase juego
    get getCuadros() {
        return this.cuadros;
    },

    get getFilaActual() {
        return this.filaActual;
    },

    get getColActual() {
        return this.colActual;
    },

    get getPalabraSecreta() {
        return this.palabraSecreta;
    },

    set changeCuadros(newCuadros) {
        this.cuadros = newCuadros;
    },

    set changeFilaActual(newFilaActual) {
        this.filaActual = newFilaActual;
    },
    
    set changeColActual(newColActual) {
        this.colActual = newColActual;
    },

    set changePalabraSecreta(newPalabraSecreta) {
        this.palabraSecreta = newPalabraSecreta;
    }

};

//Clase para el contador de victorias consecutivas
const contador = {
    cont: 0,

    //Setters y Getters para atributos de clase contador
    get getCont() {
        return this.cont;
    },

    set changeCont(newCont){
        this.cont = newCont;
    }
}

// Cada vez que haya una victoria aumenta el contador por 1
function actualizarContador() {
    contGraf = document.getElementById(`contador`);
    contador.changeCont = contador.getCont + 1
    contGraf.textContent = (contador.getCont);

}

// Reiniciar objeto juego a valores originales
function reiniciarJuego(){
    //Reinicia el color de los cuadros
    reiniciarColores();
    cuadrosNueva = Array(6).fill().map(() => Array(5).fill(''));
    juego.changeCuadros = cuadrosNueva;
    juego.changeColActual = 0;
    juego.changeFilaActual = 0;
    //Selecciona una nueva palabra aleatoria del diccionario
    juego.changePalabraSecreta = diccionario[Math.floor(Math.random() * diccionario.length)];
    //Actualiza los valores de la cuadricula
    agregarCuadricula();
    //Actualiza el valor del contador
    actualizarContador();
}

// Reinicia el color de todos los cuadros a su color original
function reiniciarColores() {
    for (let i = 0; i < 6; i++){
        for (let j = 0; j < 5; j++) {
            let cuadro = document.getElementById(`cuadro${i}${j}`);
            cuadro.className = 'cuadro';
        }
    }
}

// Crea un cuadro con una letra dentro
function crearCuadro(contenedor, fil, col, letra = '') {
    let cuadro = document.createElement('div');
    cuadro.className = 'cuadro';
    cuadro.id = `cuadro${fil}${col}`; 
    cuadro.textContent = letra;
    contenedor.appendChild(cuadro);
    return cuadro;
  }

// Crea una cuadricula, recorriendo las filas y columnas con la función crear cuadro
function crearCuadricula(contenedor) {
  let cuadricula = document.createElement('div');
  cuadricula.className = 'cuadricula';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
        crearCuadro(cuadricula, i, j);
    }
  }
  contenedor.appendChild(cuadricula);
}

// Registrar eventos del teclado, enter para guardar la palabra (completa), backspace para borrar y guardar una letra. 
function registroTeclado() {
    document.body.onkeydown = (t) => {
        let tecla = t.key;
        if (tecla == 'Enter') {
            if (juego.colActual == 5) {
                let palabra = obtenerPalabra();
                // Revisa que la palabra exista, aumenta la fila y reinicia las columnas
                if (revisarPalabra(palabra)) {
                    ajustarPalabra(palabra);
                    juego.filaActual++;
                    juego.colActual = 0;
                } else {
                    alert('No es una palabra válida');
                }
            }
            // Revela la palabra secreta para pruebas
            console.log(juego.palabraSecreta);
        }
        if (tecla == 'Backspace') {
            borrarLetra();
        }
        if (revisarLetra(tecla)) {
            agregarLetra(tecla);
        }
        agregarCuadricula();
    }
}

// Agrega los datos de la interfaz a la cuadrícula
function agregarCuadricula() {
    for (let i = 0; i < juego.cuadros.length; i++) {
        for (let j = 0; j < juego.cuadros[i].length; j++) {
          const cuadro = document.getElementById(`cuadro${i}${j}`);
          cuadro.textContent = juego.cuadros[i][j];
        }
      }
}

// Revisa que la tecla sea una y que sea un caracter a-z sin distinguir mayúsculas
function revisarLetra(tecla){
    return tecla.length === 1 && tecla.match(/[a-z]/i);
}

// Revisa si no esta en la última columna y añade la letra (en minúscula) al cuadro
function agregarLetra(letra) {
    if (juego.colActual == 5) {
        return;
    }
    juego.cuadros[juego.filaActual][juego.colActual] = letra.toLowerCase();
    juego.colActual++;
}

// Revisa si no esta en la primera y quita la letra al cuadro
function borrarLetra(letra) {
    if (juego.colActual == 0) {
        return;
    }
    juego.cuadros[juego.filaActual][juego.colActual - 1] = '';
    juego.colActual--;
}

// Obtiene la palabra, toma todas las letras de la fila
function obtenerPalabra() {
    return juego.cuadros[juego.filaActual].reduce((ant, act) => ant + act);
}

// Revisa si la palabra se encuentra en el diccionario
function revisarPalabra(palabra) {
    return diccionario.includes(palabra);
}

// Revisa el estado de cada letra y marca el cuadro
function ajustarPalabra(palabra) {
    let fil = juego.filaActual;
    for (let i = 0; i < 5; i++) {
        let cuadro = document.getElementById(`cuadro${fil}${i}`);
        let letra = cuadro.textContent;
        if (letra === juego.palabraSecreta[i]) {
            cuadro.classList.add('correcto');
        } else if (juego.palabraSecreta.includes(letra)) {
            cuadro.classList.add('inexacto');
        } else {
            cuadro.classList.add('incorrecto');
        }
    }
    estadoPartida(palabra);
}

// Si la palabra es la correcta gana, si no es para el quinto intento pierde
function estadoPartida(palabra) {
    setTimeout(() => {
        let ganador = juego.palabraSecreta == palabra;
        let perdedor = juego.filaActual == 6;
        if (ganador) {
            alert('¡Ganaste!');
            reiniciarJuego();
        }
        else if(perdedor){
            alert(`Perdiste, la palabra correcta era: "${juego.palabraSecreta}"`);
            document.location.reload()
        }
        }, 200);
}

// Función principal
function main() {
    let intJuego = document.getElementById('intJuego');
    crearCuadricula(intJuego);
    registroTeclado();
}
main();