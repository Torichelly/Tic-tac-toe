'use strict';

var express = require('express');
var app = express();

app.use(express.static('static'));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
