'use strict';

var url = require('url');

var User = require('./UserService');

var mongojs = require('../db')
var db = mongojs.db

module.exports.createUser = function createUser (req, res, next) {
  //User.createUser(req.swagger.params, res, next);
  let body = req.swagger.params.body.value
  db.user.insert(body)
  res.end()

};

module.exports.deleteUser = function deleteUser (req, res, next) {
  User.deleteUser(req.swagger.params, res, next);
};

module.exports.getUserByName = function getUserByName (req, res, next) {
  User.getUserByName(req.swagger.params, res, next);
};

module.exports.updateUser = function updateUser (req, res, next) {
  User.updateUser(req.swagger.params, res, next);
};
