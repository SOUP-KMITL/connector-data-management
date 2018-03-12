'use strict';

var mongojs = require('../db')

var request = require("request");

var url = require('url');

var Data = require('./DataService');

var db = mongojs.db

module.exports.trackData = function trackData(req, res, next) {
  let user = req.swagger.params.user.value
  let apiKey = req.swagger.params.Authorization.value
  let collectionId = req.swagger.params.collectionId.value
  let data = req.swagger.params.data.value

  //Check user with collection is exist!! if not, then store it.
  const getUser = () => {
    let tempUser = undefined
    return new Promise((resolve, reject) => {
      db.user.find({ user: user, collectionId: collectionId }, { _id: 0, user: 1 }).toArray(function (err, docs) {
        // console.log(docs)
        if (docs[0] != undefined) {
          tempUser = docs[0]['user']
          resolve(tempUser)
        }
        else {
          getUserFromServer(user).then((user2) => {
            if (user == user2) {
              db.user.insert({ user: user, apiKey: apiKey, collectionId: collectionId })
            }
            else {
              res.send('User does not exists, Please register.')
              res.end()
            }
          })
        }
      })
    })
  }

  // Require ticket of the user of the connector to post data
  getUser().then((tempUser) => {
    // console.log(tempUser)
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
        generateAndStoreTicket(user, apiKey, collectionId, res).then((ticket) => {
          response = postData(user, collectionId, ticket, data, res)
        })
      }
      else {
        response = postData(user, collectionId, ticket, data, res)
      }
    })
  })
};

function getUserFromServer(user) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: 'https://api.smartcity.kmitl.io/api/v1/users/' + user,
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      if (body[0]['userNmae'] != undefined)
        resolve(body[0]['userName'])
      else
        resolve(undefined)
    });
  })

}

function generateAndStoreTicket(user, apiKey, collectionId, res) {
  console.log("generate ticket by " + user + " with " + collectionId)

  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: 'https://api.smartcity.kmitl.io/api/v1/tickets/',
      headers:
        {
          'Content-Type': 'application/json',
          'Authorization': apiKey.toString()
        },
      body: { collectionId: collectionId },
      json: true
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      resolve(body)
      db.user.update({ user: user }, { $set: { ticket: body } })
    });
  })
}

function postData(user, collectionId, ticket, data, res) {
  var options = {
    method: 'POST',
    url: 'https://api.smartcity.kmitl.io/api/v1/collections/' + collectionId,
    headers:
      {
        'Content-Type': 'application/json',
        'Authorization': ticket
      },
    body: data,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    if (response.statusCode == 201) {
      res.send("Success")
    }
    else if (response.statusCode == 401) {

      console.log('statusCode: ', response && response.statusCode)
      //console.log('body: ', data);
      res.send({
        'msg': 'Error has occured. can not add',
        'data': data,
        'collectionId': collectionId
      })
    }
    else {
      res.send({
        'statusCode': response.statusCode,
        'body': body
      })
    }
    res.end()
  });
}