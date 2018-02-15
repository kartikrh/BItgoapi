'use strict';

var express = require('express'),
	app = express(),
	
    bodyParser = require('body-parser'),
	http = require('http'),
    cors = require('cors'),
    
    cookieParser = require('cookie-parser');

app.use(cors());

app.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.header('access-control-allow-origin', origin);
    res.header("access-control-allow-credentials", "true");
    res.header("access-control-allow-headers", "x-requested-with");
    res.header("access-control-allow-headers", "origin, x-requested-with, content-type, accept,application/x-www-form-urlencoded,application/json,multipart/form-data");
    res.header("access-control-allow-headers", "true");
    next();
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json,application/x-www-form-urlencoded');
    res.send(JSON.stringify({ Server: "A" }));
});

var server = app.listen(8664);
var router = express.Router();

app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));// configure app to use bodyParser() this will let us get the data from a POST
app.use(bodyParser.json({ limit: '100mb' }));

app.use(function (req, res, next) {
    var _send = res.send;
    var sent = false;
    res.send = function (data) {
        if (sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});



app.use(express.static(__dirname));
app.use(require('./routes/accountRoute'));






