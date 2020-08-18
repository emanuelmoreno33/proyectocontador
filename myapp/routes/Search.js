var express = require('express');
var router = express.Router();

var mongoose = require('./../config/conexion');
var Poliza = require('./../models/poliza');

router.get('/escribir/:tipo', function(req, res, next) {
    let tipo = req.params.tipo;   
      res.render('Search', {titulo: 'Busqueda - Dato a buscar', tipo:tipo });
    });

router.get('/fecha/:tipo', function(req, res, next) {
        let tipo = req.params.tipo;   
          res.render('Search3', {titulo: 'Busqueda - Dato a buscar', tipo:tipo });
        });

router.get('/seleccionar/:tipo', function(req, res, next) {
    let tipo = req.params.tipo;   
        res.render('Search2', {titulo: 'Busqueda - Dato a buscar', tipo:tipo });
    });

router.get('/agrupar/:tipo', function(req, res, next) {
    let tipo = req.params.tipo;   
    switch(tipo){
        case "empresapoliza":
            Poliza.aggregate([{ "$group": {"_id": "$empresa","id": { "$first": "$empresa" },"conteo": { "$sum": 1 },"totalvalor": { "$sum": "$value" }}}],(err,polizas)=> {
                if(err)throw err;
              res.render('conteo', { titulo: 'Busqueda',polizas: polizas,tabla:'Empresas'  });
            });
        break;
        case "aniopoliza":
            Poliza.aggregate([{ "$group": { "_id": { $year: "$fecha"},"conteo": { "$sum": 1 } } }],(err,polizas)=> {
                if(err)throw err;
              res.render('conteo2', { titulo: 'Busqueda',polizas: polizas,tabla:'Año'  });
            });
        break;
        case "conceptofactura":
            Poliza.aggregate([ { $unwind: "$facturas" }, { $group: { "_id": "$facturas.concepto", "conteo": { $sum: 1} } } ],(err,polizas)=> {
                if(err)throw err;
              res.render('conteo2', { titulo: 'Busqueda',polizas: polizas,tabla:'Concepto'  });
            });
        break;
        case "registroscuenta":
            Poliza.aggregate([{ $unwind: "$facturas" },{$unwind:"$facturas.cuentas"}, { $group: { "_id": "$facturas.cuentas.tipo", "conteo": { $sum: 1} } } ],(err,polizas)=> {
                if(err)throw err;
              res.render('conteo2', { titulo: 'Busqueda',polizas: polizas,tabla:'Tipo de cuenta'  });
            });
        break;
        case "nombrecuenta":
            Poliza.aggregate([{ $unwind:"$facturas" },{$unwind:"$facturas.cuentas"},{ $group:{ "_id":"$facturas.cuentas.nombre","conteo":{ $sum:1}}}],(err,polizas)=> {
                if(err)throw err;
              res.render('conteo2', { titulo: 'Busqueda',polizas: polizas,tabla:'Nombre'  });
            });
        break;
        case "numcuenta":
            Poliza.aggregate([{ $unwind: "$facturas" },{$unwind:"$facturas.cuentas"},{ $group:{ "_id":"$facturas.cuentas.nocuenta","conteo":{ $sum: 1}}}],(err,polizas)=> {
                if(err)throw err;
              res.render('conteo2', { titulo: 'Busqueda',polizas: polizas,tabla:'Número de cuenta'  });
            });
        break;
    }
    });

router.post('/mostrar', function(req, res, next) {
    var elem = req.body.elem;
    var tipo = req.body.tipo;   
    switch(tipo){
        case "idpoliza":
            Poliza.find({id:elem},(err,polizas)=> {
                if(err)throw err;
              res.render('polizaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "empresapoliza":
            Poliza.find({empresa:elem},(err,polizas)=> {
                if(err)throw err;
              res.render('polizaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "descrippoliza":
            Poliza.find({descripcion:elem},(err,polizas)=> {
                if(err)throw err;
              res.render('polizaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "fechapoliza":
          console.log(elem)
            Poliza.find({fecha:{'$gte':new Date(elem).toISOString()}},(err,polizas)=> {
                if(err)throw err;
                
              res.render('polizaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "idfactura":
            Poliza.aggregate([{ $match: {'facturas.idfactura': elem}},{$project: {list: {$filter: {input: '$facturas',as: 'item',cond: {$eq: ['$$item.idfactura', elem]}}}}}],(err,polizas)=> {
                if(err)throw err;
                console.log(polizas);
              res.render('facturaSearch', { titulo: 'Busqueda',polizas: polizas,valor:elem  });
            });
        break;
        case "fechafactura":
            Poliza.find({ "facturas.fecha": new Date(elem).toISOString()},{facturas: {$elemMatch: {fecha:new Date(elem).toISOString()}}},(err,polizas)=> {
                if(err)throw err;
                console.log(polizas);
              res.render('facturaSearch2', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "concepto":
             Poliza.aggregate([{ $match: {'facturas.concepto': elem}},{$project: {list: {$filter: {input: '$facturas',as: 'item',cond: {$eq: ['$$item.concepto', elem]}}}}}],(err,polizas)=> {
                if(err)throw err;
                console.log(polizas);
              res.render('facturaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "nocuenta":
            Poliza.find({"facturas.cuentas.nocuenta":elem},{cuentas:{$elemMatch: {'nocuenta':elem}}},(err,polizas)=> {
                if(err)throw err;
              res.render('cuentaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "subcuenta":
            Poliza.find({"facturas.cuentas.subcuenta":elem},{cuentas:{$elemMatch: {'subcuenta':elem}}},(err,polizas)=> {
                if(err)throw err;
              res.render('cuentaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "nombrecuenta":
            Poliza.find({"facturas.cuentas.nombre":elem},{cuentas:{$elemMatch: {'nombre':elem}}},(err,polizas)=> {
                if(err)throw err;
              res.render('cuentaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        case "tipocuenta":
            Poliza.find({"facturas.cuentas.tipo":elem},{cuentas:{$elemMatch: {'tipo':elem}}},(err,polizas)=> {
                if(err)throw err;
              res.render('cuentaSearch', { titulo: 'Busqueda',polizas: polizas  });
            });
        break;
        default:
        break;
    }
    });


module.exports = router;