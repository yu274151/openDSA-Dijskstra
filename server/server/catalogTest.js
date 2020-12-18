'use strict';
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const catalog = require('./catalog.js');
const connect = require('./connect.js');

let fullCatalog;

catalog.build('./modules/OpenDSA/AV/', '/AV', (err,cat) => {
    if(err) {
        fullCatalog = {};
    }
    else {
        fullCatalog = cat;
    }
});

let urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = 80;
const HOST = '0.0.0.0';

const app = express();


app.use('/lib/',express.static('./modules/OpenDSA/lib'));
app.use('/JSAV', express.static('./modules/JSAV'));
app.use('/Exercises/JSAV',express.static('./modules/JSAV'));
app.use('/Exercises/',express.static('./modules/OpenDSA/Exercises'));
app.use('/AV',express.static('./modules/OpenDSA/AV'));

app.use('/DataStructures',express.static('./modules/OpenDSA/DataStructures'));
app.use('/ODSAkhan-exercises/',express.static('./modules/OpenDSA/khan-exercises'));
app.use('/khan-exercises/',express.static('./modules/OpenDSA/khan-exercises'));
app.use(express.static('./client'));

//! Main document request
app.get('/', (req,res) => {
    fs.readFile("file://client/index.html", (err, data) => {
        if(err) {
            res.sendStatus(404);
        }
        else {
            res.send(data.toString());
        }
    });
});

app.get('/catalog', (req,res) => {
    res.send(fullCatalog);
});

app.post('/score-feedback', urlencodedParser, (req, res) => {

   let scores = {
      		score:req.body.score,
      		remainder:req.body.remainder,
      		lost: req.body.lost
  	 };
   
   
   res.send( 'You submitted the following scores: ' + JSON.stringify(scores) );
   
  connect(scores);
	 
});



app.listen(PORT, HOST, () => {
    console.log(`Running OpenDSA server on host: ${HOST} and port: ${PORT}`);
});
