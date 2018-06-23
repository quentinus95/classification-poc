const database = require('../database')

exports.findAll = async () => {
  return database.getConnection().collection('collections').find({}).toArray()
}

exports.findOneByName = async (name) => {
  return database.getConnection().collection('collections').findOne({ name: { $eq: name } })
}
