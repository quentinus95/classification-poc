const collections = require('../model/collections')

exports.resolvers = {
  Query: {
    collections: async () => await collections.findAll()
  }
}
