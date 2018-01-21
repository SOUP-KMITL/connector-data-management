var mongojs = require('mongojs')

let databaseUrl = '127.0.0.1/userConnectorManagement'
let collections = ['user']

exports.db = mongojs(databaseUrl, collections)

