let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Persona = require('./../models/poliza');

router.post('/factura/operar', (req, res, next) => {
  var id = req.body._id;
  let user = Persona.findById(id);
  var factura = {"idfactura" : req.body.idfactura,"fecha":req.body.fecha,"concepto": req.body.concepto};
  user.findOneAndUpdate({_id: id}, {$push: {facturas: factura}},(err,model) => {
    if(err) throw err;
  });
  console.log(user.facturas); // <= puedes verificar aquí que se ha actualizado el campo
  res.redirect('/factura/'+id);
});

module.exports = router;
