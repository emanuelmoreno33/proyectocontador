var express = require('express');
var router = express.Router();

var mongoose = require('./../config/conexion');
var Poliza = require('./../models/poliza');


/* GET home page. */
router.get('/:id', function(req, res, next) {
    let idpoliza = req.params.id;  
    Poliza.findOne({_id: idpoliza }, (err, poliza) => {
      if (err) throw err;
      res.render('factura', { poliza: poliza });
    });
  });

  
router.get('/nuevo/:id', (req, res, next) => {
  res.render('facturaForm', {});
});

router.get('/modificar/:id', (req, res, next) => {
  let idpoliza = req.params.id;  
  Poliza.findOne({_id: idpoliza }, (err, poliza) => {
    if (err) throw err;
    res.render('FacturaForm', { poliza: poliza });
  });
});


router.get('/eliminar/:id', (req, res, next) => {
  let idpoliza = req.params.id; 
  Poliza.remove({_id: idpoliza }, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
