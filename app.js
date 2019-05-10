'use-strict';

var express = require('express');
var pug = require('pug');

var app = express();

fs = require('fs');


port = parseInt(process.env.PORT, 10) || 8686;


app.use('/static/',express.static(__dirname + '/src/public'));

app.set('view engine','pug')

app.set('views',__dirname + '/src/templates');


app.get('/', function(req,res){
	var path = req.path;
	res.render('index');
});

app.listen(port, function(){
	console.log('server running on '+port+' !');
});
