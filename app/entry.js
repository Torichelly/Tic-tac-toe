'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var LTicTac = require('./l-tic-tac/l-tic-tac.jsx');

const rootCLASS = 'tic-tac';

let element = document.createElement('div');
element.className = rootCLASS;

module.exports = ReactDOM.render(
    <LTicTac/>, 
    document.body.appendChild(element)
);