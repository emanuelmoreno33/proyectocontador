let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Persona = require('./../models/poliza');

router.post('/factura/operar', (req, res, next) => {
  console.log(req.body);  

  if (req.body._id === "") {
    let per = new Persona({
      'facturas.idfactura': req.body.idfactura,
      'facturas.fecha': req.body.fecha,
      'facturas.concepto': req.body.concepto
    });
    
    per.save();
  } else {    
    Persona.findByIdAndUpdate(req.body._id, { $push: req.body }, { new: true }, (err, model) => {
      if (err) throw err;
    });
  }
  res.redirect('/');
});

module.exports = router;
