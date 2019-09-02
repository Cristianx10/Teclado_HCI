class Timer {

    horas: number;
    minutos: number;
    segundos: number;
    milisegundos: number;
    intervalo: any;

    re_milisegundos: number;

    tiempo: number;

    proceso?: Function;


    constructor() {
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        this.milisegundos = 0;
        this.intervalo = null;

        this.re_milisegundos = 0;

        this.tiempo = 0;
    }

    iniciar() {

        let hora_local = new Date();

        this.re_milisegundos = hora_local.getMilliseconds();


        this.intervalo = setInterval(() => {

            this.milisegundos++;

            if (this.milisegundos >= 100) {
                this.segundos++;
                this.milisegundos = 0;
            }

            if (this.segundos >= 60) {
                this.minutos++;
                this.segundos = 0;
            }

            if (this.minutos >= 60) {
                this.horas++;
                this.minutos = 0;
            }

            //Impresion del tiempo
            //console.log(`Tiempo: horas[ ${this.horas} ]: minutos[ ${this.minutos} ]: segundos[ ${this.segundos} ]: milis[ ${this.milisegundos} ]:`);

            //  hora_local = new Date();


            if (this.proceso) {
                this.proceso(this.getTiempo());
            }

        }, 10);

    }

    temporizador() {

        let hora_local = new Date();
        this.re_milisegundos = hora_local.getMilliseconds();


        this.intervalo = setInterval(() => {

            this.milisegundos--;

            if (this.milisegundos <= 0) {
                this.segundos--;
                this.milisegundos = 99;
            }


            if (this.segundos <= 0 && this.milisegundos == 99) {
                this.minutos--;
                this.segundos = 59;
            }

            if (this.minutos <= 0 && this.segundos == 59) {
                this.horas--;
                this.minutos = 59;
            }

            if (this.horas < 0) {
                this.milisegundos = 0;
                this.segundos = 0;
                this.minutos = 0;
                this.horas = 0;
                this.detener();
            }

            //Impresion del tiempo
            //console.log(`Tiempo: horas[ ${this.horas} ]: minutos[ ${this.minutos} ]: segundos[ ${this.segundos} ]: milis[ ${this.milisegundos} ]:`);

        }, 10);

    }

    detener() {

        let hora_local = new Date();

        if (this.re_milisegundos > hora_local.getMilliseconds()) {
            this.re_milisegundos = 1000 - this.re_milisegundos + hora_local.getMilliseconds();
        } else {
            this.re_milisegundos = hora_local.getMilliseconds() - this.re_milisegundos;
        }

        clearInterval(this.intervalo);

        this.tiempo = (this.horas * 3600000) + (this.minutos * 60000) + (this.segundos * 1000) + this.re_milisegundos;

    }

    iniciarEn(hora: number, minutos: number, segundos: number, milisegundos: number) {
        this.horas = hora;
        this.minutos = minutos;
        this.segundos = segundos;
        this.milisegundos = milisegundos;
    }

    imprimir() {
        //Confirmacion de hora del servidor
        console.log(`Servidor: horas[ ${this.horas} ]: minutos[ ${this.minutos} ]: segundos[ ${this.segundos} ]: milis[ ${this.re_milisegundos} ]:`);
    }

    getTiempo() {

        let hora_local = new Date();

        if (this.re_milisegundos > hora_local.getMilliseconds()) {
            this.re_milisegundos = 1000 - this.re_milisegundos + hora_local.getMilliseconds();
        } else {
            this.re_milisegundos = hora_local.getMilliseconds() - this.re_milisegundos;
        }

        this.tiempo = (this.horas * 3600000) + (this.minutos * 60000) + (this.segundos * 1000) + this.re_milisegundos;

        return this.tiempo + 0;
    }

    setProceso(proceso: Function) {
        this.proceso = proceso;
    }
}

class Animacion {

    elemento: HTMLElement;
    frames: Array<HTMLElement>;
    lineTime: any;
    contador: number;
    velocidad: number;
    finishAnmacion?: Function;

    constructor() {
        this.elemento = document.createElement("div");
        this.elemento.className = "contenedor__animacion";
        this.frames = new Array();
        this.contador = 0;
        this.velocidad = 100;
    }

    getFrameActual() {
        return this.frames[this.contador];
    }

    iniciar() {
        this.lineTime = setInterval(() => {
            this.elemento.innerHTML = "";

            if (this.contador < this.frames.length) {
                this.elemento.append(this.getFrameActual());
                this.contador++;
            } else {
                this.contador = 0;
                if (this.finishAnmacion != null) {
                    this.finishAnmacion();
                }
            }
        }, this.velocidad);
    }

