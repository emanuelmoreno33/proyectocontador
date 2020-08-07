let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/prueba',{useNewUrlParser:true,useUnifiedTopology: true});

module.exports = mongoose;