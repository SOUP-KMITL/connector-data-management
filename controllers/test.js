// var assert = require('assert')


// var mongojs = require('mongojs')
// var db = mongojs('127.0.0.1/Environment', ['test2'])

// let a = []

// db.test2.find({id:"59901100274e245347b23d3"}).limit(1).toArray(function(err,docs){
//         a = docs
// })

// setTimeout(function(){
//         console.log(a)
//         process.exit()
// },2000)

// console.log(equal("",undefined))


//db.test2.find({id:"59b901100274e245347b23d3"})
// const fn1 = () => {
//     setTimeout(() => {
//       console.log('fn1')
//     }, 1)
//     console.log('f3')
//   }
  
//   const fn2 = () => {
//     fn1()
//     setTimeout(() => {
//       console.log('fn2')
//     }, 1000)
//     console.log('f4')
//   }
  
//   const fn3 = () => {
//     fn2()
//   }
  
//   fn3()

// var mongojs = require('../db')
// var db = mongojs.db
// var collectionName = db.collection("user")
// db.user.find().toArray(function(err,docs){
//     console.log(docs)
// })

// var request = require('request')
// var user = "apicekmitl"
// var pass = "ApiCeKmitl#123"

// var options = {
//     method: 'PUT',
//     url: 'https://api.smartcity.kmitl.io/api/v1/users/' + user + '/token/',
//     auth: {
//         user: user,
//         password: pass
//     }
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);
//     console.log(body);
//     console.log(response.statusCode)
// });

// var request = require('request')
// function parse(){
//     return new Promise(function (resolve, reject) {
//         var options = {
//             method: 'GET',
//             url: 'https://api.smartcity.kmitl.io/api/v1/users/apicekmitl/token',
//             headers:
//                 {
//                     'Authorization': 'Basic YXBpY2VrbWl0bDpBcGlDZUttaXRsIzEyMw=='
//                 }
//         };

//         request(options, function (error, response, body) {
//             // in addition to parsing the value, deal with possible errors
//             if (error) return reject(error);
//             try {
//                 // JSON.parse() can throw an exception if not valid JSON
//                 console.log('body: ' + body)
//                 resolve(body);
//             } catch (e) {
//                 reject(e);
//             }
//         });
//     });
// }

// parse().then(function(val) {
//     console.log(val);
// }).catch(function(err) {
//     console.log(err);
// });
// var mongojs = require('../db')
// var db = mongojs.db
// var request = require('request')
// var user= "apicekmitl-"
// db.user.find({ user: user},{_id:0, token:1}).toArray(function (err, docs) {
//                 if(err) console.log(err)
//                 console.log(docs[0])
//                 if (docs[0] != undefined) {
//                   token = docs[0]['token']
//                   console.log(docs)
//                 }
//             })

// abc().then((token) => {
//     console.log("ticket :" + token)
// })

// function abc() {
//     const getToken = () => {  
//         return new Promise((resolve, reject) => {
//           db.user.find({ user: user},{_id:0, token:1}).toArray(function (err, docs) {
//             if (docs[0] != undefined) {
//               token = docs[0]['token']
//               resolve(token)
//             }
//             resolve(token)        
//           })  
//         })
//       }

//     var user = 'apicekmitl'
//     var pass = "ApiCeKmitl#123"

//     var options = {
//         method: 'PUT',
//         url: 'https://api.smartcity.kmitl.io/api/v1/users/' + user + '/token/',
//         auth: {
//             user: user,
//             password: pass
//         }
//     };

//     return new Promise((resolve, reject) => {
//         request(options, function (error, response, body) {
//             // in addition to parsing the value, deal with possible errors
//             if (error) throw new Error(error);
//             try {
//                 // JSON.parse() can throw an exception if not valid JSON
//                 console.log('body: ' + body)
//                 resolve(body)
//                 db.user.update({ user: user }, { $set:{token: body} })
//                 // (body);
//             } catch (e) {
//                 console.log('e: ' + e);
//             }
//         })
//     });
// }

// var abc = require('./Data')
// function callback(){

// }

// abc.abc("apicekmitl","ApiCeKmitl#123",callback).then((token)=>{
//     console.log(token)
// })


