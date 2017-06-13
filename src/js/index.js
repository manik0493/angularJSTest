var express = require('express');
var path = require('path');
var app = express();

app.get('/', function(req, res){
   res.send(path.dirname(require.main.filename));
});

app.listen(3000);
