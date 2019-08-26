"use strict";
/**
 *
 *  <input type="file" id="files" name="files[]" multiple />
    <script>
        var files = document.querySelector("#files");

        files.addEventListener("change", function (a) {
            console.log(a.target.files.length)

            for (let i = 0; i < a.target.files.length; i++) {
                let promesa = a.target.files[i].text();
                promesa.then(function (s, n) {
                    console.log("Contenido", s);
                })
            }
        });
    </script>
    
 */
/*
function normalizar(elemento:any, opciona?:any, opcionb?:any) {
    if (opciona) {
        opciona.addEventListener("click", () => {
            elemento.innerHTML = "";
        });
        if (opcionb) {
            opcionb.addEventListener("click", () => {
                elemento.innerHTML = "";
            });
        }


    } else {
        elemento.addEventListener("keydown", () => {
            elemento.setCustomValidity("");
        });
    }
}*/ 
