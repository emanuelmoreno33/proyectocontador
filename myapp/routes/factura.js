var express = require('express');
var router = express.Router();

var mongoose = require('./../config/conexion');
var Poliza = require('./../models/poliza');


/* GET home page. */
router.get('/:id', function(req, res, next) {
    let idpoliza = req.params.id;  
    Poliza.findOne({_id:idpoliza }, (err, poliza) => {
      if (err) throw err;
      console.log(poliza);  
      res.render('factura', { poliza: poliza });
    });
  });

  
router.get('/nuevo/:id', (req, res, next) => {
  let idpoliza = req.params.id;  
  res.render('facturaForm', {idpoliza: idpoliza});
});


router.get('/modificar/:id', (req, res, next) => {
  let idpoliza = req.params.id;  
  Poliza.findOne({idfactura: idpoliza }, (err, poliza) => {
    if (err) throw err;
    res.render('FacturaForm', { idpoliza: idpoliza });
  });
});


router.get('/eliminar/:id', (req, res, next) => {
  let idpoliza = req.params.id; 
  Poliza.remove({_id: idpoliza }, (err) => {
    if (err) throw err;
    res.redirect('/factura');
  });
});

module.exports = router;
