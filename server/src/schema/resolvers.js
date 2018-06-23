const collections = require('../model/collections')
const users = require('../model/users')

exports.resolvers = {
  Query: {
    collections: async () => await collections.findAll(),
    collection: async (_, { name }) => await collections.findOneByName(name),
    image: async (_, { collection, image }) => await collections.findOneImageByName(collection, image),
    users: async () => await users.findAll()
  },
  Mutation: {
    saveImageLabel: async(_, { collection, image, author, label }) => await collections.saveImageLabel(collection, image, author, label),
    saveImageAnnotation: async(_, { collection, image, author, label, type, coordinates }) => await collections.saveImageAnnotation(collection, image, author, label, type, coordinates)
  }
}
