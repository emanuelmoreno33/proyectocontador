let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let polizaSchema = new Schema({
    id:String,
    empresa:String,
    descripcion:String,
    fecha:{type:Date,default:Date.now},
    facturas:[{
        idfactura:String,
        fecha:{type:Date,default:Date.now},
        concepto:String,
        cuentas:[{
            nocuenta:Number,
            subcuenta:Number,
            nombre:String,
            tipo:String,
            parcial:Number,
            debe:Number,
            haber:Number
        }]
    }]
}, { versionKey: false });

let Poliza = mongoose.model('Polizas',polizaSchema);

module.exports = Poliza;