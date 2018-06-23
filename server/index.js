require('dotenv').config()
const kernel = require('./src/kernel')

kernel
  .boot()
  .listen()
  .then(({ url }) => {
    console.log(`Server running at ${url}!`)
  })
