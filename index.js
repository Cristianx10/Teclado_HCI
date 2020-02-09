var express = require("express");

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function(request, response) {
  response.sendfile( __dirname + "/index.html");
});

app.get("/excel", function(request, response) {
  response.sendfile( __dirname + "/public/excel.html");
});

app.listen(process.env.PORT || 3000);

//app.listen(3000, function() {  console.log("Escuchando en el puesto 3000");});

