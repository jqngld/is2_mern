const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
require('dotenv').config()

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

// db setup
mongoose
  .connect(process.env.DB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión BD OK!')
  })

// rutas
app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))

// port
const port = process.env.PORT

app.listen(port, () => {
  console.log(`ejecutiana PERRRR puerto ${port} cuntiana`)
})
