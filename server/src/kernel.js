const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
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

  return makeExecutableSchema({ typeDefs, resolvers })
}

function loadRoutes (app, schema) {
  app.use('/public', express.static(__dirname + '/../public'))
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}

exports.boot = async () => {
  console.log('Application is getting ready...')

  if (process.env.NODE_ENV === 'development') {
    await loadFixtures()
  }

  const schema = await loadSchema()

  const app = express()

  app.use(cors({ origin: 'http://localhost:8080' }))
  loadRoutes(app, schema)

  return app
}
