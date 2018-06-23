const collections = require('../model/collections')
const users = require('../model/users')

exports.resolvers = {
  Query: {
    collections: async () => await collections.findAll(),
    collection: async (_, { name }) => await collections.findOneByName(name),
    users: async () => await users.findAll()
  }
}
