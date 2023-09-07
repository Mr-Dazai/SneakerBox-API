//.env import
require('dotenv').config()

//Express-Aysnc import
require('express-async-errors')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')

//Express import
const express = require('express')
const app = express()

//Connect Database
const connectDB = require('./db/connect')

//Routers
const authRouter = require('./routes/authRoutes')

//Middleware import
const notFoundMiddleware = require('./middleware/not-found')
const errorhandler = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

// Get()
app.get('/', (req, res) => {
  res.send('E-Commerse App')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('E-Commerse App')
})
app.use('/api/v1/auth', authRouter)
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
