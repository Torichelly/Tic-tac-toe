'use strict';

var fs = require("fs");
var index = fs.readFileSync('./static/index.html');
var express = require('express');
var app = express();

app.use((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.end(index);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
