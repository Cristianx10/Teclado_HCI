
class Sonido {

    elemento: HTMLAudioElement;
    recurso: HTMLSourceElement;
    final?: Function;

    constructor(ruta: string) {
        this.elemento = document.createElement("audio");
        this.recurso = document.createElement("source");
        this.recurso.type = "audio/mp3";
        this.recurso.src = ruta;
        this.elemento.append(this.recurso);

        this.elemento.addEventListener("loadeddata", () => {

            this.elemento.addEventListener("ended", () => {
                if (this.final != null) {
                    this.final();
                }
            });
        });


    }

    play() {
        this.elemento.play();
    }

    playEn(segundo: number) {
        this.elemento.currentTime = segundo;
        this.elemento.play();
    }

    getTiempo() {
        return this.elemento.duration;
    }

    setFinal(final: Function) {
        this.final = final;
    }

    stop() {
        this.elemento.pause();
        this.elemento.currentTime = 0;
    }
}

var sonidoBien = new Sonido("/audios/Bueno.mp3");
var sonidoError = new Sonido("/audios/Malo.mp3");

var emojiBien = new Animacion();
emojiBien.agregarMultiple("/img/emoji_bien/emoji", 11);



interface Registro_Error {
    tiempo: number;
    error: string;
    posicion: number;
}

interface Registro_Letra {
    letra: string;
    tiempo: number;
    errores: Array<Registro_Error>;
}

interface Registro_Frase {
    frase: string;
    tiempo: number;
    errores: number;
}

class BloqueNum {

    elemento: HTMLElement;
    numero: number;

    constructor(numero?: number) {
        this.elemento = document.createElement("div");
        this.numero = 0;
        this.elemento.innerText = this.numero + "";
    }

    actualizar() {
        this.elemento.innerText = this.numero + "";
    }
}

function eliminarDiacriticos(texto: any) {
    return texto.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("Á", "A").replace("É", "E").replace("Í", "I").replace("Ó", "O").replace("Ú", "U");
}

interface Tecla {
    original: string;
    nuevo: string;
}



class Letra {

    validado: Boolean;
    activo: boolean;
    sonidoError: Sonido;
    elemento: HTMLElement;
    ocultado: boolean;

    tiempoIniciado: boolean;

    letra: string;
    //tiempo: Timer;
    tiempo: any;

    errores: Array<Registro_Error>;
    keyCode: number;
    nivel:number;

    constructor(letra: string, nivel:number) {
        //this.tiempo = new Timer();
        this.tiempo = {};
        this.letra = letra.toLowerCase();
        this.letra = eliminarDiacriticos(this.letra);
        this.validado = false;
        this.activo = false;
        this.errores = new Array();
        this.ocultado = false;

        this.nivel = nivel;

        this.elemento = document.createElement('div');
        this.elemento.className = "letra";
        this.elemento.innerText = letra;

        if (letra == " ") {
            this.elemento.classList.add("space");
            this.elemento.innerText = "_";
        }

        this.sonidoError = sonidoError;
        this.tiempoIniciado = false;
        this.keyCode = 0;

    }

    iniciarConteo() {
        //this.tiempo.iniciar();
        let fecha = new Date();
        this.tiempo.inicial = fecha.getTime();
    }

    detenerConteo() {
        //this.tiempo.detener();
        let fecha = new Date();
        this.tiempo.final = fecha.getTime();
    }

    getTiempo() {

        let tiempo = this.tiempo.final - this.tiempo.inicial;
        return tiempo / 1000;
    }

    iniciar(inicio?: boolean) {
        if (this.activo == false) {

            if (inicio != null) {
                if (inicio) {
                    this.tiempoIniciado = true;
                    this.iniciarConteo();
                } else {

                }
            } else {
                this.tiempoIniciado = true;
                this.iniciarConteo();
            }

            this.activo = true;
            this.elemento.classList.add("underline");
        }

    }

    iniciarTiempo() {
        if (this.tiempoIniciado == false) {
            this.tiempoIniciado = true;
            this.iniciarConteo();
        }
    }

