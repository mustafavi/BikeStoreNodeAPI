var express = require('express');
var cors = require('cors');
var categoryApi = require('./api/categoryApi');
var productApi = require('./api/productApi');
var brandApi = require('./api/brandApi');



var app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('/'));

app.use('/categories', categoryApi);
app.use('/products', productApi);
app.use('/brand', brandApi);


module.exports = app;
