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
      res.render('factura', { poliza: poliza,idpoliza:idpoliza,titulo: 'Factura' });
    });
  });

  
router.get('/nuevo/:id', (req, res, next) => {
  let idpoliza = req.params.id;  
  res.render('facturaForm', {idpoliza: idpoliza,titulo: 'Factura - Nuevo'});
});

module.exports = router;