    detener() {
        this.detenerConteo();
        //  let i = this.letra + ":" + this.tiempo.getTiempo() + "";
        //  this.elemento.innerHTML = i;
    }

    ocultar() {
        this.ocultado = true;
        this.elemento.innerText = "_";
        this.elemento.style.color = "transparent";
    }

    keyPressed(event: any, accion?: Function) {
        if (this.validado == false && this.activo == true) {
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


            if (keys[key] == false || keys[key] == null) {

                keys[key] = true;

                key = eliminarDiacriticos(key);

                if (key != "capslock" && key != "backspace" && key != "shift" && key != "dead") {
                    this.keyCode = event.keyCode;
                    if (key == this.letra) {

                        this.validando();
                        if (this.ocultado) {

                            if (this.letra == " ") {
                                this.elemento.innerText = "_";
                            } else {
                                this.elemento.innerText = this.letra;
                            }
                            this.elemento.style.color = "";
                        }
                        this.elemento.classList.remove("underline");
                    } else {
                        let final = new Date();
                        let ti = final.getTime() - this.tiempo.inicial;

                        this.errores.push({ tiempo: ti / 1000, error: key, posicion: this.keyCode });

                        this.sonidoError.stop();
                        this.sonidoError.play();
                    }

                    if (accion != null) {
                        accion(this.validado);
                    }
                }
            }
        }
    }

    validando() {
        this.detener();
        this.validado = true;
        this.activo = false;
        this.elemento.classList.add("validado");

        //this.tiempo.imprimir();
    }

    incluirEn(elemento: HTMLElement) {
        elemento.append(this.elemento);
    }

    toString(): Array<string> {
        let dataError: Array<string> = [];
        this.errores.forEach((e) => {
            let ti = e.tiempo + "";
            ti = ti.replace(".", ",");
            let pos = e.posicion;
            dataError.push(`{${e.error}, ${ti}}, ${pos}`);
        });
        let timeLetra = this.getTiempo();
        return [this.nivel+"", this.letra, timeLetra + "", this.errores.length + "", this.keyCode + "", JSON.stringify(dataError)];
    }
}

class Texto {

    texto: string;
    letras: Array<Letra>;
    contador: number;
    final?: Function;
    activo: boolean;

    elemento: HTMLElement;
    audio?: Sonido;

    tiempoIniciado = false;

    errores: number;
    timer: Timer;
    tiempo: any;

    view_tiempo: HTMLElement;
    view_error: HTMLElement;
    nivel:number;

    constructor(texto: string, nivel:number, url?: string) {
        this.texto = texto;
        this.letras = new Array();
        this.contador = 0;
        this.elemento = document.createElement("div");
        this.elemento.className = "texto";
        this.activo = false;
        this.nivel = nivel;

        this.errores = 0;
        this.timer = new Timer();
        this.tiempo = {};

        let palabra = document.createElement("div");
        palabra.className = "palabra";
        let encontro = false;

        for (let i = 0; i < this.texto.length; i++) {
            let l = this.texto.charAt(i);
            let new_l = new Letra(l, this.nivel);
            this.letras.push(new_l);
            palabra.append(new_l.elemento);
            if (l == " ") {
                encontro = true;
                this.elemento.append(palabra);
                palabra = document.createElement("div");
                palabra.className = "palabra";
            }
        }


        this.elemento.append(palabra);


        if (url != null) {
            this.audio = new Sonido(url);
        }

        this.view_tiempo = document.createElement("div");
        this.view_tiempo.className = "view__tiempo";

        this.view_error = document.createElement("div");
        this.view_error.className = "view__error";
        this.view_error.innerText = this.errores + "";

        this.timer.setProceso((t: number) => {
            this.view_tiempo.innerHTML = t / 1000 + "";
        });

    }

    iniciarConteo() {
        let fecha = new Date();
        this.timer.iniciar();
        // this.tiempo.inicial = tiempoGlobal.getTiempo();
        this.tiempo.inicial = fecha.getTime();
    }

