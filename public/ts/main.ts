var keys: any = {};
var registro = new Registro("resultados");

window.addEventListener("load", function () {



    var animMundos: Array<Animacion> = [];

    for (let i = 0; i < 4; i++) {
        animMundos.push(new Animacion());
    }
    animMundos[0].agregarMultiple("/img/level1/nivelUno", 42);
    animMundos[1].agregarMultiple("/img/level2/AnimacionDos", 23);
    animMundos[2].agregarMultiple("/img/level3/NivelTres", 23);
    animMundos[3].agregarMultiple("/img/level4/NivelCuatro", 23);

    animMundos.forEach((animMundo, i) => {
        animMundo.setFinal(() => {
            animMundo.detener();
            seguir();
        });
    });

    animMundos[0].incluirEn(".pmundo1");
    animMundos[1].incluirEn(".pmundo2");
    animMundos[2].incluirEn(".pmundo3");
    animMundos[3].incluirEn(".pmundo4");

    /* --------------------------------  Preparacion de niveles -------------------------------------- */

    var practica = new TextoMultiple(["ñ", "n", "c", "casa", "aqui y ahora"]);
    practica.incluirEn(".ppracticanivel");

    practica.setFinal(seguir);

    var nivel_1 = new TextoMultiple();
    nivel_1.incluirEn(".pnivel1");
    nivel_1.setFinal(seguirnivel);

    var nivel_2 = new TextoMultiple();
    nivel_2.incluirEn(".pnivel2");
    nivel_2.setFinal(seguirnivel);

    var nivel_3 = new TextoMultiple();
    nivel_3.incluirEn(".pnivel3");
    nivel_3.setFinal(seguirnivel);

    var nivel_4 = new TextoMultiple();
    /* [
        "El principito que me hacia muchas preguntas jamas parecia oir las mias",
        "El principito que me hacia muchas preguntas jamas parecia oir las mias"
      ],
      [
        "/audios/niveles/el_principito_que_me.mp3",
        "/audios/niveles/el_principito_que_me.mp3"
      ]*/
    nivel_4.incluirEn(".pnivel4");
    nivel_4.setFinal(seguirnivel);


    var teclado = document.addEventListener("keydown", event => {

        practica.keyPressed(event);
        nivel_1.keyPressed(event);
        nivel_2.keyPressed(event);
        nivel_3.keyPressed(event);
        nivel_4.keyPressed(event);
    });

    var tecladoReleased = document.addEventListener("keyup", event => {
        let key: string = event.key;
        key = key.toLowerCase();

        for (let i = 0; i < nuevoTeclado.length; i++) {
            let tecla = nuevoTeclado[i];
            let original = tecla.original.toLowerCase();

            if (key == original) {
                key = tecla.nuevo.toLowerCase();
                i = nuevoTeclado.length;
            }
        }

        keys[key] = false;
    });



    /* --------------------------------  Configuación de la navegación entre paginas -------------------------------------- */
    /* --------------------------------  Configuación de la navegación entre paginas -------------------------------------- */
    /* --------------------------------  Configuación de la navegación entre paginas -------------------------------------- */

    var navegador = new Navegador();


    navegador.agregar(".peleccion");

    /* -------------------- Inicio de la aplciacion ---------------------- */
    navegador.agregar(".pinicio");

    navegador.agregar(".pnivel4").setInicial(() => {
        nivel_4.ocultar();
        nivel_4.play();
        nivel_4.iniciar(false);
    });

    /* -------------------- Formulario ---------------------- */
    navegador.agregar(".pformulario");

    /* -------------------- Instrucciones generales ---------------------- */
    navegador.agregar(".pinstrucciones");

    navegador.agregar(".ppractica");

    navegador.agregar(".ppractica1");

    /* -------------------- Nivel 1 ---------------------- */

    navegador.agregar(".ppracticanivel").setInicial(() => {
        practica.iniciar();
    });

    navegador.agregar(".ppractica2");

    navegador.agregar(".pmundo1").setInicial(() => {
        animMundos[0].iniciar();
    });

    navegador.agregar(".pnivel1").setInicial(() => {
        nivel_1.iniciar();
    });

    navegador.agregar(".pnivel1finalizado");

    /* -------------------- Nivel 2 ---------------------- */

    navegador.agregar(".pinstruccionespalabras");

    navegador.agregar(".pmundo2").setInicial(() => {
        animMundos[1].iniciar();
    });

    navegador.agregar(".pnivel2").setInicial(() => {
        nivel_2.iniciar();
    });

    navegador.agregar(".pnivel2finalizado");

    navegador.agregar(".pinstruccionesfrases");

    /* -------------------- Nivel 3 ---------------------- */

    navegador.agregar(".pmundo3").setInicial(() => {
        animMundos[2].iniciar();
    });

    navegador.agregar(".pnivel3").setInicial(() => {
        nivel_3.iniciar();
    });

    navegador.agregar(".pnivel3finalizado");

    navegador.agregar(".pinstruccionesdictado");

    /* -------------------- Nivel 4 ---------------------- */

    navegador.agregar(".pmundo4").setInicial(() => {
        animMundos[3].iniciar();
    });

    /*--------------------*/

    navegador.agregar(".pnivel4finalizado");

    /* -------------------- Configuraciones de la navegación---------------------- */
    navegador.incluirEn(".contenedor");
    navegador.iniciar();

    var siguientes = document.querySelectorAll(".siguiente");

    siguientes.forEach(boton => {
        boton.addEventListener("click", seguir);
    });

    function seguir() {
        navegador.siguiente();
    }

    function seguirnivel(e: any) {

        navegador.siguiente();


        let reGeneral = e.toString();
        reGeneral.forEach((r: any) => {

            registro.agregarGenerales(r);
        });

        let reEspecifico = e.toStringEspecificos();
        reEspecifico.forEach((r: any) => {
            registro.agregarEspecificos(r);
        });
    }

    function selector(ruta: string) {
        let elemento = document.querySelector(ruta);
        if (elemento != null) {
            return elemento;
        } else {
            alert("no se encontro la etiqueta: " + ruta);
        }
    }

    let nombre: any = selector("#form__usuario__nombre");
    let edad: any = selector("#form__usuario__edad");
    let genero: any = selector("#form__usuario__genero");
    let hombre: any = selector("#form__usuario__genero__hombre");
    let mujer: any = selector("#form__usuario__genero__mujer");
    let ocuapcion: any = selector("#form__usuario__ocupacion");
    let mano: any = selector("#form__usuario__mano");
    let izquierda: any = selector("#form__usuario__mano__izquierda");
    let derecha: any = selector("#form__usuario__mano__derecha");

    function normalizar(elemento: any, opciona?: any, opcionb?: any) {
        if (opciona) {
            opciona.addEventListener("click", function () {
                elemento.innerHTML = "";
            });
            if (opcionb) {
                opcionb.addEventListener("click", function () {
                    elemento.innerHTML = "";
                });
            }
        } else {
            elemento.addEventListener("keydown", function () {
                elemento.setCustomValidity("");
            });
        }
    }

    function formulario() {
        if (nombre.value == "") {
            nombre.setCustomValidity("Ingresa su nombre, por favor");
        } else if (edad.value == "" || isNaN(edad.value)) {
            edad.setCustomValidity("Ingresa una edad valida");
        } else if (hombre.checked == false && mujer.checked == false) {
            genero.innerHTML = "Selecione su genero, por favor";
        } else if (ocuapcion.value == "") {
            ocuapcion.setCustomValidity("Ingresa su ocupación, por favor");
        } else if (izquierda.checked == false && derecha.checked == false) {
            mano.innerHTML = "Selecione una orientacion, por favor";
        } else {
            registro.agregarRegistro("nombre", nombre.value);
            registro.agregarRegistro("edad", edad.value);
            if (hombre.checked) {
                registro.agregarRegistro("genero", "hombre");
            } else {
                registro.agregarRegistro("genero", "mujer");
            }
            registro.agregarRegistro("ocupacion", ocuapcion.value);
            if (izquierda.checked) {
                registro.agregarRegistro("mano", "izquierda");
            } else {
                registro.agregarRegistro("mano", "derecha");
            }

            seguir();
        }
    }

    normalizar(nombre);
    normalizar(edad);
    normalizar(genero, mujer, hombre);
    normalizar(ocuapcion);
    normalizar(mano, izquierda, derecha);

    let enviar: any = selector("#form__usuario__enviar");
    enviar.addEventListener("click", formulario);



    var carga = new createjs.LoadQueue();



    function eleecionSeccion(numero: number) {
        //Cargar el archivo

        carga.loadFile({ id: "letras", src: `/Escritos/${numero}/letras.txt` });
        carga.loadFile({ id: "palabras", src: `/Escritos/${numero}/palabras.txt` });
        carga.loadFile({ id: "frases", src: `/Escritos/${numero}/frases.txt` });
        carga.loadFile({ id: "dictados", src: `/Escritos/${numero}/dictados.txt` });
        carga.loadFile({ id: "audios", src: `/Escritos/${numero}/audios.txt` });

        carga.on("fileload", (resultado: any) => {

            if (resultado.item.id == "letras") {
                let datos = [];
                let data = resultado.result.split("\n");
                for (let i = 0; i < data.length; i++) {
                    let d = data[i];
                    d = d.replace(/(\r\n|\n|\r)/gm, "");
                    datos.push(d);
                }

                nivel_1.agregarMultiple(datos);
            }

            if (resultado.item.id == "palabras") {
                let datos = [];
                let data = resultado.result.split("\n");
                for (let i = 0; i < data.length; i++) {
                    let d = data[i];
                    d = d.replace(/(\r\n|\n|\r)/gm, "");
                    datos.push(d);
                }
                nivel_2.agregarMultiple(datos);
            }

            if (resultado.item.id == "frases") {
                let datos = [];
                let data = resultado.result.split("\n");
                for (let i = 0; i < data.length; i++) {
                    let d = data[i];
                    d = d.replace(/(\r\n|\n|\r)/gm, "");
                    datos.push(d);
                }
                nivel_3.agregarMultiple(datos);
            }

            if (resultado.item.id == "dictados") {
                let datos = [];
                let data = resultado.result.split("\n");
                for (let i = 0; i < data.length; i++) {
                    let d = data[i];
                    d = d.replace(/(\r\n|\n|\r)/gm, "");
                    datos.push(d);
                }
                nivel_4.agregarMultiple(datos);
            }

            if (resultado.item.id == "audios") {
                let datos = [];
                let data = resultado.result.split("\n");
                for (let i = 0; i < data.length; i++) {
                    let d = data[i];
                    d = d.replace(/(\r\n|\n|\r)/gm, "");
                    datos.push(d);
                }
                nivel_4.agregarSonido(datos);
            }

        });

    }
    
    let btn_eleccion_titulo = document.querySelector("#cargaTecladoTitulo");
    let btn_eleccion_teclado = document.querySelector("#cargaTeclado");
    let btn_eleccion_1 = document.querySelector("#eleccion1");
    let btn_eleccion_2 = document.querySelector("#eleccion2");
    let btn_eleccion_3 = document.querySelector("#eleccion3");


    eleecionSeccion(1);

});