const express = require("express");

// create and config server
const app = express();

// init express aplication
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está arrancado: http://localhost:${port}`);
});
