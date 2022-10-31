const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const response = require('./helpers/response')

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Welcome API
app.get('/', async (req, res) => {
   res.status(200).send({
      status: true,
      data: 'Welcome to API Todo List'
   })
})


// Routes API
routes(app)

// Global Error Handler
app.use(response.errorHandler)

app.listen(port, () => {
   console.log(`Server is Running on http://localhost:${port}`)
})