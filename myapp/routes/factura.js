var express = require('express');
var router = express.Router();

var mongoose = require('./../config/conexion');
var Poliza = require('./../models/poliza');


/* GET home page. */
router.get('/:id', function(req, res, next) {
    let idpoliza = req.params.id;  
    Poliza.findOne({_id: idpoliza }, (err, poliza) => {
      if (err) throw err;
      res.render('factura', { factura: poliza });
    });
  });

router.get('/factura/nuevo/:id', (req, res, next) => {
  res.render('facturaForm', {});
});

router.get('/factura/modificar/:id', (req, res, next) => {
  let idpoliza = req.params.id;  
  Poliza.findOne({_id: idpoliza }, (err, poliza) => {
    if (err) throw err;
    res.render('FacturaForm', { poliza: poliza });
  });
});


router.get('/factura/eliminar/:id', (req, res, next) => {
  let idpoliza = req.params.id; 
  Poliza.remove({_id: idpoliza }, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
