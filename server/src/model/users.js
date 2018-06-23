const database = require('../database')

exports.findAll = async () => {
  return database.getConnection().collection('users').find({}).toArray()
}
