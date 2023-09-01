//.env import
require('dotenv').config()

//Express-Aysnc import
require('express-async-errors')

const morgan = require('morgan')

//Express import
const express = require('express')
const app = express()

//Connect Database
const connectDB = require('./db/connect')

//Middleware import
const notFoundMiddleware = require('./middleware/not-found')
const errorhandler = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())

// Get()
app.get('/', (req, res) => {
  res.send('E-Commerse App')
})

// Error Handleing
app.use(notFoundMiddleware)
app.use(errorhandler)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`Listening on port 5000`))
  } catch (error) {
    console.log(error)
  }
}
start()