    detenerConteo() {
        this.timer.detener();
        let fecha = new Date();
        this.tiempo.final = fecha.getTime();
    }

    getTiempo() {
        let time = (this.tiempo.final - this.tiempo.inicial) / 1000;
        return time;
    }

    verTiempo(ver?: boolean) {
        if (ver != null) {
            if (ver) {
                this.elemento.append(this.view_tiempo);
            } else {
                this.elemento.removeChild(this.view_tiempo);
            }
        } else {
            this.elemento.append(this.view_tiempo);
        }
    }

    verError(ver?: boolean) {
        if (ver != null) {
            if (ver) {
                this.elemento.append(this.view_error);
            } else {
                this.elemento.removeChild(this.view_error);
            }
        } else {
            this.elemento.append(this.view_error);
        }


    }

    agregarSonido(url?: string) {
        if (url != null) {
            this.audio = new Sonido(url);
        }
    }

    play(rechazo?: number) {
        if (this.audio != null) {
            let guia;
            if (rechazo != null) {
                guia = this.contador * (this.audio.getTiempo() - (this.audio.getTiempo() / rechazo)) / this.letras.length;
            } else {
                guia = this.contador * this.audio.getTiempo() / this.letras.length;
            }

            this.audio.playEn(guia);
        }
    }

    iniciar(inicio?: boolean) {
        if (this.activo == false) {
            this.activo = true;

            if (inicio != null) {
                if (inicio) {
                    this.tiempoIniciado = true;
                    this.iniciarConteo();
                }
            } else {
                this.tiempoIniciado = true;
                this.iniciarConteo();
            }

        }
        if (inicio != null) {
            if (inicio) {
                this.letras[this.contador].iniciar();
            } else {
                this.letras[this.contador].iniciar(inicio);
            }
        } else {
            this.letras[this.contador].iniciar();
        }

    }

    iniciarTiempo() {
        if (this.tiempoIniciado == false) {
            this.tiempoIniciado = true;
            this.iniciarConteo();
        }
        if (this.contador < this.letras.length) {
            this.letras[this.contador].iniciarTiempo();
        }

    }

    detener() {
        //this.tiempo.detener();
        this.detenerConteo();
        if (this.final != null) {
            this.final();
        }
    }

    ocultar() {
        this.letras.forEach((l) => {
            l.ocultar();
        });
    }

    setFinal(final: Function) {
        this.final = final;
    }

    keyPressed(event: any) {

        if (this.contador < this.letras.length) {
            this.letras[this.contador].keyPressed(event, (validado: Boolean) => {

                if (validado) {
                    this.contador++;
                    if (this.contador < this.letras.length) {
                        this.iniciar();
                    } else {
                        this.detener();
                    }
                } else {
                    this.errores++;
                    this.view_error.innerText = this.errores + "";
                }
            });
        }
    }

    incluirEn(ruta: string) {
        let e = <HTMLElement>document.querySelector(ruta);
        e.append(this.elemento);
    }

    toString(): Array<string> {
        let timePalabra = this.getTiempo() + "";
        return [this.nivel+"", this.texto, timePalabra, this.errores + ""];
    }

    toStringEspecificos(): Array<Array<string>> {
        let data: Array<Array<string>> = [];
        data.push(this.toString());
        this.letras.forEach((l) => {
            data.push(l.toString());
        });
        return data;
    }
}

function inicioDelTiempo() {

}

class TextoMultiple {

    textos: Array<Texto>;
    actual: number;
    elemento: HTMLElement;
    final?: Function;
    emojiBien: Animacion;
    sonidoBien: Sonido;
    activado: boolean;

    btn_play?: HTMLElement;

    inicial: boolean = true;

    view_proceso: HTMLElement;
    nivel:number;


