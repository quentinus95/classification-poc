const collections = require('../model/collections')
const users = require('../model/users')

exports.resolvers = {
  Query: {
    collections: async () => await collections.findAll(),
    collection: async (_, { name }) => await collections.findOneByName(name),
    image: async (_, { collection, image }) => (await collections.findOneByName(collection)).images.find(i => i.name === image),
    users: async () => await users.findAll()
  }
}
