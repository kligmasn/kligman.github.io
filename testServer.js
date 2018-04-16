var express = require('express');
var app = express();
const fs = require('fs');
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('index.html', {"root": __dirname + "/TorusScape"});
});

app.use(express.static('TorusScape'));
app.listen(3000);