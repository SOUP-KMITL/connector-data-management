'use strict';

var mongojs = require('../db')

var request = require("request");

var url = require('url');

var Data = require('./DataService');

var db = mongojs.db
var collectionName = db.collection("user")

module.exports.trackData = function trackData (req, res, next) {
  let user = req.swagger.params.user.value
  let pass = req.swagger.params.password.value
  let collectionId = req.swagger.params.collectionId.value
  let data = req.swagger.params.data.value
  
  

  // Require ticket of the user of the connector to post data
  const getTicket = () => {
    let ticket = undefined
    return new Promise((resolve, reject) => {
      db.user.find({ user: user }, { _id: 0, ticket: 1 }).toArray(function (err, docs) {
        if (docs[0] != undefined) {
          ticket = docs[0]['ticket']
          resolve(ticket)
        }
        resolve(ticket)        
      })  
    })
  }

  
  let response = ""
  getTicket().then((ticket) => {

    if (ticket == undefined) {
      const genTicket = () => {
        return new Promise2((resolve2, reject2) => {
          ticket = generateAndStoreTicket(user, pass, collectionId)
          resolve2(ticket)
        })
      }
      genTicket().then((ticket) => {
        response = postData(collectionId, ticket, data, res)
      })
    }
    else {
      response = postData(collectionId, ticket, data, res)
    }

  })
};

function generateAndStoreToken(user, pass){
  console.log("generate token")
  var options = {
    method: 'PUT',
    url: 'https://api.smartcity.kmitl.io/api/v1/users/' + user +'/token/',
    auth: {
      user: user,
      password: pass
    }
  };

  let token = ""
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    if (response.statusCode == 200) {
      token = body
      db.user.insert({ user: user, token: token })
      return token
    }
  });
}

function generateAndStoreTicket(user, pass, collectionId){
  console.log("generate ticket")
  let token = undefined

  //query token
  const getToken = () => {  
    return new Promise((resolve, reject) => {
      db.user.find({ user: user},{_id:0, token:1}).toArray(function (err, docs) {
        if (docs[0] != undefined) {
          token = docs[0]['token']
          resolve(token)
        }
        resolve(token)        
      })  
    })
  }

  var options = {
    method: 'POST',
    url: 'https://api.smartcity.kmitl.io/api/v1/tickets/',
    headers:
      {
        'Content-Type': 'application/json',
        Authorization: token
      },
    body: { collectionId: collectionId },
    json: true
  };

  getToken().then((token) => {
    let ticket = ""
    console.log("token: " + token)
    if (token == undefined) {
      const genToken = () => {
        return new Promise((resolve, reject) => {
          token = generateAndStoreToken(user, pass)
          resolve(token)
        })
      }
      genToken().then((token) => {
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
          ticket = body
          db.user.update({ user: user, ticket: ticket })
          return ticket
        });
      })
    }
    else {
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        ticket = body
        db.user.update({ user: user, ticket: ticket })
        return ticket
      });
    }
    
  })
}

function postData(collectionId, ticket, data, res){
  var options = { method: 'POST',
    url: 'https://api.smartcity.kmitl.io/api/v1/collections/' + collectionId,
    headers: 
      { 'Content-Type': 'application/json',
        'Authorization': ticket },
    body: data,
    json: true 
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log('statusCode: ', response && response.statusCode)
    console.log('body: ', body);
    res.send({
      'statusCode': response.statusCode,
      'body': body
    })
    res.end()
  });
}