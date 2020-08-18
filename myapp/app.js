var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var polizaForm = require('./routes/polizaForm');

var factura = require('./routes/factura');
var facturaForm = require('./routes/facturaForm');

var cuenta =require('./routes/cuenta');
var cuentaForm = require('./routes/cuentaForm');

var buscar = require('./routes/Search');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/polizaForm', polizaForm);
app.use('/factura',factura);
app.use('/facturaForm',facturaForm);
app.use('/cuenta',cuenta);
app.use('/cuentaForm',cuentaForm);
app.use('/busqueda',buscar);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
