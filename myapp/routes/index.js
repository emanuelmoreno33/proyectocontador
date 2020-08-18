var express = require('express');
var router = express.Router();

var mongoose = require('./../config/conexion');
var Poliza = require('./../models/poliza');


var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  Poliza.find((err,polizas)=> {
    if(err)throw err;
  res.render('index', { titulo: 'Poliza',polizas: polizas  });
});
});

router.get('/poliza/nuevo', (req, res, next) => {
  res.render('PolizaForm', {titulo: 'Poliza - Nuevo'});
});

router.get('/poliza/modificar/:id', (req, res, next) => {
  let idpoliza = req.params.id;  
  Poliza.findOne({_id: idpoliza }, (err, poliza) => {
    if (err) throw err;
    res.render('PolizaForm', { poliza: poliza,titulo: 'Poliza - Modificar' });
  });
});

router.get('/poliza/eliminar/:id', (req, res, next) => {
  let idpoliza = req.params.id; 
  Poliza.remove({_id: idpoliza }, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});


router.get('/informe/:id',(req,res,next)=>{
  let idpoliza = req.params.id;  
  Poliza.findOne({_id: idpoliza }, (err, poliza) => {
    if (err) throw err;
    res.render('informe', { poliza: poliza, titulo: 'Informe' });
  });
});


module.exports = router;
