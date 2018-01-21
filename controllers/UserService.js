'use strict';

exports.createUser = function(args, res, next) {
  /**
   * Create user
   * This can only be done by the logged in user.
   *
   * body User Created user object
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteUser = function(args, res, next) {
  /**
   * Delete user
   * This can only be done by the logged in user.
   *
   * username String The name that needs to be deleted
   * no response value expected for this operation
   **/
  res.end();
}

exports.getUserByName = function(args, res, next) {
  /**
   * Get user by user name
   * 
   *
   * username String The name that needs to be fetched. Use user1 for testing. 
   * returns User
   **/
  var examples = {};
  examples['application/json'] = {
  "password" : "aeiou",
  "userStatus" : 6,
  "connectorName" : "aeiou",
  "id" : 0,
  "username" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateUser = function(args, res, next) {
  /**
   * Updated user
   * This can only be done by the logged in user.
   *
   * username String name that need to be updated
   * body User Updated user object
   * no response value expected for this operation
   **/
  res.end();
}

