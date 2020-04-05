var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const URI = "mongodb+srv://dbUser:charles01160@cluster0-16lsq.gcp.mongodb.net/test?retryWrites=true&w=majority"
var v1 = require('./v1.0/v1.0.js');

var router_user = require('./router/router_user.js');
var router_product = require('./router/router_product.js');
var router_order = require('./router/router_order');



// Connection BDD

mongoose.Promise = Promise;
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, "error:"));
db.once('open', () => {
    console.log('connected to mondodb');
})

/* Localhost Connection
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/madb', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, "error:"));
db.once('open', () => {
    console.log('connected to mondodb');
})
*/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
    next()
});


app.use('/v1/users', router_user);
app.use('/v1/products', router_product);
app.use('/v1/orders', router_order);

//app.use('/v1', v1);

app.get('/',function(req,res){
    res.json({status: 'ok'})
});

app.io = io;

var port = 8080;
var hostname= 'localhost';


server.listen(port, function(){
    console.log("Server is running");
})

/*
app.listen(port, hostname, function(){
    console.log("Server run "+ hostname +" port : "+ port);
});
*/

module.exports = app;