    detener() {
        clearInterval(this.lineTime);
    }

    setFinal(accion?: Function) {
        this.finishAnmacion = accion;
    }

    agregar(ruta: string) {
        let img = document.createElement("img");
        img.src = ruta;
        this.frames.push(img);
    }

    agregarMultiple(prefijo: string, numero: number) {
        for (let i = 0; i < numero; i++) {
            let img = document.createElement("img");
            img.src = prefijo + `_${i + 1}.png`;
            this.frames.push(img);

        }
    }

    incluirEn(ruta: string) {
        let e = <HTMLElement>document.querySelector(ruta);
        e.append(this.elemento);
    }

    incrustarEn(elemento: HTMLElement) {
        elemento.append(this.elemento);
    }
}



class Navegador {

    elemento: HTMLElement;
    elementos: Array<Contenido>;
    actual: number;
    anidado?: HTMLElement;
    final?:Function;
   

    constructor() {
        this.elementos = new Array();
        this.actual = 0;
        this.elemento = document.createElement("div");
        this.elemento.className = "contenedor__nav";

   
    }

    agregar(ruta: string) {
        var contenido = new Contenido(ruta)
        this.elementos.push(contenido);
        this.elemento.append(contenido.elemento);
        return contenido;
    }

    iniciar() {
        if (this.anidado != null) {
            this.anidado.style.display = "";
        }

        this.elementoActual().accionInicial();
        this.elementos.forEach((elemento, i) => {
            if (i != 0) {
                elemento.ocultar();
            }
        });
    }

    elementoActual() {
        return this.elementos[this.actual];
    }

    siguiente() {
        this.elementoActual().accionFinal();
        this.elementoActual().ocultar();
        if (this.actual + 1 < this.elementos.length) {
            this.actual++;
            this.elementoActual().accionInicial();
            this.elementoActual().mostrar();
        }else{
            if(this.final != null){
                this.final();
            }
           
        }
    }

    setFinal(final:Function){
        this.final = final;
    }

    incluirEn(ruta: string) {
        this.anidado = <HTMLElement>document.querySelector(ruta);
        this.anidado.append(this.elemento);
    }
}

class Contenido {

    elemento: HTMLElement;
    contenido?: HTMLElement;
    accionInicial: Function;
    accionFinal: Function;

    constructor(ruta?: string) {
        let contenido = null;
        if (ruta != null) {
            contenido = <HTMLElement>document.querySelector(ruta);
        }

        this.elemento = document.createElement('div');


        if (contenido != null) {
            this.contenido = contenido;
            this.elemento.append(this.contenido);
        }
        this.accionInicial = () => { };
        this.accionFinal = () => { };
    }

    mostrar(accion?: Function) {

        this.elemento.style.display = "block";

        if (accion) {
            accion();
        }
    }

    ocultar(accion?: Function) {

        this.elemento.style.display = "none";

        if (accion) {
            accion();
        }
    }

    setInicial(accion: Function) {
        this.accionInicial = accion;
        return this;
    }

    setFinal(accion: Function) {
        this.accionFinal = accion;
        return this;
    }
}

interface Registro_Usuario {
    nombre: string;
    value: string;
}

class Registro {

    usuario: Array<Registro_Usuario>;
    general: Array<Array<string>>;
    especifico: Array<Array<string>>;
    origen: string;
    
    tiempo:Timer;

    constructor(origen: string) {
        this.origen = origen;
        let data: any = localStorage.getItem(this.origen);
        data = JSON.parse(data);
        if (data != null) {
            this.usuario = data.usuario;
            this.general = data.general;
            this.especifico = data.especifico;
        } else {
            this.usuario = [];
            this.general = [];
            this.especifico = [];
        }
        this.tiempo = new Timer();
    }

    update() {
        localStorage.setItem(this.origen, JSON.stringify(this));
    }

    agregarRegistro(nombre: string, value: string) {
        this.usuario.push({ nombre, value });
        this.update();
    }

    agregarGenerales(datos: Array<string>) {
        this.general.push(datos);
        this.update();
    }

    agregarEspecificos(datos: Array<Array<string>>) {
        for (let i = 0; i < datos.length; i++) {
            let d = datos[i];
            this.especifico.push(d);
        }
        this.update();
    }

    clear() {
        this.usuario = [];
        this.general = [];
        this.especifico = [];
        this.update();
    }

