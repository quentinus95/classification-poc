require('dotenv').config()
const kernel = require('./src/kernel')

const port = 4000

kernel
  .boot()
  .then(app => {
    app.listen(port, () => {
      console.log(`Server running! Sandbox at http://localhost:${port}/graphiql`)
    })
  })
