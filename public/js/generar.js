

window.addEventListener("load", function () {


  var investigador = this.document.querySelector("#nombre__investigador");

  function convertirToString(resultado) {
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

  let resultados;
  var wb = new Excel();

  let titulo = "Teclado HCI";
  let asunto = (Subject = "HCI");
  let autor = (Author = "Test_HCI");
  let fecha = new Date();

  wb.autor(titulo, asunto, autor, fecha);

  //Nombre de hoja
  wb.crearHoja("generales");
  wb.crearHoja("especificas");

  var ws_general = [];
  var ws_especifico = [];

  let tester = "";
  let seccion = 0;
  let edad = "";
  let genero = "";
  let ocupacion = "";
  let mano = "";
  let nombre = "nombre";
  let nivel = "";

  let esGeneral = false;

  ws_general.push([
    "Usuario",
    "Seccion",
    "Genero",
    "Semestre",
    "Preferencia Mano",
    "Ocupacion",
    "Nivel",
    "Estimulo",
    "Tiempo",
    "Error",
    "Estudiante"
  ]);

  ws_especifico.push([
    "Usuario",
    "Seccion",
    "Genero",
    "Semestre",
    "Preferencia Mano",
    "Ocupacion",
    "Nivel",
    "Estimulo",
    "Tiempo",
    "Error",
    "Posicion",
    "Registro Error",
    "Estudiante"
  ]);

  function crearArchivo(datos) {
    // result = convertirToString(datos);



    datos.forEach((result, index) => {
      let info = result.split("	");

      if (index == 0 && info[1].includes("general")) {
        esGeneral = true;
        contadorDeArchivos__general++;
        contArchivosCargadosG.innerHTML = contadorDeArchivos__general;
      } else if (index == 0) {
        esGeneral = false;
        contadorDeArchivos__especificos++;
        contArchivosCargadosE.innerHTML = contadorDeArchivos__especificos;
      }

      if (esGeneral) {
        evaluacionGeneral(info, index, datos);
      } else {
        evaluacionEspecifico(info, index, datos);
      }
    });
  }

  function imprimir() {
    wb.cargarMatrix("generales", ws_general);
    wb.cargarMatrix("especificas", ws_especifico);

    let f = new Date();
    let dia = `${f.getDay()}-${f.getMonth()}-${f.getFullYear()}`;
    wb.guardar("restul_teclado__" + dia + ".xlsx");
  }

  function evaluacionGeneral(info, index, datos) {
    if (info.length == 2) {
      if (info[0].includes("seccion")) {
        seccion = info[1];
      } else if (info[0].includes("nombre")) {
        tester = info[1];
      } else if (info[0].includes("edad")) {
        edad = info[1];
      } else if (info[0].includes("genero")) {
        genero = info[1];
      } else if (info[0].includes("ocupacion")) {
        ocupacion = info[1];
      } else if (info[0].includes("mano")) {
        mano = info[1];
      }
    } else if (info.length >= 3) {

      if (info.length == 3) {

        if (info[0].length == 1) {
          nivel = "1";
        } else if (info[0].length > 1) {
          let dataInfo = info[0].split(" ");

          if (dataInfo.length == 1) {
            nivel = "2";
          } else if (dataInfo.length > 1) {
            if (index < datos.length - 2) {
              nivel = "3";
            } else {
              nivel = "4";
            }
          }
        }

        ws_general.push([
          tester,
          seccion,
          genero,
          edad,
          mano,
          ocupacion,
          nivel,
          info[0],
          info[1],
          info[2],
          nombre
        ]);

      } else {

        nivel = info[0];

        ws_general.push([
          tester,
          seccion,
          genero,
          edad,
          mano,
          ocupacion,
          nivel,
          info[1],
          info[2],
          info[3],
          nombre
        ]);

      }



    }
  }

  var analizadoActual = null;
  var contEspecifico = 0;

  function evaluacionEspecifico(info, index, datos) {

    if (info.length == 2) {
      if (info[0].includes("seccion")) {
        seccion = info[1];
      } else if (info[0].includes("nombre")) {
        tester = info[1];
      } else if (info[0].includes("edad")) {
        edad = info[1];
      } else if (info[0].includes("genero")) {
        genero = info[1];
      } else if (info[0].includes("ocupacion")) {
        ocupacion = info[1];
      } else if (info[0].includes("mano")) {
        mano = info[1];
      }
    } else if (info.length >= 3) {
   
      if (info.length == 3) {

        analizadoActual = info[0];

        if (analizadoActual.length == 1) {
          nivel = "1";
        } else if (analizadoActual.length > 1) {
          let dataInfo = analizadoActual.split(" ");

          if (dataInfo.length == 1) {
            nivel = "2";
          } else if (dataInfo.length > 1) {

            contEspecifico++;

            if (contEspecifico > 6) {
              contEspecifico = 0;
            }

            if (contEspecifico <= 4) {
              nivel = "3";
            } else if (contEspecifico <= 6) {
              nivel = "4";
            }
          }
        }

      } else {
        nivel = info[0];

      }

    }
    if (info.length == 5) {
   
      ws_especifico.push([
        tester,
        seccion,
        genero,
        edad,
        mano,
        ocupacion,
        nivel,
        info[0],
        info[1],
        info[2],
        info[3],
        info[4],
        nombre
      ]);
    } else if (info.length >= 6) {

      ws_especifico.push([
        tester,
        seccion,
        genero,
        edad,
        mano,
        ocupacion,
        nivel,
        info[1],
        info[2],
        info[3],
        info[4],
        info[5],
        nombre
      ]);
    } else {
      console.log(info.length)
    }

  }

  var contadorDeArchivos__general = 0;

  var contadorDeArchivos__especificos = 0;

  function leerArchivo(e) {
    var archivos = e.target.files;

    nombre = investigador.value;
    investigador.value = "";

    for (let i = 0; i < archivos.length; i++) {
      let archivo = archivos[i];

      if (!archivo) {
        return;
      }

      let lector = new FileReader();
      lector.readAsText(archivo);

      lector.onload = function (e) {
        let contenido = e.target.result;
        let datos = convertirToString(contenido);

        crearArchivo(datos);

      };
    }


  }

  var cargarDocs = document.getElementById("file-input");

  cargarDocs.addEventListener("change", leerArchivo, false);

  var guardarExcel = document.querySelector("#btn__crearExcel");

  guardarExcel.addEventListener("click", imprimir);

  var contArchivosCargadosG = document.querySelector(".archivosCargados__generales");

  var contArchivosCargadosE = document.querySelector(".archivosCargados__especificos");

});
