const MongoClient = require('mongodb').MongoClient

let connection = null

exports.getConnection = () => {
  if (connection) {
    return connection
  }

  return new Promise ((resolve, reject) => {
    MongoClient.connect(process.env.MONGO_URL, (err, client) => {
      if (err) {
        return reject(err)
      }

      connection = client.db(process.env.MONGO_DB_NAME)

      return resolve(connection)
    })
  })
}
