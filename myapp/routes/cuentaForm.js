let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Persona = require('./../models/poliza');

router.post('/cuenta/operar', (req, res, next) => {
  var id = req.body._id;
  let user = Persona.find({"facturas._id":id},{facturas: {$elemMatch: {_id:id}}});
  var cuenta = {"nocuenta" : req.body.nocuenta,"subcuenta":req.body.subcuenta,"nombre": req.body.nombre,"tipo":req.body.tipo,"parcial":req.body.parcial,"debe":req.body.debe,"haber":req.body.haber};
  user.findOneAndUpdate({'facturas._id': id}, {'$push': {'facturas.$.cuentas': cuenta}},(err,model) => {
  });
  res.redirect('/cuenta/'+id);
});
module.exports = router;