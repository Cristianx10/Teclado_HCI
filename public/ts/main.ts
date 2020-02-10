var keys: any = {};
var registro = new Registro("resultados");

var seccion = 0;

var nuevasTeclas: any;

var nuevoTeclado: Array<Tecla> = [];

window.addEventListener("load", function () {


    console.log("Pangina cargada")

    var contadores: Array<Animacion> = [];



    var animMundos: Array<Animacion> = [];

    for (let i = 0; i < 4; i++) {
        animMundos.push(new Animacion());
        var anim = new Animacion();
        contadores.push(anim);
        anim.setVelocidad(300);
    }
    animMundos[0].agregarMultiple("/img/level1/nivelUno", 42);
    animMundos[1].agregarMultiple("/img/level2/AnimacionDos", 23);
    animMundos[2].agregarMultiple("/img/level3/NivelTres", 23);
    animMundos[3].agregarMultiple("/img/level4/NivelCuatro", 23);

    contadores[0].agregarMultiple("/img/contador/contador", 3);
    contadores[1].agregarMultiple("/img/contador/contador", 3);
    contadores[2].agregarMultiple("/img/contador/contador", 3);
    contadores[3].agregarMultiple("/img/contador/contador", 3);

    animMundos.forEach((animMundo, i) => {
        animMundo.setFinal(() => {
            animMundo.detener();
            seguir();
        });
    });

    contadores.forEach((contador, i) => {
        contador.setFinal(() => {
            contador.detener();
            seguir();
        });
    });

    animMundos[0].incluirEn(".pmundo1");
    animMundos[1].incluirEn(".pmundo2");
    animMundos[2].incluirEn(".pmundo3");
    animMundos[3].incluirEn(".pmundo4");

    contadores[0].incluirEn(".pcontador1");
    contadores[1].incluirEn(".pcontador2");
    contadores[2].incluirEn(".pcontador3");
    contadores[3].incluirEn(".pcontador4");

    /* --------------------------------  Preparacion de niveles -------------------------------------- */

    var practica = new TextoMultiple(0, ["a", "ñ", "n", "c", "casa", "aqui y ahora"]);
    practica.incluirEn(".ppracticanivel");

    practica.setFinal(seguir);

    var nivel_1 = new TextoMultiple(1);
    nivel_1.incluirEn(".pnivel1");
    nivel_1.setFinal(seguirnivel);

    var nivel_2 = new TextoMultiple(2);
    nivel_2.incluirEn(".pnivel2");
    nivel_2.setFinal(seguirnivel);

    var nivel_3 = new TextoMultiple(3);
    nivel_3.incluirEn(".pnivel3");
    nivel_3.setFinal(seguirnivel);

    var nivel_4 = new TextoMultiple(4);

    nivel_4.incluirEn(".pnivel4");
    nivel_4.setFinal(() => {
        seguirnivel(nivel_4);


    });


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


    /* -------------------- Inicio de la aplciacion ---------------------- */
    //0
    navegador.agregar(".peleccion");
    //1
    navegador.agregar(".pinicio").setInicial(() => {
        registro.clear();

        registro.tiempo.iniciar();
        registro.agregarRegistro("seccion", seccion + "");
        let fecha = new Date();
        registro.agregarRegistro("fecha", `${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`);
        registro.agregarRegistro("hora", `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`);

    });
    //2
    /* -------------------- Formulario ---------------------- */
    navegador.agregar(".pformulario");

    /* -------------------- Instrucciones generales ---------------------- */
    //3
    navegador.agregar(".pinstrucciones");
    //4
    navegador.agregar(".ppractica");
    //5
    navegador.agregar(".ppractica1");
    //6
    /* -------------------- Nivel 1 ---------------------- */
    navegador.agregar(".ppracticanivel").setInicial(() => {
        practica.iniciar();
    });
    //7
    navegador.agregar(".ppractica2");
    //8
    navegador.agregar(".pmundo1").setInicial(() => {
        animMundos[0].iniciar();
    });
    //9
    navegador.agregar(".pcontador1").setInicial(() => {
        contadores[0].iniciar();
    });

    //10
    navegador.agregar(".pnivel1").setInicial(() => {
        nivel_1.iniciar();
    });


    //11
    navegador.agregar(".pnivel1finalizado");

    /* -------------------- Nivel 2 ---------------------- */
    //12
    navegador.agregar(".pinstruccionespalabras");
    //13
    navegador.agregar(".pmundo2").setInicial(() => {
        animMundos[1].iniciar();
    });
    //14
    navegador.agregar(".pcontador2").setInicial(() => {
        contadores[1].iniciar();
    });

    //15
    navegador.agregar(".pnivel2").setInicial(() => {
        nivel_2.iniciar();
    });
    //16
    navegador.agregar(".pnivel2finalizado");

    /* -------------------- Nivel 3 ---------------------- */
    //17
    navegador.agregar(".pinstruccionesfrases");

    //18
    navegador.agregar(".pmundo3").setInicial(() => {
        animMundos[2].iniciar();
    });
    //19
    navegador.agregar(".pcontador3").setInicial(() => {
        contadores[2].iniciar();
    });


    //20
    navegador.agregar(".pnivel3").setInicial(() => {
        nivel_3.iniciar();
    });
    //21
    navegador.agregar(".pnivel3finalizado");
    /* -------------------- Nivel 4 ---------------------- */
    //22
    navegador.agregar(".pinstruccionesdictado");

    //23
    navegador.agregar(".pmundo4").setInicial(() => {
        animMundos[3].iniciar();
    });
    //24
    navegador.agregar(".pcontador4").setInicial(() => {
        contadores[3].iniciar();
    });

    //25
    navegador.agregar(".pnivel4").setInicial(() => {
        nivel_4.ocultar();
        nivel_4.play();
        nivel_4.iniciar(false);
    });
    //26
    navegador.agregar(".pnivel4finalizado");
    //27
    navegador.agregar(".pencuesta").setFinal(() => {
        registro.descargarEspecifico();
        registro.descargarGeneral();
    });
    //28
    navegador.agregar(".finalAplicacion");

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
/*
    document.addEventListener("keydown", (e)=>{
        if(e.key == "e" || e.key == "E"){
            seguir();
        }
    })
*/
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

        if (navegador.actual + 1 >= navegador.elementos.length) {
            registro.tiempo.detener();

            let time = registro.tiempo.getTiempo() / 1000 + "";
            time = time.replace(".", ",");
            registro.agregarRegistro("tiempoEmpleado", time);
        }

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
    let carrera__error: any = selector("#form__usuario__carrera");
    let ocuapcion: HTMLInputElement = <HTMLInputElement>selector("#form__usuario__ocupacion");
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

    ocuapcion.style.display = "none";

    function formulario() {

        if (nombre.value == "") {
            nombre.setCustomValidity("Ingresa su nombre, por favor");
        } else if (edad.value == "" || isNaN(edad.value)) {
            edad.setCustomValidity("Ingresa un semestre valido");
        } else if (hombre.checked == false && mujer.checked == false) {
            genero.innerHTML = "Selecione su genero, por favor";
        } else if (ocuapcion.value == "") {
            carrera__error.innerHTML = "Selecione una carrera, por favor";
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

    let carrera: HTMLSelectElement = <HTMLSelectElement>document.querySelector("#form-carrera")

    carrera.addEventListener("change", () => {
        let selectedOption = carrera.options[carrera.selectedIndex];
        let info = selectedOption.text;

        if (info == "Elige una opción") {
            carrera__error.innerHTML = "Selecione una carrera, por favor";
            ocuapcion.value = "";
        } else if (info == "Otra") {
            carrera__error.innerHTML = "Selecione una carrera, por favor";
            ocuapcion.value = "";
            ocuapcion.style.display = "flex";
        } else {
            carrera__error.innerHTML = "";
            ocuapcion.style.display = "none";
            ocuapcion.value = info;
        }
    });




    let enviar: any = selector("#form__usuario__enviar");
    enviar.addEventListener("click", formulario);



    var carga = new createjs.LoadQueue();


    function convertirToString(resultado: string) {
        let datos = [];
        let data = resultado.split("\n");
        for (let i = 0; i < data.length; i++) {
            let d = data[i];
            d = d.replace(/(\r\n|\n|\r)/gm, "");
            if (d != "") {
                datos.push(d);
            }
        }
        return datos;
    }

    function eleecionSeccion(numero: number) {
        //Cargar el archivo

        carga.loadFile({ id: "letras", src: `/Escritos/${numero}/letras.txt` });
        carga.loadFile({ id: "palabras", src: `/Escritos/${numero}/palabras.txt` });
        carga.loadFile({ id: "frases", src: `/Escritos/${numero}/frases.txt` });
        carga.loadFile({ id: "dictados", src: `/Escritos/${numero}/dictados.txt` });
        carga.loadFile({ id: "audios", src: `/Escritos/${numero}/audios.txt` });

        carga.on("fileload", (resultado: any) => {

            if (resultado.item.id == "letras") {
                let datos = convertirToString(resultado.result);
                nivel_1.agregarMultiple(datos);
            }

            if (resultado.item.id == "palabras") {
                let datos = convertirToString(resultado.result);
                nivel_2.agregarMultiple(datos);
            }

            if (resultado.item.id == "frases") {
                let datos = convertirToString(resultado.result);
                nivel_3.agregarMultiple(datos);
            }

            if (resultado.item.id == "dictados") {
                let datos = convertirToString(resultado.result);
                nivel_4.agregarMultiple(datos);
            }

            if (resultado.item.id == "audios") {
                let datos = convertirToString(resultado.result);
                nivel_4.agregarSonido(datos);
            }

        });

    }

    let btn_eleccion_titulo: HTMLElement = <HTMLElement>document.querySelector("#cargaTecladoTitulo");
    let btn_eleccion_teclado: HTMLElement = <HTMLElement>document.querySelector("#cargaTeclado");
    let btn_eleccion_1: HTMLElement = <HTMLElement>document.querySelector("#eleccion1");
    let btn_eleccion_2: HTMLElement = <HTMLElement>document.querySelector("#eleccion2");
    let btn_eleccion_3: HTMLElement = <HTMLElement>document.querySelector("#eleccion3");



    btn_eleccion_1.addEventListener("click", () => {

        seccion = 1;
        eleecionSeccion(1);
        seguir();

        let cambios = [];
        let cambioA = false;
        let cambioB = false;


        var pregunta1 = new Pregunta("¿Te sentiste frustrado realizando el ejercicio?", "¿Te sentiste frustrado realizando el ejercicio?");
        pregunta1.agregar(`<div class="opcion__linkert"><input name="frustrado" type="radio" value="1"><p>1</p></div>`, "1");
        pregunta1.agregar(`<div class="opcion__linkert"><input name="frustrado" type="radio" value="2"><p>2</p></div>`, "2");
        pregunta1.agregar(`<div class="opcion__linkert"><input name="frustrado" type="radio" value="3"><p>3</p></div>`, "3");
        pregunta1.agregar(`<div class="opcion__linkert"><input name="frustrado" type="radio" value="4"><p>4</p></div>`, "4");
        pregunta1.agregar(`<div class="opcion__linkert"><input name="frustrado" type="radio" value="5"><p>5</p></div>`, "5");

        pregunta1.incluirEn(".pregunta1");

        var pregunta2 = new Pregunta("¿Qué tan difícil te pareció el nuevo teclado?", "¿Qué tan difícil te pareció el nuevo teclado?");
        pregunta2.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="1"><p>1</p></div>`, "1");
        pregunta2.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="2"><p>2</p></div>`, "2");
        pregunta2.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="3"><p>3</p></div>`, "3");
        pregunta2.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="4"><p>4</p></div>`, "4");
        pregunta2.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="5"><p>5</p></div>`, "5");

        pregunta2.incluirEn(".pregunta1");

        pregunta1.setCambio(() => {
            if (cambioA == false) {
                cambios.push("a");
                cambioA = true;
                if (cambios.length > 1) {
                    btn__encuesta1.disabled = false
                }
            }


        });

        pregunta2.setCambio(() => {
            if (cambioB == false) {
                cambios.push("B");
                cambioB = true;
                this.console.log(cambios.length)
                if (cambios.length > 1) {
                    btn__encuesta1.disabled = false
                }
            }
        });


        var btn__encuesta1: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#contestarEncuesta");

        btn__encuesta1.addEventListener("click", () => {
            registro.agregarRegistro("pregunta", pregunta1.getPregunta() + ": " + pregunta1.getOpcion());
            registro.agregarRegistro("pregunta2", pregunta2.getPregunta() + ": " + pregunta2.getOpcion());
            seguir();
        });

    });

    btn_eleccion_2.addEventListener("click", () => {

        seccion = 2;
        eleecionSeccion(2);
        seguir();

        let cambios = [];
        let cambioC = false;

        var pregunta3 = new Pregunta(`<h2 style="text-align:center;">Siento que mi desempeño en relación con la prueba anterior:`, "Siento que mi desempeño en relación con la prueba anterior:");
        pregunta3.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="1"><p>Empeoro</p></div>`, "1");
        pregunta3.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="2"><p>Fue igual</p></div>`, "2");
        pregunta3.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="3"><p>Mejoro</p></div>`, "3");

        pregunta3.incluirEn(".pregunta1");

        pregunta3.setCambio(() => {
            if (cambioC == false) {
                cambios.push("B");
                cambioC = true;
                btn__encuesta1.disabled = false
            }
        });

        var btn__encuesta1: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#contestarEncuesta");

        btn__encuesta1.addEventListener("click", () => {
            registro.agregarRegistro("pregunta3", pregunta3.getPregunta() + ": " + pregunta3.getOpcion());
            seguir();
        });

    });

    btn_eleccion_3.addEventListener("click", () => {

        seccion = 3;
        eleecionSeccion(3);
        seguir();


        let cambios = [];
        let cambioC = false;

        var pregunta3 = new Pregunta(`<h2 style="text-align:center;">Siento que mi desempeño en relación con la prueba anterior:`, "Siento que mi desempeño en relación con la prueba anterior:");
        pregunta3.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="1"><p>Empeoro</p></div>`, "1");
        pregunta3.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="2"><p>Fue igual</p></div>`, "2");
        pregunta3.agregar(`<div class="opcion__linkert"><input name="dificultad" type="radio" value="3"><p>Mejoro</p></div>`, "3");

        pregunta3.incluirEn(".pregunta1");

        pregunta3.setCambio(() => {
            if (cambioC == false) {
                cambios.push("B");
                cambioC = true;
                btn__encuesta1.disabled = false
            }
        });

        var btn__encuesta1: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#contestarEncuesta");

        btn__encuesta1.addEventListener("click", () => {
            registro.agregarRegistro("pregunta", pregunta3.getPregunta() + ": " + pregunta3.getOpcion());
            seguir();
        });
    });




    var teclasNuevas = new TecladoLoad("teclado");
    nuevoTeclado = teclasNuevas.cargar();

    const updateNivel = () => {

        if(teclasNuevas.randomMode.length > 0){
            navegador.resetOrder();
            navegador.setOrden(0, 7);
    
            teclasNuevas.randomMode.forEach((orden, index) => {
                switch (orden) {
                    case 1:
                        navegador.setOrden(8, 11);
                        break;
                    case 2:
                        navegador.setOrden(12, 16);
                        break;
                    case 3:
                        navegador.setOrden(17, 21);
                        break;
                    case 4:
                        navegador.setOrden(22, 26);
                        break;
                }
               
            });
    
            navegador.setOrden(27, 28);
        }else{
            navegador.normalizarOrden();
        }
        
    }


    btn_eleccion_teclado.addEventListener("change", function (a: any) {


        for (let i = 0; i < a.target.files.length; i++) {
            let archivo = a.target.files[i];

            var lector = new FileReader();
            lector.onload = function (e: any) {

                var contenido = e.target.result;

                let data = formatearTexto(contenido);

                teclasNuevas.agregar(data);
                nuevoTeclado = teclasNuevas.cargar();
                updateNivel();

                for (let i = 0; i < nuevoTeclado.length; i++) {
                    let t = nuevoTeclado[i];
                    try {
                        nuevasTeclas[t.original] = t.nuevo;
                    } catch{

                    }
                }

            };

            lector.readAsText(archivo);

        }
    });

    function formatearTexto(resultado: string) {
        let datos = convertirToString(resultado);
        return datos;
    }


    var des: HTMLElement = <HTMLElement>document.querySelector("#descargarseguro");

    des.addEventListener("click", () => {
        registro.descargarEspecifico();
        registro.descargarGeneral();
    });

    var descar: HTMLElement = <HTMLElement>document.querySelector(".descargar__resultados");

    descar.addEventListener("click", () => {
        registro.descargarEspecifico();
        registro.descargarGeneral();
    });





    updateNivel();

    teclasNuevas.ejecutar(() => {
        updateNivel();
    })



});

