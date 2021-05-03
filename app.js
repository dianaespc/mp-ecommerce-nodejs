var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

var port = process.env.PORT || 3000
const PaymentController = require("./controllers/PaymentController");
 //importamos el controller

const PaymentService = require("./services/PaymentService"); 
//importamos el service

const PaymentInstance = new PaymentController(new PaymentService()); 
// Permitimos que el controller pueda usar el service
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/error', function (req, res) {
  res.render('error');
});

app.get('/pending', function (req, res) {
  res.render('pending');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.get('/success', function (req, res) {
  res.render('success', req.query); 
});

app.post("/payment/new", (req, res) => 
  PaymentInstance.getMercadoPagoLink(req, res) 
);

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));


app.listen(port);