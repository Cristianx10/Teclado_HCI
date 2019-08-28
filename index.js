var express = require("express");

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function(request, response) {
  response.sendfile("/index.html");
});

app.get("/excel", function(request, response) {
  response.sendfile("/excel.html");
});

app.listen(process.env.PORT || 1234);
/*
app.listen(3000, function() {
  console.log("Escuchando en el puesto 3000");
});
*/