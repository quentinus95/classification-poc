require('dotenv').config()
const kernel = require('./src/kernel')

kernel
  .boot()
  .then(server => {
    server
      .listen()
      .then(({ url }) => {
        console.log(`Server running at ${url}!`)
      })
  })
