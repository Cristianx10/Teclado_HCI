"use strict";
var Excel = /** @class */ (function () {
    function Excel() {
        this.excel = XLSX.utils.book_new();
    }
    Excel.prototype.autor = function (titulo, sujeto, autor, fecha) {
        this.excel.Props = {
            Title: titulo,
            Subject: sujeto,
            Author: autor,
            CreatedDate: fecha
        };
    };
    Excel.prototype.crearHoja = function (nombre) {
        this.excel.SheetNames.push(nombre);
    };
    Excel.prototype.cargarMatrix = function (nombre, valores) {
        var ws = XLSX.utils.aoa_to_sheet(valores);
        this.excel.Sheets[nombre] = ws;
    };
    Excel.prototype.guardar = function (titulo) {
        var wbout = XLSX.write(this.excel, { bookType: 'xlsx', type: 'binary' });
        var buf = new ArrayBuffer(wbout.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < wbout.length; i++)
            view[i] = wbout.charCodeAt(i) & 0xFF;
        //Guardar Archivo
        saveAs(new Blob([buf], { type: "application/octet-stream" }), titulo);
    };
    return Excel;
}());
