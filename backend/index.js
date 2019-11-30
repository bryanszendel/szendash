require('dotenv').config()

const server = require('./api/server.js')

const port = process.env.PORT || 6000;
console.log(process.env.PORT)

server.listen(port, () => {
  console.log(`\n === Server listening on port ${port} === \n`)
})