var mongojs = require('mongojs')

let databaseUrl = 'mongo:27017/userConnectorManagement'
let collections = ['user']

exports.db = mongojs(databaseUrl, collections)

