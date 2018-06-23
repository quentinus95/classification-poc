const collections = require('../model/collections')
const users = require('../model/users')

exports.resolvers = {
  Query: {
    collections: async () => await collections.findAll(),
    users: async () => await users.findAll()
  }
}