    constructor(nivel:number, textos?: Array<string>, urls?: Array<string>) {

        this.actual = 0;
        this.textos = new Array();
        this.activado = false;
        this.nivel = nivel;

        if (textos != null) {
            textos.forEach((t, index) => {
                if (urls != null) {
                    this.textos.push(new Texto(t, this.nivel, urls[index]));
                } else {
                    this.textos.push(new Texto(t, this.nivel));
                }
            });
        }

        this.elemento = document.createElement("div");
        this.elemento.className = "texto__multiple";

        if (urls != null) {
            this.btn_play = document.createElement("div");
            this.btn_play.className = "boton__play";
            this.elemento.append(this.btn_play);
            this.btn_play.addEventListener("click", () => {
                this.elementoActual().play(4);

            });
        }

        this.emojiBien = emojiBien;
        this.sonidoBien = sonidoBien;

        this.view_proceso = document.createElement("div");
        this.view_proceso.className = "view__proceso";
        this.view_proceso.innerText = this.actual + "/" + this.textos.length;

    }

    agregarMultiple(textos?: Array<string>, urls?: Array<string>) {
        if (textos != null) {
            textos.forEach((t, index) => {
                if (urls != null) {
                    this.textos.push(new Texto(t, this.nivel, urls[index]));
                } else {
                    this.textos.push(new Texto(t, this.nivel));
                }
            });
        }

        if (urls != null) {
            this.btn_play = document.createElement("div");
            this.btn_play.className = "boton__play";
            this.elemento.append(this.btn_play);
            this.btn_play.addEventListener("click", () => {
                this.elementoActual().play(4);
            });
        }

    }

    agregarSonido(urls?: Array<string>) {

        if (urls != null) {

            this.textos.forEach((t, index) => {
                t.agregarSonido(urls[index]);
            });

            this.btn_play = document.createElement("div");
            this.btn_play.className = "boton__play";
            this.elemento.append(this.btn_play);
            this.btn_play.addEventListener("click", () => {
                this.elementoActual().play(4);
            });
        }
    }

    play() {
        this.elementoActual().play();
    }

    iniciar(inicio?: boolean) {
        this.activado = true;
        let elemento = this.elementoActual();

        if (inicio != null) {
            this.inicial = inicio;
        }

        if (this.inicial == false) {
            document.addEventListener("keydown", this.inicioAplicacion.bind(this));
        }

        let audio = this.elementoActual().audio;
        
        if (audio != null) {
            audio.setFinal(() => {
                this.iniciarTiempo();
                console.log("Termino el audio");
            });
        }

        this.view_proceso.innerText = (this.actual + 1) + "/" + this.textos.length;
        this.continuar(elemento);
    }

    detenerTodo(){

        let elemento = this.elementoActual();

        if (this.actual < this.textos.length) {
            elemento.detener();
            this.elemento.removeChild(elemento.elemento);
            this.actual = this.textos.length - 1;
            this.view_proceso.innerText = (this.actual + 1) + "/" + this.textos.length;

            if (this.actual < this.textos.length) {
                elemento = this.elementoActual();
                this.play();
                this.continuar(elemento);
            } else {
                this.detener();
            }
        }

    }

    verProgreso(ver?: boolean) {
        if (ver != null) {
            if (ver) {
                this.elemento.append(this.view_proceso);
            } else {
                this.elemento.removeChild(this.view_proceso);
            }
        } else {
            this.elemento.append(this.view_proceso);
        }
    }

    verTiempo(ver?: boolean) {
        for (let i = 0; i < this.textos.length; i++) {
            let t = this.textos[i];
            t.verTiempo(ver);
        }
    }

    verErrores(ver?: boolean) {
        for (let i = 0; i < this.textos.length; i++) {
            let t = this.textos[i];
            t.verError(ver);
        }
    }

    inicioAplicacion() {
        this.iniciarTiempo();
        document.removeEventListener("keydown", this.inicioAplicacion);
    }

    iniciarTiempo() {
        let elemento = this.elementoActual();
        elemento.iniciarTiempo();
    }

    ocultar() {
        this.textos.forEach((t) => {
            t.ocultar();
        });
    }

    continuar(elemento: Texto) {

        this.elemento.append(elemento.elemento);

        elemento.iniciar(this.inicial);

        elemento.setFinal(() => {
            this.emojiBien.iniciar();
            this.sonidoBien.play();
            this.emojiBien.incrustarEn(this.elemento);
            this.emojiBien.setFinal(() => {
                this.sonidoBien.stop();
                this.emojiBien.detener();
                this.siguiente();
            });
        });
    }

    