    descargarJson() {
        let text = JSON.stringify(this),
            blob = new Blob([text], { type: 'text/plain' }),
            anchor = document.createElement('a');

        anchor.download = "resultadoDictado.json";
        anchor.href = (/*window.webkitURL ||*/ window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    }

    descargarGeneral() {
        let text = "tipoDatos:	generales\n";

        this.usuario.forEach((user) => {
            let temp = text;
            text = temp + user.nombre + ":	" + user.value + "\n";
        });

        this.general.forEach((n) => {
            let temp = text;
            let datos = "";
            for (let i = 0; i < n.length; i++) {
                let d = n[i].replace(".", ",");
                let temp_datos = datos;
                if (i + 1 < n.length) {
                    datos = temp_datos + d + "	";
                } else {
                    datos = temp_datos + d;
                }
            }
            text = temp + datos + "\n";
        });

        let blob = new Blob([text], { type: 'text/plain' });
        let anchor = document.createElement('a');

        anchor.download = "gen_" + this.getFecha() + ".txt";
        anchor.href = (/*window.webkitURL ||*/ window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    }

    getFecha() {
        let fecha = new Date();
        let dia = fecha.getDay();
        let mes = fecha.getMonth();
        let ano = fecha.getFullYear();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        return `${dia}-${mes}-${ano}_${hora}-${minutos}-${segundos}`;
    }

    descargarEspecifico() {
        let text = "tipoDatos:	especificos\n";

        this.usuario.forEach((user) => {
            let temp = text;
            text = temp + user.nombre + ":	" + user.value + "\n";
        });

        this.especifico.forEach((n) => {
            let temp = text;
            let datos = "";
            for (let i = 0; i < n.length; i++) {
                let d = n[i].replace(".", ",");
                let temp_datos = datos;
                if (i + 1 < n.length) {
                    datos = temp_datos + d + "	";
                } else {
                    datos = temp_datos + d;
                }
            }
            text = temp + datos + "\n";
        });

        let blob = new Blob([text], { type: 'text/plain' });
        let anchor = document.createElement('a');

        anchor.download = "esp_" + this.getFecha() + ".txt";
        anchor.href = (/*window.webkitURL ||*/ window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    }

}

class TecladoLoad {
    id: string;
    teclado: Array<Tecla>;
    cargado: boolean;


    constructor(id: string) {
        this.id = id;

        let data = localStorage.getItem(id);

        if (data != null) {
            let datos: TecladoLoad = JSON.parse(data);
            this.teclado = datos.teclado;
            this.cargado = datos.cargado;

            if (this.cargado) {
                let e = <HTMLElement>document.querySelector("#restablecerTeclado");
                if (e != null) {
                    e.style.display = "block"
                    e.addEventListener("click", this.restablecer.bind(this));
                    e = <HTMLElement>document.querySelector("#subirTecladoTitulo");
                    e.innerHTML = "Cambiar Teclado";
                    e = <HTMLElement>document.querySelector("#cargaTecladoTitulo");
                    e.innerHTML = "Tu teclado esta cargado";

                }
            }
        } else {
            this.teclado = new Array();
            this.cargado = false;
        }
        this.update();
    }

    agregar(texto: Array<string>) {
        this.teclado = [];
        for (let i = 0; i < texto.length; i++) {
            let t = texto[i];
            let teclas = t.split("/");
            this.teclado.push({ original: teclas[0], nuevo: teclas[1] });
        }
        this.cargado = true;
        let e = <HTMLElement>document.querySelector("#restablecerTeclado");
        if (e != null) {
            e.style.display = "block";
        }
        e = <HTMLElement>document.querySelector("#subirTecladoTitulo");
        e.innerHTML = "Cambiar Teclado";
        e = <HTMLElement>document.querySelector("#cargaTecladoTitulo");
        e.innerHTML = "Tu teclado esta cargado";
        this.update();
    }

    restablecer() {
        this.teclado = [];
        this.cargado = false;
        nuevoTeclado = [];
        nuevasTeclas = null;
        let e = <HTMLElement>document.querySelector("#restablecerTeclado");
        if (e != null) {
            e.style.display = "none"
        }
        e = <HTMLElement>document.querySelector("#subirTecladoTitulo");
        e.innerHTML = "Subir teclado";
        e = <HTMLElement>document.querySelector("#cargaTecladoTitulo");
        e.innerHTML = "Aun no has escogido teclado";


        this.update();
    }

    estado() {
        return this.cargado;
    }

    update() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }


    cargar() {
        return this.teclado;
    }
}