var express = require('express');
var Ctrl = require('../controllers/accountCtrl.js');

var app = module.exports = express.Router();
app.route('/api/account/login').get(Ctrl.login);

