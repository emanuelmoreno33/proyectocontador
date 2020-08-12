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
    res.render('cuenta', { poliza: poliza,idpoliza:idpoliza });
  });
});

module.exports = router;
