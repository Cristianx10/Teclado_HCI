"use strict";
var keys = {};
var registro = new Registro("resultados");
var seccion = 0;
var nuevasTeclas;
var nuevoTeclado = [];
window.addEventListener("load", function () {
    var _this = this;
    console.log("Pangina cargada");
    var contadores = [];
    var animMundos = [];
    for (var i = 0; i < 4; i++) {
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
    animMundos.forEach(function (animMundo, i) {
        animMundo.setFinal(function () {
            animMundo.detener();
            seguir();
        });
    });
    contadores.forEach(function (contador, i) {
        contador.setFinal(function () {
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
    nivel_4.setFinal(function () {
        seguirnivel(nivel_4);
    });
    var teclado = document.addEventListener("keydown", function (event) {
        practica.keyPressed(event);
        nivel_1.keyPressed(event);
        nivel_2.keyPressed(event);
        nivel_3.keyPressed(event);
        nivel_4.keyPressed(event);
    });
    var tecladoReleased = document.addEventListener("keyup", function (event) {
        var key = event.key;
        key = key.toLowerCase();
        for (var i = 0; i < nuevoTeclado.length; i++) {
            var tecla = nuevoTeclado[i];
            var original = tecla.original.toLowerCase();
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
    navegador.agregar(".pinicio").setInicial(function () {
        registro.clear();
        registro.tiempo.iniciar();
        registro.agregarRegistro("seccion", seccion + "");
        var fecha = new Date();
        registro.agregarRegistro("fecha", fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear());
        registro.agregarRegistro("hora", fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds());
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
    navegador.agregar(".ppracticanivel").setInicial(function () {
        practica.iniciar();
    });
    //7
    navegador.agregar(".ppractica2");
    //8
    navegador.agregar(".pmundo1").setInicial(function () {
        animMundos[0].iniciar();
    });
    //9
    navegador.agregar(".pcontador1").setInicial(function () {
        contadores[0].iniciar();
    });
    //10
    navegador.agregar(".pnivel1").setInicial(function () {
        nivel_1.iniciar();
    });
    //11
    navegador.agregar(".pnivel1finalizado");
    /* -------------------- Nivel 2 ---------------------- */
    //12
    navegador.agregar(".pinstruccionespalabras");
    //13
    navegador.agregar(".pmundo2").setInicial(function () {
        animMundos[1].iniciar();
    });
    //14
    navegador.agregar(".pcontador2").setInicial(function () {
        contadores[1].iniciar();
    });
    //15
    navegador.agregar(".pnivel2").setInicial(function () {
        nivel_2.iniciar();
    });
    //16
    navegador.agregar(".pnivel2finalizado");
    /* -------------------- Nivel 3 ---------------------- */
    //17
    navegador.agregar(".pinstruccionesfrases");
    //18
    navegador.agregar(".pmundo3").setInicial(function () {
        animMundos[2].iniciar();
    });
    //19
    navegador.agregar(".pcontador3").setInicial(function () {
        contadores[2].iniciar();
    });
    //20
    navegador.agregar(".pnivel3").setInicial(function () {
        nivel_3.iniciar();
    });
    //21
    navegador.agregar(".pnivel3finalizado");
    /* -------------------- Nivel 4 ---------------------- */
    //22
    navegador.agregar(".pinstruccionesdictado");
    //23
    navegador.agregar(".pmundo4").setInicial(function () {
        animMundos[3].iniciar();
    });
    //24
    navegador.agregar(".pcontador4").setInicial(function () {
        contadores[3].iniciar();
    });
    //25
    navegador.agregar(".pnivel4").setInicial(function () {
        nivel_4.ocultar();
        nivel_4.play();
        nivel_4.iniciar(false);
    });
    //26
    navegador.agregar(".pnivel4finalizado");
    //27
    navegador.agregar(".pencuesta").setFinal(function () {
        registro.descargarEspecifico();
        registro.descargarGeneral();
    });
    //28
    navegador.agregar(".finalAplicacion");
    /* -------------------- Configuraciones de la navegación---------------------- */
    navegador.incluirEn(".contenedor");
    navegador.iniciar();
    var siguientes = document.querySelectorAll(".siguiente");
    siguientes.forEach(function (boton) {
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
    function seguirnivel(e) {
        navegador.siguiente();
        var reGeneral = e.toString();
        reGeneral.forEach(function (r) {
            registro.agregarGenerales(r);
        });
        var reEspecifico = e.toStringEspecificos();
        reEspecifico.forEach(function (r) {
            registro.agregarEspecificos(r);
        });
        if (navegador.actual + 1 >= navegador.elementos.length) {
            registro.tiempo.detener();
            var time = registro.tiempo.getTiempo() / 1000 + "";
            time = time.replace(".", ",");
            registro.agregarRegistro("tiempoEmpleado", time);
        }
    }
    function selector(ruta) {
        var elemento = document.querySelector(ruta);
        if (elemento != null) {
            return elemento;
        }
        else {
            alert("no se encontro la etiqueta: " + ruta);
        }
    }
    var nombre = selector("#form__usuario__nombre");
    var edad = selector("#form__usuario__edad");
    var genero = selector("#form__usuario__genero");
    var hombre = selector("#form__usuario__genero__hombre");
    var mujer = selector("#form__usuario__genero__mujer");
    var carrera__error = selector("#form__usuario__carrera");
    var ocuapcion = selector("#form__usuario__ocupacion");
    var mano = selector("#form__usuario__mano");
    var izquierda = selector("#form__usuario__mano__izquierda");
    var derecha = selector("#form__usuario__mano__derecha");
    function normalizar(elemento, opciona, opcionb) {
        if (opciona) {
            opciona.addEventListener("click", function () {
                elemento.innerHTML = "";
            });
            if (opcionb) {
                opcionb.addEventListener("click", function () {
                    elemento.innerHTML = "";
                });
            }
        }
        else {
            elemento.addEventListener("keydown", function () {
                elemento.setCustomValidity("");
            });
        }
    }
    ocuapcion.style.display = "none";
    function formulario() {
        if (nombre.value == "") {
            nombre.setCustomValidity("Ingresa su nombre, por favor");
        }
        else if (edad.value == "" || isNaN(edad.value)) {
            edad.setCustomValidity("Ingresa un semestre valido");
        }
        else if (hombre.checked == false && mujer.checked == false) {
            genero.innerHTML = "Selecione su genero, por favor";
        }
        else if (ocuapcion.value == "") {
            carrera__error.innerHTML = "Selecione una carrera, por favor";
            ocuapcion.setCustomValidity("Ingresa su ocupación, por favor");
        }
        else if (izquierda.checked == false && derecha.checked == false) {
            mano.innerHTML = "Selecione una orientacion, por favor";
        }
        else {
            registro.agregarRegistro("nombre", nombre.value);
            registro.agregarRegistro("edad", edad.value);
            if (hombre.checked) {
                registro.agregarRegistro("genero", "hombre");
            }
            else {
                registro.agregarRegistro("genero", "mujer");
            }
            registro.agregarRegistro("ocupacion", ocuapcion.value);
            if (izquierda.checked) {
                registro.agregarRegistro("mano", "izquierda");
            }
            else {
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
    var carrera = document.querySelector("#form-carrera");
    carrera.addEventListener("change", function () {
        var selectedOption = carrera.options[carrera.selectedIndex];
        var info = selectedOption.text;
        if (info == "Elige una opción") {
            carrera__error.innerHTML = "Selecione una carrera, por favor";
            ocuapcion.value = "";
        }
        else if (info == "Otra") {
            carrera__error.innerHTML = "Selecione una carrera, por favor";
            ocuapcion.value = "";
            ocuapcion.style.display = "flex";
        }
        else {
            carrera__error.innerHTML = "";
            ocuapcion.style.display = "none";
            ocuapcion.value = info;
        }
    });
    var enviar = selector("#form__usuario__enviar");
    enviar.addEventListener("click", formulario);
    var carga = new createjs.LoadQueue();
    function convertirToString(resultado) {
        var datos = [];
        var data = resultado.split("\n");
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            d = d.replace(/(\r\n|\n|\r)/gm, "");
            if (d != "") {
                datos.push(d);
            }
        }
        return datos;
    }
    function eleecionSeccion(numero) {
        //Cargar el archivo
        carga.loadFile({ id: "letras", src: "/Escritos/" + numero + "/letras.txt" });
        carga.loadFile({ id: "palabras", src: "/Escritos/" + numero + "/palabras.txt" });
        carga.loadFile({ id: "frases", src: "/Escritos/" + numero + "/frases.txt" });
        carga.loadFile({ id: "dictados", src: "/Escritos/" + numero + "/dictados.txt" });
        carga.loadFile({ id: "audios", src: "/Escritos/" + numero + "/audios.txt" });
        carga.on("fileload", function (resultado) {
            if (resultado.item.id == "letras") {
                var datos = convertirToString(resultado.result);
                nivel_1.agregarMultiple(datos);
            }
            if (resultado.item.id == "palabras") {
                var datos = convertirToString(resultado.result);
                nivel_2.agregarMultiple(datos);
            }
            if (resultado.item.id == "frases") {
                var datos = convertirToString(resultado.result);
                nivel_3.agregarMultiple(datos);
            }
            if (resultado.item.id == "dictados") {
                var datos = convertirToString(resultado.result);
                nivel_4.agregarMultiple(datos);
            }
            if (resultado.item.id == "audios") {
                var datos = convertirToString(resultado.result);
                nivel_4.agregarSonido(datos);
            }
        });
    }
    var btn_eleccion_titulo = document.querySelector("#cargaTecladoTitulo");
    var btn_eleccion_teclado = document.querySelector("#cargaTeclado");
    var btn_eleccion_1 = document.querySelector("#eleccion1");
    var btn_eleccion_2 = document.querySelector("#eleccion2");
    var btn_eleccion_3 = document.querySelector("#eleccion3");
    btn_eleccion_1.addEventListener("click", function () {
        seccion = 1;
        eleecionSeccion(1);
        seguir();
        var cambios = [];
        var cambioA = false;
        var cambioB = false;
        var pregunta1 = new Pregunta("¿Te sentiste frustrado realizando el ejercicio?", "¿Te sentiste frustrado realizando el ejercicio?");
        pregunta1.agregar("<div class=\"opcion__linkert\"><input name=\"frustrado\" type=\"radio\" value=\"1\"><p>1</p></div>", "1");
        pregunta1.agregar("<div class=\"opcion__linkert\"><input name=\"frustrado\" type=\"radio\" value=\"2\"><p>2</p></div>", "2");
        pregunta1.agregar("<div class=\"opcion__linkert\"><input name=\"frustrado\" type=\"radio\" value=\"3\"><p>3</p></div>", "3");
        pregunta1.agregar("<div class=\"opcion__linkert\"><input name=\"frustrado\" type=\"radio\" value=\"4\"><p>4</p></div>", "4");
        pregunta1.agregar("<div class=\"opcion__linkert\"><input name=\"frustrado\" type=\"radio\" value=\"5\"><p>5</p></div>", "5");
        pregunta1.incluirEn(".pregunta1");
        var pregunta2 = new Pregunta("¿Qué tan difícil te pareció el nuevo teclado?", "¿Qué tan difícil te pareció el nuevo teclado?");
        pregunta2.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"1\"><p>1</p></div>", "1");
        pregunta2.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"2\"><p>2</p></div>", "2");
        pregunta2.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"3\"><p>3</p></div>", "3");
        pregunta2.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"4\"><p>4</p></div>", "4");
        pregunta2.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"5\"><p>5</p></div>", "5");
        pregunta2.incluirEn(".pregunta1");
        pregunta1.setCambio(function () {
            if (cambioA == false) {
                cambios.push("a");
                cambioA = true;
                if (cambios.length > 1) {
                    btn__encuesta1.disabled = false;
                }
            }
        });
        pregunta2.setCambio(function () {
            if (cambioB == false) {
                cambios.push("B");
                cambioB = true;
                _this.console.log(cambios.length);
                if (cambios.length > 1) {
                    btn__encuesta1.disabled = false;
                }
            }
        });
        var btn__encuesta1 = document.querySelector("#contestarEncuesta");
        btn__encuesta1.addEventListener("click", function () {
            registro.agregarRegistro("pregunta", pregunta1.getPregunta() + ": " + pregunta1.getOpcion());
            registro.agregarRegistro("pregunta2", pregunta2.getPregunta() + ": " + pregunta2.getOpcion());
            seguir();
        });
    });
    btn_eleccion_2.addEventListener("click", function () {
        seccion = 2;
        eleecionSeccion(2);
        seguir();
        var cambios = [];
        var cambioC = false;
        var pregunta3 = new Pregunta("<h2 style=\"text-align:center;\">Siento que mi desempe\u00F1o en relaci\u00F3n con la prueba anterior:", "Siento que mi desempeño en relación con la prueba anterior:");
        pregunta3.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"1\"><p>Empeoro</p></div>", "1");
        pregunta3.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"2\"><p>Fue igual</p></div>", "2");
        pregunta3.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"3\"><p>Mejoro</p></div>", "3");
        pregunta3.incluirEn(".pregunta1");
        pregunta3.setCambio(function () {
            if (cambioC == false) {
                cambios.push("B");
                cambioC = true;
                btn__encuesta1.disabled = false;
            }
        });
        var btn__encuesta1 = document.querySelector("#contestarEncuesta");
        btn__encuesta1.addEventListener("click", function () {
            registro.agregarRegistro("pregunta3", pregunta3.getPregunta() + ": " + pregunta3.getOpcion());
            seguir();
        });
    });
    btn_eleccion_3.addEventListener("click", function () {
        seccion = 3;
        eleecionSeccion(3);
        seguir();
        var cambios = [];
        var cambioC = false;
        var pregunta3 = new Pregunta("<h2 style=\"text-align:center;\">Siento que mi desempe\u00F1o en relaci\u00F3n con la prueba anterior:", "Siento que mi desempeño en relación con la prueba anterior:");
        pregunta3.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"1\"><p>Empeoro</p></div>", "1");
        pregunta3.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"2\"><p>Fue igual</p></div>", "2");
        pregunta3.agregar("<div class=\"opcion__linkert\"><input name=\"dificultad\" type=\"radio\" value=\"3\"><p>Mejoro</p></div>", "3");
        pregunta3.incluirEn(".pregunta1");
        pregunta3.setCambio(function () {
            if (cambioC == false) {
                cambios.push("B");
                cambioC = true;
                btn__encuesta1.disabled = false;
            }
        });
        var btn__encuesta1 = document.querySelector("#contestarEncuesta");
        btn__encuesta1.addEventListener("click", function () {
            registro.agregarRegistro("pregunta", pregunta3.getPregunta() + ": " + pregunta3.getOpcion());
            seguir();
        });
    });
    var teclasNuevas = new TecladoLoad("teclado");
    nuevoTeclado = teclasNuevas.cargar();
    var updateNivel = function () {
        if (teclasNuevas.randomMode.length > 0) {
            navegador.resetOrder();
            navegador.setOrden(0, 7);
            teclasNuevas.randomMode.forEach(function (orden, index) {
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
        }
        else {
            navegador.normalizarOrden();
        }
    };
    btn_eleccion_teclado.addEventListener("change", function (a) {
        for (var i = 0; i < a.target.files.length; i++) {
            var archivo = a.target.files[i];
            var lector = new FileReader();
            lector.onload = function (e) {
                var contenido = e.target.result;
                var data = formatearTexto(contenido);
                teclasNuevas.agregar(data);
                nuevoTeclado = teclasNuevas.cargar();
                updateNivel();
                for (var i_1 = 0; i_1 < nuevoTeclado.length; i_1++) {
                    var t = nuevoTeclado[i_1];
                    try {
                        nuevasTeclas[t.original] = t.nuevo;
                    }
                    catch (_a) {
                    }
                }
            };
            lector.readAsText(archivo);
        }
    });
    function formatearTexto(resultado) {
        var datos = convertirToString(resultado);
        return datos;
    }
    var des = document.querySelector("#descargarseguro");
    des.addEventListener("click", function () {
        registro.descargarEspecifico();
        registro.descargarGeneral();
    });
    var descar = document.querySelector(".descargar__resultados");
    descar.addEventListener("click", function () {
        registro.descargarEspecifico();
        registro.descargarGeneral();
    });
    updateNivel();
    teclasNuevas.ejecutar(function () {
        updateNivel();
    });
});
