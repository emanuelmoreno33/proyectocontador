let express = require('express');
let router = express.Router();

let mongoose = require('./../config/conexion');
let Persona = require('./../models/poliza');

router.post('/poliza/operar', (req, res, next) => {
  console.log(req.body);  

  if (req.body._id === "") {
    let per = new Persona({
      id: req.body.id,
      empresa: req.body.empresa,
      descripcion: req.body.descripcion
    });
    
    per.save();
  } else {    
    //console.log(req.body._id);
    Persona.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
      if (err) throw err;
    });
  }
  res.redirect('/');
});

module.exports = router;
