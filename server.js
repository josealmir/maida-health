const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/maida-health' ));

app.get('/*',(req, res) => {
    res.sendFile(__dirname + __dirname + '/dist/maida-health/index.html');
});

app.listen(PORT,()=>{
    console.log('Servidor iniciado na porta: '+ PORT);
});

