var express = require('express');
var router = express.Router();

var mongoose = require('./../config/conexion');
var Poliza = require('./../models/poliza');


/* GET home page. */
router.get('/:id', function(req, res, next) {
     let idpoliza = req.params.id;  
     Poliza.find({"facturas._id":idpoliza},{facturas: {$elemMatch: {_id:idpoliza}}}, (err, poliza) => {
       if (err) throw err;
        console.log(poliza);  
    res.render('cuenta', { poliza: poliza,idpoliza:idpoliza,titulo: 'Cuenta' });
  });
});

router.get('/nuevo/:id', (req, res, next) => {
  let idpoliza = req.params.id;  
  res.render('cuentaForm', {idpoliza: idpoliza,titulo: 'Cuenta - Nuevo'});
});

module.exports = router;
