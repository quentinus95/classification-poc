const fs = require('fs')
const { ApolloServer } = require('apollo-server')
const { resolvers } = require('./schema/resolvers')
const database = require('./database')

async function loadFixtures() {
  const connection = await database.getConnection()

  const promises = []
  for (const collection of ['collections', 'users']) {
    const fixtures = require(`./fixtures/${collection}`)
    const dbCollection = connection.collection(collection)

    promises.push(
      dbCollection.remove({}).then(() => dbCollection.insert(fixtures))
    )
  }

  return Promise.all(promises)
}

async function loadSchema () {
  const typeDefs = fs.readFileSync(__dirname + '/schema/schema.graphql', 'utf8')

  return { typeDefs, resolvers }
}

exports.boot = async () => {
  console.log('Application is getting ready...')

  if (process.env.NODE_ENV === 'development') {
    await loadFixtures()
  }

  const schema = await loadSchema()

  return new ApolloServer(schema)
}
