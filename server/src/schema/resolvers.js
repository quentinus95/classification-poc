const query = require('./query')

exports.resolvers = {
  Query: {
    collections: async () => await query.getCollections()
  }
}
