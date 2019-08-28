"use strict";
var nuevoTeclado = [];
var Sonido = /** @class */ (function () {
    function Sonido(ruta) {
        this.elemento = document.createElement("audio");
        this.recurso = document.createElement("source");
        this.recurso.type = "audio/mp3";
        this.recurso.src = ruta;
        this.elemento.append(this.recurso);
    }
    Sonido.prototype.play = function () {
        this.elemento.play();
    };
    Sonido.prototype.playEn = function (segundo) {
        this.elemento.currentTime = segundo;
        this.elemento.play();
    };
    Sonido.prototype.getTiempo = function () {
        return this.elemento.duration;
    };
    Sonido.prototype.stop = function () {
        this.elemento.pause();
        this.elemento.currentTime = 0;
    };
    return Sonido;
}());
var sonidoBien = new Sonido("/audios/Bueno.mp3");
var sonidoError = new Sonido("/audios/Malo.mp3");
var emojiBien = new Animacion();
emojiBien.agregarMultiple("/img/emoji_bien/emoji", 11);
var BloqueNum = /** @class */ (function () {
    function BloqueNum(numero) {
        this.elemento = document.createElement("div");
        this.numero = 0;
        this.elemento.innerText = this.numero + "";
    }
    BloqueNum.prototype.actualizar = function () {
        this.elemento.innerText = this.numero + "";
    };
    return BloqueNum;
}());
var Letra = /** @class */ (function () {
    function Letra(letra) {
        this.tiempo = new Timer();
        this.letra = letra.toLowerCase();
        this.validado = false;
        this.activo = false;
        this.errores = new Array();
        this.ocultado = false;
        this.elemento = document.createElement('div');
        this.elemento.className = "letra";
        this.elemento.innerText = letra;
        if (letra == " ") {
            this.elemento.classList.add("space");
            this.elemento.innerText = "_";
        }
        this.sonidoError = sonidoError;
        this.tiempoIniciado = false;
    }
    Letra.prototype.iniciar = function (inicio) {
        if (this.activo == false) {
            if (inicio != null) {
                if (inicio) {
                    this.tiempoIniciado = true;
                    this.tiempo.iniciar();
                }
                else {
                }
            }
            else {
                this.tiempoIniciado = true;
                this.tiempo.iniciar();
            }
            this.activo = true;
            this.elemento.classList.add("underline");
        }
    };
    Letra.prototype.iniciarTiempo = function () {
        if (this.tiempoIniciado == false) {
            this.tiempoIniciado = true;
            this.tiempo.iniciar();
        }
    };
    Letra.prototype.detener = function () {
        this.tiempo.detener();
    };
    Letra.prototype.ocultar = function () {
        this.ocultado = true;
        this.elemento.innerText = "_";
        this.elemento.style.color = "transparent";
    };
    Letra.prototype.keyPressed = function (event, accion) {
        if (this.validado == false && this.activo == true) {
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
            if (keys[key] == false || keys[key] == null) {
                keys[key] = true;
                if (key != "capslock" && key != "backspace" && key != "shift") {
                    if (key == this.letra) {
                        this.validando();
                        if (this.ocultado) {
                            if (this.letra == " ") {
                                this.elemento.innerText = "_";
                            }
                            else {
                                this.elemento.innerText = this.letra;
                            }
                            this.elemento.style.color = "";
                        }
                        this.elemento.classList.remove("underline");
                    }
                    else {
                        this.errores.push({ tiempo: this.tiempo.getTiempo() / 1000, error: key });
                        this.sonidoError.stop();
                        this.sonidoError.play();
                    }
                    if (accion != null) {
                        accion(this.validado);
                    }
                }
            }
        }
    };
    Letra.prototype.validando = function () {
        this.tiempo.detener();
        this.validado = true;
        this.activo = false;
        this.elemento.classList.add("validado");
        //this.tiempo.imprimir();
    };
    Letra.prototype.incluirEn = function (elemento) {
        elemento.append(this.elemento);
    };
    Letra.prototype.toString = function () {
        var dataError = [];
        this.errores.forEach(function (e) {
            dataError.push("{" + e.error + ", " + e.tiempo + "}");
        });
        return [this.letra, this.tiempo.getTiempo() / 1000 + "", this.errores.length + "", JSON.stringify(dataError)];
    };
    return Letra;
}());
var Texto = /** @class */ (function () {
    function Texto(texto, url) {
        var _this = this;
        this.tiempoIniciado = false;
        this.texto = texto;
        this.letras = new Array();
        this.contador = 0;
        this.elemento = document.createElement("div");
        this.elemento.className = "texto";
        this.activo = false;
        this.errores = 0;
        this.tiempo = new Timer();
        var palabra = document.createElement("div");
        palabra.className = "palabra";
        var encontro = false;
        for (var i = 0; i < this.texto.length; i++) {
            var l = this.texto.charAt(i);
            var new_l = new Letra(l);
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
        this.tiempo.setProceso(function (t) {
            _this.view_tiempo.innerHTML = t / 1000 + "";
        });
        this.verTiempo();
    }
    Texto.prototype.verTiempo = function () {
        this.elemento.append(this.view_tiempo);
    };
    Texto.prototype.agregarSonido = function (url) {
        if (url != null) {
            this.audio = new Sonido(url);
        }
    };
    Texto.prototype.play = function (rechazo) {
        if (this.audio != null) {
            var guia = void 0;
            if (rechazo != null) {
                guia = this.contador * (this.audio.getTiempo() - (this.audio.getTiempo() / rechazo)) / this.letras.length;
            }
            else {
                guia = this.contador * this.audio.getTiempo() / this.letras.length;
            }
            this.audio.playEn(guia);
            console.log("play");
        }
    };
    Texto.prototype.iniciar = function (inicio) {
        if (this.activo == false) {
            this.activo = true;
            if (inicio != null) {
                if (inicio) {
                    this.tiempoIniciado = true;
                    this.tiempo.iniciar();
                }
                else {
                }
            }
            else {
                this.tiempoIniciado = true;
                this.tiempo.iniciar();
            }
        }
        if (inicio != null) {
            if (inicio) {
                this.letras[this.contador].iniciar();
            }
            else {
                this.letras[this.contador].iniciar(inicio);
            }
        }
        else {
            this.letras[this.contador].iniciar();
        }
    };
    Texto.prototype.iniciarTiempo = function () {
        if (this.tiempoIniciado == false) {
            this.tiempoIniciado = true;
            this.tiempo.iniciar();
        }
        if (this.contador < this.letras.length) {
            this.letras[this.contador].iniciarTiempo();
        }
    };
    Texto.prototype.detener = function () {
        this.tiempo.detener();
        if (this.final != null) {
            this.final();
        }
    };
    Texto.prototype.ocultar = function () {
        this.letras.forEach(function (l) {
            l.ocultar();
        });
    };
    Texto.prototype.setFinal = function (final) {
        this.final = final;
    };
    Texto.prototype.keyPressed = function (event) {
        var _this = this;
        if (this.contador < this.letras.length) {
            this.letras[this.contador].keyPressed(event, function (validado) {
                if (validado) {
                    _this.contador++;
                    if (_this.contador < _this.letras.length) {
                        _this.iniciar();
                    }
                    else {
                        _this.detener();
                    }
                }
                else {
                    _this.errores++;
                }
            });
        }
    };
    Texto.prototype.incluirEn = function (ruta) {
        var e = document.querySelector(ruta);
        e.append(this.elemento);
    };
    Texto.prototype.toString = function () {
        return [this.texto, this.tiempo.getTiempo() / 1000 + "", this.errores + ""];
    };
    Texto.prototype.toStringEspecificos = function () {
        var data = [];
        data.push(this.toString());
        this.letras.forEach(function (l) {
            data.push(l.toString());
        });
        return data;
    };
    return Texto;
}());
function inicioDelTiempo() {
}
var TextoMultiple = /** @class */ (function () {
    function TextoMultiple(textos, urls) {
        var _this = this;
        this.inicial = true;
        this.actual = 0;
        this.textos = new Array();
        this.activado = false;
        if (textos != null) {
            textos.forEach(function (t, index) {
                if (urls != null) {
                    _this.textos.push(new Texto(t, urls[index]));
                }
                else {
                    _this.textos.push(new Texto(t));
                }
            });
        }
        this.elemento = document.createElement("div");
        this.elemento.className = "texto__multiple";
        if (urls != null) {
            this.btn_play = document.createElement("div");
            this.btn_play.className = "boton__play";
            this.elemento.append(this.btn_play);
            this.btn_play.addEventListener("click", function () {
                _this.elementoActual().play(4);
            });
        }
        this.emojiBien = emojiBien;
        this.sonidoBien = sonidoBien;
    }
    TextoMultiple.prototype.agregarMultiple = function (textos, urls) {
        var _this = this;
        if (textos != null) {
            textos.forEach(function (t, index) {
                if (urls != null) {
                    _this.textos.push(new Texto(t, urls[index]));
                }
                else {
                    _this.textos.push(new Texto(t));
                }
            });
        }
        if (urls != null) {
            this.btn_play = document.createElement("div");
            this.btn_play.className = "boton__play";
            this.elemento.append(this.btn_play);
            this.btn_play.addEventListener("click", function () {
                _this.elementoActual().play(4);
            });
        }
    };
    TextoMultiple.prototype.agregarSonido = function (urls) {
        var _this = this;
        if (urls != null) {
            this.textos.forEach(function (t, index) {
                t.agregarSonido(urls[index]);
            });
            this.btn_play = document.createElement("div");
            this.btn_play.className = "boton__play";
            this.elemento.append(this.btn_play);
            this.btn_play.addEventListener("click", function () {
                _this.elementoActual().play(4);
            });
        }
    };
    TextoMultiple.prototype.play = function () {
        this.elementoActual().play();
    };
    TextoMultiple.prototype.iniciar = function (inicio) {
        this.activado = true;
        var elemento = this.elementoActual();
        if (inicio != null) {
            this.inicial = inicio;
        }
        if (this.inicial == false) {
            document.addEventListener("keydown", this.inicioAplicacion.bind(this));
        }
        this.continuar(elemento);
    };
    TextoMultiple.prototype.inicioAplicacion = function () {
        this.iniciarTiempo();
        document.removeEventListener("keydown", this.inicioAplicacion);
    };
    TextoMultiple.prototype.iniciarTiempo = function () {
        var elemento = this.elementoActual();
        elemento.iniciarTiempo();
    };
    TextoMultiple.prototype.ocultar = function () {
        this.textos.forEach(function (t) {
            t.ocultar();
        });
    };
    TextoMultiple.prototype.continuar = function (elemento) {
        var _this = this;
        this.elemento.append(elemento.elemento);
        elemento.iniciar(this.inicial);
        elemento.setFinal(function () {
            _this.emojiBien.iniciar();
            _this.sonidoBien.play();
            _this.emojiBien.incrustarEn(_this.elemento);
            _this.emojiBien.setFinal(function () {
                _this.sonidoBien.stop();
                _this.emojiBien.detener();
                _this.siguiente();
            });
        });
    };
    TextoMultiple.prototype.siguiente = function () {
        if (this.actual < this.textos.length) {
            var elemento = this.elementoActual();
            this.elemento.removeChild(elemento.elemento);
            this.actual++;
            if (this.actual < this.textos.length) {
                elemento = this.elementoActual();
                this.play();
                this.continuar(elemento);
            }
            else {
                this.detener();
            }
        }
    };
    TextoMultiple.prototype.elementoActual = function () {
        return this.textos[this.actual];
    };
    TextoMultiple.prototype.detener = function () {
        if (this.final != null) {
            this.final(this);
        }
    };
    TextoMultiple.prototype.toString = function () {
        var datosG = [];
        this.textos.forEach(function (t) {
            datosG.push(t.toString());
        });
        return datosG;
    };
    TextoMultiple.prototype.toStringEspecificos = function () {
        var datosE = [];
        this.textos.forEach(function (t) {
            datosE.push(t.toStringEspecificos());
        });
        return datosE;
    };
    TextoMultiple.prototype.setFinal = function (final) {
        this.final = final;
    };
    TextoMultiple.prototype.incluirEn = function (ruta) {
        var e = document.querySelector(ruta);
        e.append(this.elemento);
    };
    TextoMultiple.prototype.keyPressed = function (event) {
        if (this.activado) {
            if (this.actual < this.textos.length) {
                var elemento = this.elementoActual();
                elemento.keyPressed(event);
            }
        }
    };
    return TextoMultiple;
}());
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
