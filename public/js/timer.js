"use strict";
var Timer = /** @class */ (function () {
    function Timer() {
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        this.milisegundos = 0;
        this.intervalo = null;
        this.re_milisegundos = 0;
        this.tiempo = 0;
    }
    Timer.prototype.iniciar = function () {
        var _this = this;
        var hora_local = new Date();
        this.re_milisegundos = hora_local.getMilliseconds();
        this.intervalo = setInterval(function () {
            _this.milisegundos++;
            if (_this.milisegundos >= 100) {
                _this.segundos++;
                _this.milisegundos = 0;
            }
            if (_this.segundos >= 60) {
                _this.minutos++;
                _this.segundos = 0;
            }
            if (_this.minutos >= 60) {
                _this.horas++;
                _this.minutos = 0;
            }
            //Impresion del tiempo
            //console.log(`Tiempo: horas[ ${this.horas} ]: minutos[ ${this.minutos} ]: segundos[ ${this.segundos} ]: milis[ ${this.milisegundos} ]:`);
            hora_local = new Date();
        }, 10);
    };
    Timer.prototype.temporizador = function () {
        var _this = this;
        var hora_local = new Date();
        this.re_milisegundos = hora_local.getMilliseconds();
        this.intervalo = setInterval(function () {
            _this.milisegundos--;
            if (_this.milisegundos <= 0) {
                _this.segundos--;
                _this.milisegundos = 99;
            }
            if (_this.segundos <= 0 && _this.milisegundos == 99) {
                _this.minutos--;
                _this.segundos = 59;
            }
            if (_this.minutos <= 0 && _this.segundos == 59) {
                _this.horas--;
                _this.minutos = 59;
            }
            if (_this.horas < 0) {
                _this.milisegundos = 0;
                _this.segundos = 0;
                _this.minutos = 0;
                _this.horas = 0;
                _this.detener();
            }
            //Impresion del tiempo
            //console.log(`Tiempo: horas[ ${this.horas} ]: minutos[ ${this.minutos} ]: segundos[ ${this.segundos} ]: milis[ ${this.milisegundos} ]:`);
        }, 10);
    };
    Timer.prototype.detener = function () {
        var hora_local = new Date();
        if (this.re_milisegundos > hora_local.getMilliseconds()) {
            this.re_milisegundos = 1000 - this.re_milisegundos + hora_local.getMilliseconds();
        }
        else {
            this.re_milisegundos = hora_local.getMilliseconds() - this.re_milisegundos;
        }
        clearInterval(this.intervalo);
        this.tiempo = (this.horas * 3600000) + (this.minutos * 60000) + (this.segundos * 1000) + this.re_milisegundos;
    };
    Timer.prototype.iniciarEn = function (hora, minutos, segundos, milisegundos) {
        this.horas = hora;
        this.minutos = minutos;
        this.segundos = segundos;
        this.milisegundos = milisegundos;
    };
    Timer.prototype.imprimir = function () {
        //Confirmacion de hora del servidor
        console.log("Servidor: horas[ " + this.horas + " ]: minutos[ " + this.minutos + " ]: segundos[ " + this.segundos + " ]: milis[ " + this.re_milisegundos + " ]:");
    };
    Timer.prototype.getTiempo = function () {
        var hora_local = new Date();
        if (this.re_milisegundos > hora_local.getMilliseconds()) {
            this.re_milisegundos = 1000 - this.re_milisegundos + hora_local.getMilliseconds();
        }
        else {
            this.re_milisegundos = hora_local.getMilliseconds() - this.re_milisegundos;
        }
        this.tiempo = (this.horas * 3600000) + (this.minutos * 60000) + (this.segundos * 1000) + this.re_milisegundos;
        return this.tiempo + 0;
    };
    return Timer;
}());
var Animacion = /** @class */ (function () {
    function Animacion() {
        this.elemento = document.createElement("div");
        this.elemento.className = "contenedor__animacion";
        this.frames = new Array();
        this.contador = 0;
        this.velocidad = 100;
    }
    Animacion.prototype.getFrameActual = function () {
        return this.frames[this.contador];
    };
    Animacion.prototype.iniciar = function () {
        var _this = this;
        this.lineTime = setInterval(function () {
            _this.elemento.innerHTML = "";
            if (_this.contador < _this.frames.length) {
                _this.elemento.append(_this.getFrameActual());
                _this.contador++;
            }
            else {
                _this.contador = 0;
                if (_this.finishAnmacion != null) {
                    _this.finishAnmacion();
                }
            }
        }, this.velocidad);
    };
    Animacion.prototype.detener = function () {
        clearInterval(this.lineTime);
    };
    Animacion.prototype.setFinal = function (accion) {
        this.finishAnmacion = accion;
    };
    Animacion.prototype.agregar = function (ruta) {
        var img = document.createElement("img");
        img.src = ruta;
        this.frames.push(img);
    };
    Animacion.prototype.agregarMultiple = function (prefijo, numero) {
        for (var i = 0; i < numero; i++) {
            var img = document.createElement("img");
            img.src = prefijo + ("_" + (i + 1) + ".png");
            this.frames.push(img);
        }
    };
    Animacion.prototype.incluirEn = function (ruta) {
        var e = document.querySelector(ruta);
        e.append(this.elemento);
    };
    Animacion.prototype.incrustarEn = function (elemento) {
        elemento.append(this.elemento);
    };
    return Animacion;
}());
var Navegador = /** @class */ (function () {
    function Navegador() {
        this.elementos = new Array();
        this.actual = 0;
        this.elemento = document.createElement("div");
    }
    Navegador.prototype.agregar = function (ruta) {
        var contenido = new Contenido(ruta);
        this.elementos.push(contenido);
        this.elemento.append(contenido.elemento);
        return contenido;
    };
    Navegador.prototype.iniciar = function () {
        this.elementoActual().accionInicial();
        this.elementos.forEach(function (elemento, i) {
            if (i != 0) {
                elemento.ocultar();
            }
        });
    };
    Navegador.prototype.elementoActual = function () {
        return this.elementos[this.actual];
    };
    Navegador.prototype.siguiente = function () {
        this.elementoActual().accionFinal();
        this.elementoActual().ocultar();
        if (this.actual + 1 < this.elementos.length) {
            this.actual++;
            this.elementoActual().accionInicial();
            this.elementoActual().mostrar();
        }
    };
    Navegador.prototype.incluirEn = function (ruta) {
        var contenido = document.querySelector(ruta);
        contenido.append(this.elemento);
    };
    return Navegador;
}());
var Contenido = /** @class */ (function () {
    function Contenido(ruta) {
        var contenido = null;
        if (ruta != null) {
            contenido = document.querySelector(ruta);
        }
        this.elemento = document.createElement('div');
        if (contenido != null) {
            this.contenido = contenido;
            this.elemento.append(this.contenido);
        }
        this.accionInicial = function () { };
        this.accionFinal = function () { };
    }
    Contenido.prototype.mostrar = function (accion) {
        this.elemento.style.display = "block";
        if (accion) {
            accion();
        }
    };
    Contenido.prototype.ocultar = function (accion) {
        this.elemento.style.display = "none";
        if (accion) {
            accion();
        }
    };
    Contenido.prototype.setInicial = function (accion) {
        this.accionInicial = accion;
    };
    Contenido.prototype.setFinal = function (accion) {
        this.accionFinal = accion;
    };
    return Contenido;
}());
var Registro = /** @class */ (function () {
    function Registro(origen) {
        this.origen = origen;
        var data = localStorage.getItem(this.origen);
        data = JSON.parse(data);
        if (data != null) {
            this.usuario = data.usuario;
            this.general = data.general;
            this.especifico = data.especifico;
        }
        else {
            this.usuario = [];
            this.general = [];
            this.especifico = [];
        }
    }
    Registro.prototype.update = function () {
        localStorage.setItem(this.origen, JSON.stringify(this));
    };
    Registro.prototype.agregarRegistro = function (nombre, value) {
        this.usuario.push({ nombre: nombre, value: value });
        this.update();
    };
    Registro.prototype.agregarGenerales = function (datos) {
        console.log(this.general);
        this.general.push(datos);
        this.update();
    };
    Registro.prototype.agregarEspecificos = function (datos) {
        for (var i = 0; i < datos.length; i++) {
            var d = datos[i];
            this.especifico.push(d);
        }
        this.update();
    };
    Registro.prototype.clear = function () {
        this.usuario = [];
        this.general = [];
        this.especifico = [];
        this.update();
    };
    Registro.prototype.descargarJson = function () {
        var text = JSON.stringify(this), blob = new Blob([text], { type: 'text/plain' }), anchor = document.createElement('a');
        anchor.download = "resultadoDictado.json";
        anchor.href = ( /*window.webkitURL ||*/window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    };
    Registro.prototype.descargarGeneral = function () {
        var text = "";
        this.usuario.forEach(function (user) {
            var temp = text;
            text = temp + user.nombre + ":	" + user.value + "\n";
        });
        this.general.forEach(function (n) {
            var temp = text;
            var datos = "";
            for (var i = 0; i < n.length; i++) {
                var d = n[i].replace(".", ",");
                var temp_datos = datos;
                if (i + 1 < n.length) {
                    datos = temp_datos + d + "	";
                }
                else {
                    datos = temp_datos + d;
                }
            }
            text = temp + datos + "\n";
        });
        var blob = new Blob([text], { type: 'text/plain' });
        var anchor = document.createElement('a');
        anchor.download = "resultadoDictado.txt";
        anchor.href = ( /*window.webkitURL ||*/window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    };
    Registro.prototype.descargarEspecifico = function () {
        var text = "";
        this.usuario.forEach(function (user) {
            var temp = text;
            text = temp + user.nombre + ":	" + user.value + "\n";
        });
        this.especifico.forEach(function (n) {
            var temp = text;
            var datos = "";
            for (var i = 0; i < n.length; i++) {
                var d = n[i].replace(".", ",");
                var temp_datos = datos;
                if (i + 1 < n.length) {
                    datos = temp_datos + d + "	";
                }
                else {
                    datos = temp_datos + d;
                }
            }
            text = temp + datos + "\n";
        });
        var blob = new Blob([text], { type: 'text/plain' });
        var anchor = document.createElement('a');
        anchor.download = "resultadoDictado.txt";
        anchor.href = ( /*window.webkitURL ||*/window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    };
    return Registro;
}());