    siguiente() {
        if (this.actual < this.textos.length) {
            let elemento = this.elementoActual();
            this.elemento.removeChild(elemento.elemento);
            this.actual++;
            this.view_proceso.innerText = (this.actual + 1) + "/" + this.textos.length;

            if (this.actual < this.textos.length) {
                elemento = this.elementoActual();
                this.play();
                this.continuar(elemento);
            } else {
                this.detener();
            }
        }
    }

    elementoActual() {
        return this.textos[this.actual];
    }

    detener() {
        if (this.final != null) {
            this.final(this);
        }
    }

    toString() {
        let datosG: Array<Array<string>> = [];
        this.textos.forEach((t) => {
            datosG.push(t.toString());
        });
        return datosG;
    }

    toStringEspecificos() {
        let datosE: Array<Array<Array<string>>> = [];
        this.textos.forEach((t) => {
            datosE.push(t.toStringEspecificos());
        });
        return datosE;
    }

    setFinal(final: Function) {
        this.final = final;
    }

    cambiarUbicacion(ruta:string){
        this.elemento = <HTMLElement>document.querySelector(ruta);
    }

    incluirEn(ruta: string) {
        let e = <HTMLElement>document.querySelector(ruta);
        e.append(this.elemento);
    }

    keyPressed(event: any) {
        if (this.activado) {
            if (this.actual < this.textos.length) {
                let elemento = this.elementoActual();
                elemento.keyPressed(event);
            }
        }
    }
}

class Pregunta{

    elemento:HTMLElement;
    opciones:Array<Opcion>;
    seleccion?:Opcion;
    titulo:HTMLElement;
    opcionesHTML:HTMLElement;

    cambio?:Function;

    valor:string;
   
    constructor(informacion:string, valor:string){
        this.valor = valor;
        this.elemento = document.createElement("div");
        this.elemento.className = "pregunta";
        
        this.titulo = document.createElement("div");
        this.titulo.className = "pregunta__titulo";
        this.titulo.innerHTML = informacion;

        this.opcionesHTML = document.createElement("div");
        this.opcionesHTML.className = "pregunta__opciones";

        this.elemento.append(this.titulo);
        this.elemento.append(this.opcionesHTML);
      
        this.opciones = new Array();

    }

    agregar(informacion:string, valor:string){
  
        let opcion = new Opcion(this, informacion, valor)
        this.opciones.push(opcion);
        this.opcionesHTML.append(opcion.elemento);
    }

    incluirEn(ruta:string){
        let contenedor:HTMLElement = <HTMLElement>document.querySelector(ruta);
        console.log(contenedor)
        contenedor.append(this.elemento);
    }

    setCambio(cambio:Function){
        this.cambio = cambio;
    }

    getPregunta(){
        return this.valor;
    }

    getOpcion(){
        let info = null;
        if(this.seleccion != null){
            info = this.seleccion.valor;
        }
        return info;
    }
}

class Opcion{
    pregunta:Pregunta;
    elemento:HTMLElement;
    valor:string

    constructor(pregunta:Pregunta, informacion:string, valor:string){
        this.valor = valor;
        this.pregunta = pregunta;
        this.elemento = document.createElement("div");
        this.elemento.className = "pregunta__opcion";

        this.elemento.innerHTML = informacion;

        this.elemento.addEventListener("click", ()=>{
            this.pregunta.seleccion = this;
            if(this.pregunta.cambio != null){
                this.pregunta.cambio(this.pregunta.valor, this.valor);
            }
        });
    }
}

/*
var l = new TextoMultiple(["hola mundo", "Tengo un nombre"]);
l.iniciar();
l.incluirEn(".contenedor");

l.setFinal(() => {
    console.log("Finalizo")
});

var teclado = document.addEventListener("keydown", (event: any) => {
    l.keyPressed(event);
});*/