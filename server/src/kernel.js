const fs = require('fs')
const { ApolloServer } = require('apollo-server')
const { resolvers } = require('./schema/resolvers')

function schema () {
  const typeDefs = fs.readFileSync(__dirname + '/schema/schema.graphql', 'utf8')

  return { typeDefs, resolvers }
}

exports.boot = () => {
  console.log('Application is getting ready...')

  return new ApolloServer(schema())
}
